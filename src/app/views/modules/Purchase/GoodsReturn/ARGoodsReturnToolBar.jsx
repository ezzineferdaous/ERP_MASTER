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
  // ORPD Orpd 
  // RDP1 Rdp1

// Define a styled component 'IconBox' that changes display property based on screen size
const IconBox = styled('div')(({ theme }) => ({
    display: 'inherit',
    [theme.breakpoints.down('md')]: { display: 'none !important' },
}));

const ARGoodsReturnToolBar = (props) => {
    // Set up the base URL and axios instance for API requests
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });

    // Function to handle printing the Orpd
    const Print = async (e) => {
        e.preventDefault();
        try {
            alert('Print');
        } catch (error) { props.handelError(error); }
    };

    // Function to handle showing the list of Orpd
    const List = async (e) => {
        e.preventDefault();
        try {
            props.setShowOrpdList(true);
        } catch (error) {
            console.log(error);        
        }
    };
    const Add = async (e) => {
        props.fetchNextDocEntry('Créer');
        
        props.setOrpd({ DocEntry: "", DocNum: "", DocDate: props.today, DueDate: props.today, CardCode: '', CardName: '',
         DocStatus: '', Comment: '', TotalHT : '', RemiseTotal:'', RemiseTotal:'', VatSum: '', DocTotal: '' });
         props.setRdp1([{ DocEntry: "", LineNum:"1" , ItemCode: "", ItemName: '', Quantity: 1, WhsCode: '', Price: '', PrixHT:'',
        Discount: '0', VAT: '0', LineTotal: '', LineHT: "", UM: "" ,isEditing: true, }]);
        props.setState({ ...props.state, Mode: "Créer" });
      };
    // Function to handle navigating through Orpd
    const Navigate = async (direction) => {
        try {
            if (direction === "First") {
                
                const response = await axiosInstance.get("ORPD/" + (await axiosInstance.get("ORPD/data/Min")).data.id + "");
                console.log(response);
                props.setOrpd(response.data);

                const responsePDN1 = await axiosInstance.get("RDP1/data/Min/" + response.data.DocEntry + "");
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
                        VAT: item.VAT,
                        LineTotal: item.LineTotal,
                        LineHT: item.LineHT,
                        UM: umResponse.data.NomUM
                        };
                    }));
                    props.setRdp1(formattedData);
                }
                props.setState({ ...props.state, Mode: "OK" });
            } else if (direction === "Previous") {
                const previousOrpd = await axiosInstance.get("ORPD/data/Previous/" + props.Orpd.id + "");
                if (previousOrpd.data.id != null) {
                    props.setOrpd({
                        id: previousOrpd.data.id.id,
                        DocEntry: previousOrpd.data.id.DocEntry,
                        DocNum: previousOrpd.data.id.DocNum,
                        DocDate: previousOrpd.data.id.DocDate,
                        DueDate: previousOrpd.data.id.DueDate,
                        CardCode: previousOrpd.data.id.CardCode,
                        CardName: previousOrpd.data.id.CardName,
                        DocStatus: previousOrpd.data.id.DocStatus,
                        TotalHT: previousOrpd.data.id.TotalHT,
                        DiscPrcnt: previousOrpd.data.id.DiscPrcnt,
                        RemiseTotal: previousOrpd.data.id.RemiseTotal,
                        VatSum: previousOrpd.data.id.VatSum,
                        DocTotal: previousOrpd.data.id.DocTotal,
                        UserSign: previousOrpd.data.id.UserSign,
                        Comment: previousOrpd.data.id.Comment
                    });
                    const previousPDN1 = await axiosInstance.get("RDP1/data/Previous/" + previousOrpd.data.id.DocEntry);
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
                            VAT: item.VAT,
                            LineTotal: item.LineTotal,
                            LineHT: item.LineHT,
                            UM: umResponse.data.NomUM
                            };
                        }));

                        props.setRdp1(formattedData);
                    }
                    props.setState({ ...props.state, open: false, Mode: "OK" });
                } else {
                    props.setState({ ...props.state, open: true, message: "Premier enregistrement", severity: "info" });
                }
            } else if (direction === "Next") {
                // Navigate to the previous Orpd
                const nextOrpd = await axiosInstance.get("ORPD/data/Next/" + props.Orpd.id + "");
                if (nextOrpd.data.id != null) {
                    props.setOrpd({
                        id: nextOrpd.data.id.id,
                        DocEntry: nextOrpd.data.id.DocEntry,
                        DocNum: nextOrpd.data.id.DocNum,
                        DocDate: nextOrpd.data.id.DocDate,
                        DueDate: nextOrpd.data.id.DueDate,
                        CardCode: nextOrpd.data.id.CardCode,
                        CardName: nextOrpd.data.id.CardName,
                        DocStatus: nextOrpd.data.id.DocStatus,
                        TotalHT: nextOrpd.data.id.TotalHT,
                        VatSum: nextOrpd.data.id.VatSum,
                        DiscPrcnt: nextOrpd.data.id.DiscPrcnt,
                        RemiseTotal: nextOrpd.data.id.RemiseTotal,
                        DocTotal: nextOrpd.data.id.DocTotal,
                        UserSign: nextOrpd.data.id.UserSign,
                        Comment: nextOrpd.data.id.Comment
                    });
                    const nextPDN1 = await axiosInstance.get("RDP1/data/Next/" + nextOrpd.data.id.DocEntry);
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
                            VAT: item.VAT,
                            LineTotal: item.LineTotal,
                            LineHT: item.LineHT,
                            UM: umResponse.data.NomUM
                            };
                        }));

                        props.setRdp1(formattedData);
                    }
                    props.setState({ ...props.state, open: false, Mode: "OK" });
                } else {
                    props.setState({ ...props.state, open: true, message: "Dernier enregistrement", severity: "info" });
                }
            } else if (direction === "Last") {
                 // Navigate to the last Orpd
                const response = await axiosInstance.get("ORPD/" + (await axiosInstance.get("ORPD/data/Max")).data.id + "");
                props.setOrpd(response.data);
                const responsePDN1 = await axiosInstance.get("RDP1/data/Max/" + response.data.DocEntry + "");
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
                        VAT: item.VAT,
                        LineTotal: item.LineTotal,
                        LineHT: item.LineHT,
                        UM: umResponse.data.NomUM
                        };
                    }));
                   
                    props.setRdp1(formattedData);
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

export default ARGoodsReturnToolBar;