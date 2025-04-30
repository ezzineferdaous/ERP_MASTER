// Import necessary components and libraries from Material-UI and other sources
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

// Define a styled component 'IconBox' that changes display property based on screen size
const IconBox = styled('div')(({ theme }) => ({
    display: 'inherit',
    [theme.breakpoints.down('md')]: { display: 'none !important' },
}));

const APCToolBar = ({ state, setState, handelError, setoRPC, setRPC1, oRPC, setEditIndex, setShowORPCList ,Add}) => {
    // Set up the base URL and axios instance for API requests
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });

    // Function to handle printing the ORPC
    const Print = async (e) => {
        e.preventDefault();
        try {
            alert('Print');
        } catch (error) { handelError(error); }
    };

    // Function to handle showing the list of ORPC
    const List = async (e) => {
        e.preventDefault();
        try {
            setShowORPCList(true);
        } catch (error) {
            console.log(error);        
        }
    };
    // Function to handle navigating through ORPC
    const Navigate = async (direction) => {
        try {
            if (direction === "First") {
                setEditIndex();
                const response = await axiosInstance.get("ORPC/" + (await axiosInstance.get("ORPC/data/Min")).data.id + "");
                setoRPC(response.data);
    
                const responseRPD1 = await axiosInstance.get("RPC1/data/Min/" + response.data.DocEntry + "");
                if (responseRPD1.data.length > 0) {
                    const formattedData = await Promise.all(responseRPD1.data.map(async (item) => {
                        const warehouseResponse = await axiosInstance.get(`Warehouse/code/${item.WhsCode}`);
                        const umResponse = await axiosInstance.get(`UM/${item.UM}`);
    
                        return {
                            DocEntry: item.DocEntry,
                            LineNum: item.LineNum,
                            ItemCode: item.ItemCode,
                            ItemName: item.ItemName,
                            Quantity: item.Quantity,
                            WhsCode: warehouseResponse.data.NomWarehouse,
                            PrixHT: item.PrixHT,
                            Price: item.Price,
                            Discount: item.Discount,
                            VAT: item.VAT,
                            LineTotal: item.LineTotal,
                            LineHT: item.LineHT,
                            UM: umResponse.data.NomUM,
                           
                        };
                    }));
                    setEditIndex();
                    setRPC1(formattedData);
                }
                setState({ ...state, Mode: "OK" });
            } else if (direction === "Previous") {
                const previousORPD = await axiosInstance.get("ORPC/data/Previous/" + oRPC.id + "");
                if (previousORPD.data.id != null) {
                    setoRPC({
                        id: previousORPD.data.id.id,
                        DocEntry: previousORPD.data.id.DocEntry,
                        DocNum: previousORPD.data.id.DocNum,
                        DocDate: previousORPD.data.id.DocDate,
                        DueDate: previousORPD.data.id.DueDate,
                        CardCode: previousORPD.data.id.CardCode,
                        CardName: previousORPD.data.id.CardName,
                        DocStatus: previousORPD.data.id.DocStatus,
                        TotalHT: previousORPD.data.id.TotalHT,
                        DiscPrcnt: previousORPD.data.id.DiscPrcnt,
                        RemiseTotal: previousORPD.data.id.RemiseTotal,
                        VatSum: previousORPD.data.id.VatSum,
                        DocTotal: previousORPD.data.id.DocTotal,
                        UserSign: previousORPD.data.id.UserSign,
                        Comment: previousORPD.data.id.Comment,
                    });
                    const previousRPD1 = await axiosInstance.get("RPC1/data/Previous/" + previousORPD.data.id.DocEntry);
                    if (previousRPD1.data.length > 0) {
                        const formattedData = await Promise.all(previousRPD1.data.map(async (item) => {
                            const warehouseResponse = await axiosInstance.get(`Warehouse/code/${item.WhsCode}`);
                            const umResponse = await axiosInstance.get(`UM/${item.UM}`);
    
                            return {
                                DocEntry: item.DocEntry,
                                LineNum: item.LineNum,
                                ItemCode: item.ItemCode,
                                ItemName: item.ItemName,
                                Quantity: item.Quantity,
                                WhsCode: warehouseResponse.data.NomWarehouse,
                                PrixHT: item.PrixHT,
                                Price: item.Price,
                                Discount: item.Discount,
                                VAT: item.VAT,
                                LineTotal: item.LineTotal,
                                LineHT: item.LineHT,
                                UM: umResponse.data.NomUM,
                                // isEditing: true, // chenge
                            };
                        }));
                        setRPC1(formattedData);
                    }
                    setState({ ...state, open: false, Mode: "OK" });
                } else {
                    setState({ ...state, open: true, message: "Premier enregistrement", severity: "info" });
                }
            } else if (direction === "Next") {
                const nextORPD = await axiosInstance.get("ORPC/data/Next/" + oRPC.id + "");
                if (nextORPD.data.id != null) {
                    setoRPC({
                        id: nextORPD.data.id.id,
                        DocEntry: nextORPD.data.id.DocEntry,
                        DocNum: nextORPD.data.id.DocNum,
                        DocDate: nextORPD.data.id.DocDate,
                        DueDate: nextORPD.data.id.DueDate,
                        CardCode: nextORPD.data.id.CardCode,
                        CardName: nextORPD.data.id.CardName,
                        DocStatus: nextORPD.data.id.DocStatus,
                        TotalHT: nextORPD.data.id.TotalHT,
                        DiscPrcnt: nextORPD.data.id.DiscPrcnt,
                        RemiseTotal: nextORPD.data.id.RemiseTotal,
                        VatSum: nextORPD.data.id.VatSum,
                        DocTotal: nextORPD.data.id.DocTotal,
                        UserSign: nextORPD.data.id.UserSign,
                        Comment: nextORPD.data.id.Comment,
                    });
                    const nextRPD1 = await axiosInstance.get("RPC1/data/Next/" + nextORPD.data.id.DocEntry);
                    if (nextRPD1.data.length > 0) {
                        const formattedData = await Promise.all(nextRPD1.data.map(async (item) => {
                            const warehouseResponse = await axiosInstance.get(`Warehouse/code/${item.WhsCode}`);
                            const umResponse = await axiosInstance.get(`UM/${item.UM}`);
    
                            return {
                                DocEntry: item.DocEntry,
                                LineNum: item.LineNum,
                                ItemCode: item.ItemCode,
                                ItemName: item.ItemName,
                                Quantity: item.Quantity,
                                WhsCode: warehouseResponse.data.NomWarehouse,
                                PrixHT: item.PrixHT,
                                Price: item.Price,
                                Discount: item.Discount,
                                VAT: item.VAT,
                                LineTotal: item.LineTotal,
                                LineHT: item.LineHT,
                                UM: umResponse.data.NomUM,
                               
                            };
                        }));
                        setRPC1(formattedData);
                    }
                    setState({ ...state, open: false, Mode: "OK" });
                } else {
                    setState({ ...state, open: true, message: "Dernier enregistrement", severity: "info" });
                }
            } else if (direction === "Last") {
                const response = await axiosInstance.get("ORPC/" + (await axiosInstance.get("ORPC/data/Max")).data.id + "");
                setoRPC(response.data);
                const responseRPD1 = await axiosInstance.get("RPC1/data/Max/" + response.data.DocEntry + "");
                if (responseRPD1.data.length > 0) {
                    const formattedData = await Promise.all(responseRPD1.data.map(async (item) => {
                        const warehouseResponse = await axiosInstance.get(`Warehouse/code/${item.WhsCode}`);
                        const umResponse = await axiosInstance.get(`UM/${item.UM}`);
    
                        return {
                            DocEntry: item.DocEntry,
                        LineNum: item.LineNum,
                        ItemCode: item.ItemCode,
                        ItemName: item.ItemName,
                        Quantity: item.Quantity,
                        WhsCode: warehouseResponse.data.NomWarehouse,
                        PrixHT:item.PrixHT,
                        Price: item.Price,
                        Discount: item.Discount,
                        VAT: item.VAT,
                        LineTotal: item.LineTotal,
                        LineHT: item.LineHT,
                        UM: umResponse.data.NomUM,
                      
                        };
                    }));
                    setEditIndex();
                    setRPC1(formattedData);
                }
                setState({ ...state, open: false, Mode: "OK" });
            }
        } catch (error) {
            handelError(error);
        }
    };
    
    

    return (
        <IconBox>
            <IconButton onClick={Add} aria-label="Nouveau" size="small"> <AddIcon fontSize="small" /> </IconButton>
            <IconButton onClick={Print} aria-label="imprimer" size="small"> <PrintIcon fontSize="small" /> </IconButton>
            <IconButton onClick={() => Navigate('First')} aria-label="Premier" size="small"> <KeyboardDoubleArrowLeftIcon fontSize="small" /> </IconButton>
            <IconButton onClick={() => Navigate('Previous')} aria-label="Précédent" size="small"> <KeyboardArrowLeftIcon fontSize="small" /> </IconButton>
            <IconButton onClick={() => Navigate('Next')} aria-label="Suivant" size="small"> <KeyboardArrowRightIcon fontSize="small" /> </IconButton>
            <IconButton onClick={() => Navigate('Last')} aria-label="Dernier" size="small"> <KeyboardDoubleArrowRightIcon fontSize="small" /> </IconButton>
            <IconButton onClick={List} aria-label="Filtrer" size="small"> <FormatListBulletedIcon fontSize="small" /> </IconButton>
        </IconBox>
    );
}

export default APCToolBar;