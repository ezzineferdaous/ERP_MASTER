import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import jwt from 'jsonwebtoken'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });

    const login = async (username, password) => {
        try {
            console.log('username:', username);
            const [Prenom, Nom] = username.split(' ');
            console.log('Prenom:', Prenom);
            console.log('Nom:', Nom);
            console.log('password:', password);

            const response = await axiosInstance.post('Salaries/login', { Prenom, Nom, password });
    
            if (response.data && response.data.token) {
                const { token, user } = response.data;
                console.log('Login response:', response.data);

                setSession(token);
                console.log('Access Token:', localStorage.getItem('accessToken'));

        dispatch({
            type: 'LOGIN',
                    payload: { user },
                });
                console.log('User after login:', user);
            } else {
                throw new Error('Invalid username or password');
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };
    
    

    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        (async () => {
            try {
                
                const accessToken = window.localStorage.getItem('accessToken');

                if (accessToken && isValidToken(accessToken)) {

                    setSession(accessToken);

                    const decodedToken = jwtDecode(accessToken);
                    const { Prenom, Nom, email } = decodedToken;

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user: { Prenom, Nom, email }, 
                        },
                    });
                } else {

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    });
                }
            } catch (err) {
                console.error('Error during authentication initialization:', err);
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        })();
    }, []);
    

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
