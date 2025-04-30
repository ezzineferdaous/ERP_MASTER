import React, {useState} from 'react'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './PhoneNumberValidation.css'
import FormControl from '@mui/material/FormControl';
import { Box } from "@mui/material";

function PhoneNumberValidation (props) {
     const [valid, setvalid] = useState(true);

    const handelChange =(value) => {
         setvalid(validatePhoneNumber(value));
        props.setPartner({ ...props.Partner, ['Phone']: value });
        props.setState({ ...props.state, Mode: "Mettre à jour" }); 
    }
    const validatePhoneNumber =(phoneNumber) => {
        const phoneNumberPattern = /^\d{12}$/;
        return phoneNumberPattern.test(phoneNumber);
    }
    return (
        <Box sx={{ minWidth: 120 }} className="breadcrumb">
            <FormControl fullWidth>
                <label>
                    <PhoneInput country={"ma"} value={props.Partner.Phone} onChange = {handelChange} inputStyle={{ resuired: true, }} />
                    {!valid && (<p className='error-message'>Veuillez entrer un numéro de télephone valid</p>)}
                </label>
            </FormControl>
        </Box> 
    )
}

export default PhoneNumberValidation