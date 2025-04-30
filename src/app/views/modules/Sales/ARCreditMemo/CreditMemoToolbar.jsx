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

const CreditMemoToolbar = ({ state, setState, handelError, setoRIN, setRIN1, oRIN, setEditIndex, setShowORINList ,Add}) => {
    // Set up the base URL and axios instance for API requests
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });

    // Function to handle printing the ORIN
    const Print = async (e) => {
        e.preventDefault();
        try {
            alert('Print');
        } catch (error) { handelError(error); }
    };

    // Function to handle showing the list of ORIN
    const List = async (e) => {
        e.preventDefault();
        try {
            setShowORINList(true);
        } catch (error) {
            console.log(error);        
        }
    };
    // Function to handle navigating through ORIN
    const Navigate = async (direction) => {
        try {
            if (direction === "First") {
                setEditIndex();
                const response = await axiosInstance.get("ORIN/" + (await axiosInstance.get("ORIN/data/Min")).data.id + "");
                setoRIN(response.data);
    
                const responseRPD1 = await axiosInstance.get("RIN1/data/Min/" + response.data.DocEntry + "");
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
                    setRIN1(formattedData);
                }
                setState({ ...state, Mode: "OK" });
            } else if (direction === "Previous") {
                const previousORIN = await axiosInstance.get("ORIN/data/Previous/" + oRIN.id + "");
                if (previousORIN.data.id != null) {
                    setoRIN({
                        id: previousORIN.data.id.id,
                        DocEntry: previousORIN.data.id.DocEntry,
                        DocNum: previousORIN.data.id.DocNum,
                        DocDate: previousORIN.data.id.DocDate,
                        DueDate: previousORIN.data.id.DueDate,
                        CardCode: previousORIN.data.id.CardCode,
                        CardName: previousORIN.data.id.CardName,
                        DocStatus: previousORIN.data.id.DocStatus,
                        totalHT: previousORIN.data.id.totalHT,
                        DiscPrcnt: previousORIN.data.id.DiscPrcnt,
                        RemiseTotal: previousORIN.data.id.RemiseTotal,
                        VatSum: previousORIN.data.id.VatSum,
                        DocTotal: previousORIN.data.id.DocTotal,
                        UserSign: previousORIN.data.id.UserSign,
                        Comment: previousORIN.data.id.Comment,
                    });
                    const previousRPD1 = await axiosInstance.get("RIN1/data/Previous/" + previousORIN.data.id.DocEntry);
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
                            };
                        }));
                        setRIN1(formattedData);
                    }
                    setState({ ...state, open: false, Mode: "OK" });
                } else {
                    setState({ ...state, open: true, message: "Premier enregistrement", severity: "info" });
                }
            } else if (direction === "Next") {
                const nextORIN = await axiosInstance.get("ORIN/data/Next/" + oRIN.id + "");
                if (nextORIN.data.id != null) {
                    setoRIN({
                        id: nextORIN.data.id.id,
                        DocEntry: nextORIN.data.id.DocEntry,
                        DocNum: nextORIN.data.id.DocNum,
                        DocDate: nextORIN.data.id.DocDate,
                        DueDate: nextORIN.data.id.DueDate,
                        CardCode: nextORIN.data.id.CardCode,
                        CardName: nextORIN.data.id.CardName,
                        DocStatus: nextORIN.data.id.DocStatus,
                        totalHT: nextORIN.data.id.totalHT,
                        DiscPrcnt: nextORIN.data.id.DiscPrcnt,
                        RemiseTotal: nextORIN.data.id.RemiseTotal,
                        VatSum: nextORIN.data.id.VatSum,
                        DocTotal: nextORIN.data.id.DocTotal,
                        UserSign: nextORIN.data.id.UserSign,
                        Comment: nextORIN.data.id.Comment,
                    });
                    const nextRPD1 = await axiosInstance.get("RIN1/data/Next/" + nextORIN.data.id.DocEntry);
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
                        setRIN1(formattedData);
                    }
                    setState({ ...state, open: false, Mode: "OK" });
                } else {
                    setState({ ...state, open: true, message: "Dernier enregistrement", severity: "info" });
                }
            } else if (direction === "Last") {
                const response = await axiosInstance.get(
                    "ORIN/" + (await axiosInstance.get("ORIN/data/Max")).data.id + "");
                setoRIN(response.data);
                const responseRPD1 = await axiosInstance.get("RIN1/data/Max/" + response.data.DocEntry + "");
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
                        // isEditing: true, // chenge
                        };
                    }));
                    setEditIndex();
                    setRIN1(formattedData);
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

export default CreditMemoToolbar;
