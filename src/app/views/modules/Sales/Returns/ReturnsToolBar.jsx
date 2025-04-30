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

const ReturnsToolBar = (props) => {
    // Set up the base URL and axios instance for API requests
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });

    // Function to handle printing the ORDN
    const Print = async (e) => {
        e.preventDefault();
        try {
            alert('Print');
        } catch (error) { props.handelError(error); }
    };

    // Function to handle showing the list of ORDN
    const List = async (e) => {
        e.preventDefault();
        try {
            props.setShowORDNList(true);
        } catch (error) {
            console.log(error);        
        }
    };
    const Add = async (e) => {
        props.fetchNextDocEntry('Créer');
        props.setOrdn({ DocEntry: "", DocNum: "", DocDate: props.today, DueDate: props.today, CardCode: '', CardName: '',
         DocStatus: '', Comment: '', Total: '', DiscPrcnt:'', RemiseTotal:'',  VatSum: '', DocTotal: '' });
         props.setRdn1([{ DocEntry: "", LineNum:"1" , ItemCode: "", ItemName: '', Quantity: 1, WhsCode: '', Price: '', PrixHT:'',
        Discount: '0',RemiseTotal:'', VAT: '0', LineTotal: '', LineHT: "", UM: "",isEditing: true, }]);
        props.setState({ ...props.state, Mode: "Créer" });
      };
    // Function to handle navigating through ORDN
    const Navigate = async (direction) => {
        try {
            if (direction === "First") {
                
                const response = await axiosInstance.get("ORDN/" + (await axiosInstance.get("ORDN/data/Min")).data.id + "");
                console.log(response);
                props.setOrdn(response.data);

                const responsePDN1 = await axiosInstance.get("RDN1/data/Min/" + response.data.DocEntry + "");
                if (responsePDN1.data.length > 0) {
                    
                    const formattedData = await Promise.all(responsePDN1.data.map(async (item) => {
                        const warehouseResponse = await axiosInstance.get(`Warehouse/code/${item.WhsCode}`);
                        const umResponse = await axiosInstance.get(`UM/${item.UM}`);
                        const vatResponse = await axiosInstance.get(`Tax/${item.VAT}`);
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
                        RemiseTotal: item.RemiseTotal,
                        VAT: item.VAT,
                        LineTotal: item.LineTotal,
                        LineHT: item.LineHT,
                        UM: umResponse.data.NomUM
                        };
                    }));
                    
                    props.setRdn1(formattedData);
                }
                props.setState({ ...props.state, Mode: "OK" });
            } else if (direction === "Previous") {
                const previousORDN = await axiosInstance.get("ORDN/data/Previous/" + props.Ordn.id + "");
                if (previousORDN.data.id != null) {
                    props.setOrdn({
                        id: previousORDN.data.id.id,
                        DocEntry: previousORDN.data.id.DocEntry,
                        DocNum: previousORDN.data.id.DocNum,
                        DocDate: previousORDN.data.id.DocDate,
                        DueDate: previousORDN.data.id.DueDate,
                        CardCode: previousORDN.data.id.CardCode,
                        CardName: previousORDN.data.id.CardName,
                        DocStatus: previousORDN.data.id.DocStatus,
                        TotalHT: previousORDN.data.id.TotalHT,
                        DiscPrcnt: previousORDN.data.id.DiscPrcnt,
                        RemiseTotal: previousORDN.data.id.RemiseTotal,
                        VatSum: previousORDN.data.id.VatSum,
                        DocTotal: previousORDN.data.id.DocTotal,
                        UserSign: previousORDN.data.id.UserSign,
                        Comment: previousORDN.data.id.Comment
                    });
                    const previousPDN1 = await axiosInstance.get("RDN1/data/Previous/" + previousORDN.data.id.DocEntry);
                    if (previousPDN1.data.length > 0) {
                        const formattedData = await Promise.all(previousPDN1.data.map(async (item) => {
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
                            RemiseTotal: item.RemiseTotal,
                            VAT: item.VAT,
                            LineTotal: item.LineTotal,
                            LineHT: item.LineHT,
                            UM: umResponse.data.NomUM
                            };
                        }));

                        props.setRdn1(formattedData);
                    }
                    props.setState({ ...props.state, open: false, Mode: "OK" });
                } else {
                    props.setState({ ...props.state, open: true, message: "Premier enregistrement", severity: "info" });
                }
            } else if (direction === "Next") {
                // Navigate to the previous ORDN
                const nextORDN = await axiosInstance.get("ORDN/data/Next/" + props.Ordn.id + "");
                if (nextORDN.data.id != null) {
                    props.setOrdn({
                        id: nextORDN.data.id.id,
                        DocEntry: nextORDN.data.id.DocEntry,
                        DocNum: nextORDN.data.id.DocNum,
                        DocDate: nextORDN.data.id.DocDate,
                        DueDate: nextORDN.data.id.DueDate,
                        CardCode: nextORDN.data.id.CardCode,
                        CardName: nextORDN.data.id.CardName,
                        DocStatus: nextORDN.data.id.DocStatus,
                        TotalHT: nextORDN.data.id.TotalHT,
                        VatSum: nextORDN.data.id.VatSum,
                        DiscPrcnt: nextORDN.data.id.DiscPrcnt,
                        RemiseTotal: nextORDN.data.id.RemiseTotal,
                        DocTotal: nextORDN.data.id.DocTotal,
                        UserSign: nextORDN.data.id.UserSign,
                        Comment: nextORDN.data.id.Comment
                    });
                    const nextPDN1 = await axiosInstance.get("RDN1/data/Next/" + nextORDN.data.id.DocEntry);
                    if (nextPDN1.data.length > 0) {
                        const formattedData = await Promise.all(nextPDN1.data.map(async (item) => {
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
                            RemiseTotal:item.RemiseTotal,
                            VAT: item.VAT,
                            LineTotal: item.LineTotal,
                            LineHT: item.LineHT,
                            UM: umResponse.data.NomUM
                            };
                        }));

                        props.setRdn1(formattedData);
                    }
                    props.setState({ ...props.state, open: false, Mode: "OK" });
                } else {
                    props.setState({ ...props.state, open: true, message: "Dernier enregistrement", severity: "info" });
                }
            } else if (direction === "Last") {
                 // Navigate to the last ORDN
                const response = await axiosInstance.get("ORDN/" + (await axiosInstance.get("ORDN/data/Max")).data.id + "");
                props.setOrdn(response.data);
                const responsePDN1 = await axiosInstance.get("RDN1/data/Max/" + response.data.DocEntry + "");
                if (responsePDN1.data.length > 0) {
                    const formattedData = await Promise.all(responsePDN1.data.map(async (item) => {
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
                        RemiseTotal:item.RemiseTotal,
                        VAT: item.VAT,
                        LineTotal: item.LineTotal,
                        LineHT: item.LineHT,
                        UM: umResponse.data.NomUM
                        };
                    }));
                   
                    props.setRdn1(formattedData);
                }
                props.setState({ ...props.state, open: false, Mode: "OK" });
            }
        } catch (error) {
            props.handelError(error);
        }
    }

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

export default ReturnsToolBar;