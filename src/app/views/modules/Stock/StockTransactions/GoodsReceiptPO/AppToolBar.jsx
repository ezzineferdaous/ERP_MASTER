// import React from 'react'; // Importing React library
// import { IconButton } from "@mui/material"; // Importing IconButton component from Material-UI
// import { styled } from "@mui/system"; // Importing styled utility from Material-UI
// import PrintIcon from '@mui/icons-material/Print'; // Importing Print icon
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'; // Importing KeyboardDoubleArrowLeft icon
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'; // Importing KeyboardDoubleArrowRight icon
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'; // Importing KeyboardArrowLeft icon
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'; // Importing KeyboardArrowRight icon
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'; // Importing FormatListBulleted icon
// import AddIcon from '@mui/icons-material/Add'; // Importing Add icon
// import axios from 'axios'; // Importing axios for making HTTP requests

// // Styling the IconBox component
// const IconBox = styled('div')(({ theme }) => ({
//   display: 'inherit',
//   [theme.breakpoints.down('md')]: { display: 'none !important' },
// }));

// // AppToolBar component definition
// const AppToolBar = ({today,setEditIndex,setshowListOign, fetchNextDocEntry, setIGN1, Oign, setOign, state, setState, handelError }) => {

//   const baseUrl = process.env.REACT_APP_API_BASE_URL; // Base URL for the API
//   const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true }); // Creating an axios instance with a timeout and base URL

//   // Function to handle the Add button click
//   const Add = async (e) => {
//     setEditIndex(0); // Set edit index to 0
//     setOign({ DocEntry:"",DocNum:"", DocDate: today, UserSign: "", Comment: "" }); // Initialize Oign state
//     setIGN1([{ DocEntry: "", LineNum: "1", ItemCode: "", ItemName: "", Quantity: "", WhsCode: "", Price: "0.00", Discount: "0", LineTotal: "0.00", UM: "" }]); // Initialize IGN1 state
//     fetchNextDocEntry('Créer');// Fetch the next document entry
//     setState({ ...state, Mode: "Créer" }); // Set state mode to "Créer"
//   };

//   // Function to handle the Print button click
//   const Print = async (e) => {
//     e.preventDefault();
//     try {
//       alert('Print'); // Show print alert
//     } catch (error) {
//       handelError(error); // Handle error
//     }
//   };

//   // Function to handle the List button click
//   const List = async (e) => {
//     e.preventDefault();
//     try {
//       setshowListOign(true); // Show the list of Oign
//     } catch (error) {
//       console.log(error);        
//     }
//   };

//   // Function to handle navigation (First, Previous, Next, Last)
//   const Navigate = async (direction) => {
//     try {
//       if (direction === "First") {
//         setEditIndex(); // Reset edit index
//         const response = await axiosInstance.get("OIGN/" + (await axiosInstance.get("OIGN/data/Min")).data.id + ""); // Get the first OIGN entry
//         setOign(response.data); // Set Oign state
        
//         // Fetch and set IGN1 data
//         const responseIgn1 = await axiosInstance.get("IGN1/data/Min/" + response.data.DocEntry + "");
//         if (responseIgn1.data.length > 0) {
//           const formattedData = responseIgn1.data.map(item => ({
//               DocEntry: item.DocEntry,
//               LineNum: item.LineNum,
//               ItemCode: item.ItemCode,
//               ItemName: item.ItemName,
//               Quantity: item.Quantity,
//               WhsCode: item.WhsCode,
//               Price: item.Price,
//               Discount: item.Discount,
//               LineTotal: item.LineTotal,
//               UM: item.UM,
//               isEditing: true, // chenge
//           }));
//           setEditIndex();

//           setIGN1(formattedData);
//         }
//         setState({ ...state, Mode: "OK" }); // Set state mode to "OK"
//       } else if (direction === "Previous") {
//         const previousOign = await axiosInstance.get("OIGN/data/Previous/" +Oign.id+ ""); // Get the previous OIGN entry
//         // console.log(previousOign);
//         if (previousOign.data.id != null) {
//           setOign({
//             id:previousOign.data.id.id,
//             DocEntry:previousOign.data.id.DocEntry,
//              DocNum: previousOign.data.id.DocNum,
//               DocDate : previousOign.data.id.DocDate,
//                UserSign: previousOign.data.id.UserSign,
//                Comment: previousOign.data.id.Comment});
          
//           // Fetch and set previous IGN1 data
//           const previousIgn1 = await axiosInstance.get("IGN1/data/Previous/" + previousOign.data.id.DocEntry);
//           if (previousIgn1.data.length > 0) {
//             const formattedData = previousIgn1.data.map(item => ({
//                 DocEntry: item.DocEntry,
//                 LineNum: item.LineNum,
//                 ItemCode: item.ItemCode,
//                 ItemName: item.ItemName,
//                 Quantity: item.Quantity,
//                 WhsCode: item.WhsCode,
//                 Price: item.Price,
//                 Discount: item.Discount,
//                 LineTotal: item.LineTotal,
//                 UM: item.UM,
//                 isEditing: true, // chenge
//             }));

//             setIGN1(formattedData);
//           }
//           setState({ ...state, open: false, Mode: "OK" }); // Set state mode to "OK"
//         } else {
//           setState({ ...state, open: true, message: "Premier enregistrement", severity: "info" }); // Show first record message
//         }
//       } else if (direction === "Next") {
//         const nextOign = await axiosInstance.get("OIGn/data/Next/" +Oign.id+ ""); // Get the next OIGN entry
//         if (nextOign.data.id != null) {
//           setOign({id:nextOign.data.id.id,DocEntry:nextOign.data.id.DocEntry, DocNum: nextOign.data.id.DocNum, DocDate : nextOign.data.id.DocDate, UserSign: nextOign.data.id.UserSign,Comment: nextOign.data.id.Comment});
          
//           // Fetch and set next IGN1 data
//           const nextIgn1 = await axiosInstance.get("IGn1/data/Next/" + nextOign.data.id.DocEntry);
//           console.log(nextIgn1);
//           if (nextIgn1.data.length > 0) {
//             const formattedData = nextIgn1.data.map(item => ({
//                 DocEntry: item.DocEntry,
//                 LineNum: item.LineNum,
//                 ItemCode: item.ItemCode,
//                 ItemName: item.ItemName,
//                 Quantity: item.Quantity,
//                 WhsCode: item.WhsCode,
//                 Price: item.Price,
//                 Discount: item.Discount,
//                 LineTotal: item.LineTotal,
//                 UM: item.UM,
//                 isEditing: true, // chenge
//             }));

//             setIGN1(formattedData);
//           }
//           setState({ ...state, open: false, Mode: "OK" }); // Set state mode to "OK"
//         } else {
//           setState({ ...state, open: true, message: "Dernier enregistrement", severity: "info" }); // Show last record message
//         }
//       } else if (direction === "Last") {
//         const response = await axiosInstance.get("OIGN/" + (await axiosInstance.get("OIGN/data/Max")).data.id + ""); // Get the last OIGN entry
//         setOign(response.data);
        
//         // Fetch and set last IGN1 data
//         const responseIgn1 = await axiosInstance.get("IGN1/data/Max/" + response.data.DocEntry + "");
//         if (responseIgn1.data.length > 0) {
//           const formattedData = responseIgn1.data.map(item => ({
//               DocEntry: item.DocEntry,
//               LineNum: item.LineNum,
//               ItemCode: item.ItemCode,
//               ItemName: item.ItemName,
//               Quantity: item.Quantity,
//               WhsCode: item.WhsCode,
//               Price: item.Price,
//               Discount: item.Discount,
//               LineTotal: item.LineTotal,
//               UM: item.UM,
//               isEditing: true, // chenge
//           }));
//           setEditIndex();

//           setIGN1(formattedData);
//         }
//         setState({ ...state, open: false, Mode: "OK" }); // Set state mode to "OK"
//       }
//     } catch (error) {
//       handelError(error); // Handle error
//     }
//   }

//   return (
//     // Rendering the IconBox component with IconButton components for each action
//     <IconBox>
//       <IconButton onClick={Add} aria-label="Nouveau" size="small"> <AddIcon fontSize="small" /> </IconButton>
//       <IconButton onClick={Print} aria-label="imprimer" size="small"> <PrintIcon fontSize="small" /> </IconButton>
//       <IconButton onClick={() => Navigate("First")} aria-label="Premier" size="small"> <KeyboardDoubleArrowLeftIcon fontSize="small" /> </IconButton>
//       <IconButton onClick={() => Navigate("Previous")} aria-label="Précédent" size="small"> <KeyboardArrowLeftIcon fontSize="small" /> </IconButton>
//       <IconButton onClick={() => Navigate("Next")} aria-label="Suivant" size="small"> <KeyboardArrowRightIcon fontSize="small" /> </IconButton>
//       <IconButton onClick={() => Navigate("Last")} aria-label="Dernier" size="small"> <KeyboardDoubleArrowRightIcon fontSize="small" /> </IconButton>
//       <IconButton onClick={List} aria-label="Filtrer" size="small"> <FormatListBulletedIcon fontSize="small" /> </IconButton>
//     </IconBox>
//   );
// }

// export default AppToolBar; // Exporting the AppToolBar component as the default export




import React from 'react';
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import PrintIcon from '@mui/icons-material/Print';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' },
}));

const GoodsIssueToolBar = ({today,setshowListOige, fetchNextDocEntry , setIGN1, Oign, setOign, state, setState, handelError }) => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });

  const Add = async () => {
    fetchNextDocEntry("Créer");
    setOign({ DocEntry:"",DocNum:"", DocDate: today, UserSign: "", Comment: "" });
    setIGN1([{  LineNum: "1", ItemCode: "", ItemName: "", Quantity: "", WhsCode: "", Price: "0.00", Discount: "0", LineTotal: "0.00", UM: "" ,isEditing: true, }]);
    
    setState({ ...state, Mode: "Créer" });
    console.log(Oign.DocEntry)
  };

  const Print = async (e) => {
    e.preventDefault();
    try {
      alert('Print');
    } catch (error) {
      handelError(error);
    }
  };

  const List = async (e) => {
    e.preventDefault();
    try {
      setshowListOige(true);
     } catch (error) {
      console.log(error);        
    }
  };

  const Navigate = async (direction) => {
    try {
      if (direction === "First") {
        
        const response = await axiosInstance.get("OIGN/" + (await axiosInstance.get("OIGN/data/Min")).data.id + "");
        setOign(response.data);
       
        
        const responseIge1 = await axiosInstance.get("IGN1/data/Min/" + response.data.DocEntry + "");
        if (responseIge1.data.length > 0) {
          const formattedData = await Promise.all(responseIge1.data.map(async (item) => {
            const warehouseResponse = await axiosInstance.get(`Warehouse/code/${item.WhsCode}`);
            const umResponse = await axiosInstance.get(`UM/${item.UM}`);
            return {
              DocEntry: item.DocEntry,
              LineNum: item.LineNum,
              ItemCode:item.ItemCode,
              ItemName: item.ItemName,
              Quantity: item.Quantity,
              WhsCode: warehouseResponse.data.NomWarehouse,
              Price: item.Price,
              Discount: item.Discount,
              LineTotal: item.LineTotal,
              UM: umResponse.data.NomUM
            };
          }));
          

          setIGN1(formattedData);
      }
        setState({ ...state, Mode: "OK" });
      } else if (direction === "Previous") {
        const previousOige = await axiosInstance.get("OIGN/data/Previous/" +Oign.id+ "");
        if (previousOige.data.id != null) {
          setOign({id:previousOige.data.id.id,DocEntry:previousOige.data.id.DocEntry, DocNum: previousOige.data.id.DocNum, DocDate : previousOige.data.id.DocDate, UserSign: previousOige.data.id.UserSign,Comment: previousOige.data.id.Comment});
          const previousIge1 = await axiosInstance.get("IGN1/data/Previous/" + previousOige.data.id.DocEntry);
          if (previousIge1.data.length > 0) {
            const formattedData = await Promise.all(previousIge1.data.map(async (item) => {
              const warehouseResponse = await axiosInstance.get(`Warehouse/code/${item.WhsCode}`);
              const umResponse = await axiosInstance.get(`UM/${item.UM}`);
              return {
                DocEntry: item.DocEntry,
                LineNum: item.LineNum,
                ItemCode:item.ItemCode,
                ItemName: item.ItemName,
                Quantity: item.Quantity,
                WhsCode: warehouseResponse.data.NomWarehouse,
                Price: item.Price,
                Discount: item.Discount,
                LineTotal: item.LineTotal,
                UM: umResponse.data.NomUM
              };
              }));

            setIGN1(formattedData);
        }
          setState({ ...state, open: false, Mode: "OK" });
        } else {
          setState({ ...state, open: true, message: "Premier enregistrement", severity: "info" });
        }
      } else if (direction === "Next") {
        const nextOige = await axiosInstance.get("OIGN/data/Next/" +Oign.id+ "");
        if (nextOige.data.id != null) {
          setOign({id:nextOige.data.id.id,DocEntry:nextOige.data.id.DocEntry, DocNum: nextOige.data.id.DocNum, DocDate : nextOige.data.id.DocDate, UserSign: nextOige.data.id.UserSign,Comment: nextOige.data.id.Comment});
          const nextIge1 = await axiosInstance.get("IGN1/data/Next/" + nextOige.data.id.DocEntry);
          console.log(nextIge1);
          if (nextIge1.data.length > 0) {
            const formattedData = await Promise.all(nextIge1.data.map(async (item) => {
              const warehouseResponse = await axiosInstance.get(`Warehouse/code/${item.WhsCode}`);
              const umResponse = await axiosInstance.get(`UM/${item.UM}`);
              return {
                DocEntry: item.DocEntry,
                LineNum: item.LineNum,
                ItemCode:item.ItemCode,
                ItemName: item.ItemName,
                Quantity: item.Quantity,
                WhsCode: warehouseResponse.data.NomWarehouse,
                Price: item.Price,
                Discount: item.Discount,
                LineTotal: item.LineTotal,
                UM: umResponse.data.NomUM
               };
            }));

            setIGN1(formattedData);
        }
          setState({ ...state, open: false, Mode: "OK" });
        } else {
          setState({ ...state, open: true, message: "Dernier enregistrement", severity: "info" });
        }
      } else if (direction === "Last") {
        const response = await axiosInstance.get("OIGN/" + (await axiosInstance.get("OIGN/data/Max")).data.id + "");
        setOign(response.data);
        const responseIge1 = await axiosInstance.get("IGN1/data/Max/" + response.data.DocEntry + "");
        if (responseIge1.data.length > 0) {
          const formattedData = await Promise.all(responseIge1.data.map(async (item) => {
            const warehouseResponse = await axiosInstance.get(`Warehouse/code/${item.WhsCode}`);
            const umResponse = await axiosInstance.get(`UM/${item.UM}`);
            return {
              DocEntry: item.DocEntry,
              LineNum: item.LineNum,
              ItemCode:item.ItemCode,
              ItemName: item.ItemName,
              Quantity: item.Quantity,
              WhsCode: warehouseResponse.data.NomWarehouse,
              Price: item.Price,
              Discount: item.Discount,
              LineTotal: item.LineTotal,
              UM: umResponse.data.NomUM
            };
          }));
         

          setIGN1(formattedData);
      }
        setState({ ...state, open: false, Mode: "OK" });
      }
    } catch (error) {
      handelError(error);
    }
  }

  return (
    <IconBox>
      <IconButton onClick={Add} aria-label="Nouveau" size="small"> <AddIcon fontSize="small" /> </IconButton>
      <IconButton onClick={Print} aria-label="imprimer" size="small"> <PrintIcon fontSize="small" /> </IconButton>
      <IconButton onClick={() => Navigate("First")} aria-label="Premier" size="small"> <KeyboardDoubleArrowLeftIcon fontSize="small" /> </IconButton>
      <IconButton onClick={() => Navigate("Previous")} aria-label="Précédent" size="small"> <KeyboardArrowLeftIcon fontSize="small" /> </IconButton>
      <IconButton onClick={() => Navigate("Next")} aria-label="Suivant" size="small"> <KeyboardArrowRightIcon fontSize="small" /> </IconButton>
      <IconButton onClick={() => Navigate("Last")} aria-label="Dernier" size="small"> <KeyboardDoubleArrowRightIcon fontSize="small" /> </IconButton>
      <IconButton onClick={List} aria-label="Filtrer" size="small"> <FormatListBulletedIcon fontSize="small" /> </IconButton>
    </IconBox>
  );
}

export default GoodsIssueToolBar;
