import React, { useState, useEffect } from "react";
import { Link, generatePath } from "react-router-dom";
import axios from 'axios';

const AddressListComponent = () => {
  const [addressList, setAddressList] = useState([]);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});
  
  useEffect(() => { 
    const GetAddress = async () => {
        try {
          const res = await axiosInstance.get("Address/");
          setAddressList(res.data);
          console.log(addressList);
        } catch (error) {
          console.error(error);
          return;
        }
    }; 
      GetAddress();  
    },[]);

  return (
    <div style={{ width: "90%" }}>
      {addressList.map(({ id, name }) => (
        <div className="address-list-item" key={id}>
          <Link to={generatePath(`/:id`, { id })}>{name}</Link>
        </div>
      ))}
    </div>
  );
};

export default AddressListComponent;
