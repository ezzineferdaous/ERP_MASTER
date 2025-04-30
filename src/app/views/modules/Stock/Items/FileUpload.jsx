import { FaCameraRetro } from "react-icons/fa";
import { useState, useRef, useEffect } from 'react';
import {  Grid } from "@mui/material";
 
import axios from 'axios';
function FileUpload({Item, setItem, state, handleChange, ImageURL, setImageURL,setState}) {
  const baseUrl =  process.env.REACT_APP_API_BASE_URL;
  const imgPath =  process.env.REACT_APP_UPLOAD_FOLDER;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });
   
  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const formData = new FormData();
    console.log(formData);
    formData.append("image", file);
     axiosInstance.post("/upload", formData, {headers: { 'Content-Type': 'multipart/form-data', }, })
      .then((response) => {
        console.log("response");
        console.log(response);
        console.log(response.data.message);
        setItem({...Item, Picture: response.data.message });
        setImageURL({...ImageURL, preview: imgPath+response.data.message});
        setState({ ...state, Mode: 'Mettre à jour', CodeReadOnly: true });
      })
      .catch((error) => {
        console.log(error);
        setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error.message, severity: 'error', CodeReadOnly: false });
      });
  };
  
  return (
    <Grid container spacing={6}> 
      <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }} >
            <label htmlFor="fileId"> <FaCameraRetro className="upload__icon" color="#1976d2" size={20}  /> </label>
            <input name="image" type="file" id="fileId" style={{ display:'none' }} onChange={handleFileUpload} />
      </Grid>
      <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }} >
        <img src={ImageURL.preview} loading="lazy"  width="200" height="200" />
      </Grid>
    </Grid> 
  );
}

export default FileUpload;