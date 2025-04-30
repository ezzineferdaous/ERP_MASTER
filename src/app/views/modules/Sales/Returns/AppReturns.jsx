import { Stack} from "@mui/material";
import { styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import { Menubar } from 'primereact/menubar';
import { useState ,useEffect ,useRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ReturnsList from "./ReturnsList";
import ReturnsToolBar from "./ReturnsToolBar";
import ReturnsForm from "./ReturnsForm";
import { constant } from "lodash";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
})); 

const AppForm = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});
  const today = new Date().toISOString().split('T')[0];
  const [state, setState] = useState({ Mode:"Créer", message: "Error", open: false, vertical: 'top', horizontal: 'center', severity: "error" });
  const [ShowORDNList , setShowORDNList] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastSavedRow, setLastSavedRow] = useState(null);
  const [vatOptions, setVatOptions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalContentUM, setModalContentUM] = useState([]);
  const [modalContentWhsCode, setModalContentWhsCode] = useState([]);
  const [modalContentItemCode, setModalContentItemCode] = useState([]);
  const [modalContentCardCode, setModalContentCardCode] = useState([]);
  const [Ordn, setOrdn] = useState({
    id:'',
    DocNum: '',
    DocDate: today,
    DueDate: today,
    UserSign: '',
    CardCode: '',
    CardName: '',
    DocEntry: '',
    Canceled: 'No',
    DocStatus: '',
    Comment: '',
    TotalHT: '',
    DiscPrcnt:'',
    RemiseTotal:'',
    VatSum: '',
    DocTotal: '',
  });
  const [Rdn1, setRdn1] = useState([
    {
      id:'',
      DocEntry: "",
      LineNum: "1",
      ItemCode: "",
      ItemName: "",
      Quantity: 1,
      WhsCode: "",
      PrixHT:"",
      Price: "",
      Discount: "0",
      RemiseTotal:'',
      VAT: "0",
      LineTotal: "",
      LineHT: "",
      UM: "",
      isEditing: true, // ADD

    },
  ]);


  useEffect(() => {
    const fetchVatOptions = async () => {
      try {
        const res = await axiosInstance.get("Tax/");
        setVatOptions(res.data);
      } catch (error) {
        console.error("Error fetching VAT options:", error);
      }
    };

    fetchVatOptions();
  }, []);

  const fetchNextDocEntry = async (nextMode) => {
    try {
      const response = await axiosInstance.get('/ORDN/data/MaxDoc');
      const nextDocEntry = response.data.DocEntry;

      if (state.Mode === "Créer"  || nextMode  === "Créer" ) {
        setOrdn((prevData) => ({ ...prevData,  DocEntry: nextDocEntry,  DocNum: nextDocEntry, }));
        setRdn1((prevIge1) => prevIge1.map((item) => ({ ...item, DocEntry: nextDocEntry, })));
      }
 
    } catch (error) {
      handelError(error);
    }
  };

  const handelError = (error) => {
      if (error.response) {
          setState({Mode: "Créer" , vertical: 'top', horizontal: 'center', open: true, message: error.response.data.message, severity: "error" });
      } else if (error.request) {
          setState({Mode: "Créer" , vertical: 'top', horizontal: 'center', open: true, message: "Network error", severity: "error" });
      } else {
          setState({ Mode: "Créer" ,vertical: 'top', horizontal: 'center', open: true, message: error.message || "An error occurred", severity: "error" });

      }
  };

 const [isManualEntry, setIsManualEntry] = useState(false);


const handleChange = (e) => {
  const { name, value } = e.target;
  const formattedValue = typeof value === 'string' ? value.replace(',', '.') : value;

  if (name === "RemiseTotal") {
    setIsManualEntry(true);
  } else if (name === "DiscPrcnt") {
    setIsManualEntry(false);
  }

  setOrdn((prevOrdn) => {
    const updatedOrdn = { ...prevOrdn, [name]: formattedValue };

    if (state.Mode === "OK") {
      const newMode = updatedOrdn.id === "" ? "Créer" : "Mettre à jour";
      setState((prevState) => ({ ...prevState, Mode: newMode }));
    }

    return updatedOrdn;
  });
};
const handleCalculations2 = () => {
  const totalTHH = Rdn1.reduce((acc, curr) => acc + parseFloat(curr.LineHT || 0), 0);
  const discPrcnt = Ordn.DiscPrcnt || 0;

  const totalRemise = isManualEntry 
    ? Ordn.RemiseTotal || 0 
    : (totalTHH * discPrcnt) / 100;

  const totalARH = totalTHH - totalRemise;

  const SmTva = Rdn1.reduce((acc, curr) => {
    const vat = parseFloat(curr.VAT || 0);
    const lineHT = parseFloat(curr.LineHT || 0);
    return acc + ((vat * lineHT) / 100);
  }, 0);

  const vatSum = SmTva - ((SmTva * discPrcnt) / 100);
  const docTotal = totalARH + vatSum;

  setOrdn((prevOrdn) => ({
    ...prevOrdn,
    TotalHT: !isManualEntry ? totalTHH.toFixed(2) : totalTHH,
    RemiseTotal: !isManualEntry ? totalRemise.toFixed(2) : totalRemise,
    DiscPrcnt: isManualEntry 
      ? (totalTHH !== 0 ? (totalRemise / totalTHH * 100) : 0).toFixed(2) 
      : discPrcnt,
    VatSum: !isManualEntry ? vatSum.toFixed(2) : vatSum,
    DocTotal: !isManualEntry ? docTotal.toFixed(2) : docTotal,
    SmTva: !isManualEntry ? SmTva.toFixed(2) : SmTva
  }));
};


const previousRdn1Ref = useRef();

useEffect(() => {
  
  const currentRdn1WithoutVAT = Rdn1.map(({ VAT, ...rest }) => rest);
  const previousRdn1WithoutVAT = previousRdn1Ref.current?.map(({ VAT, ...rest }) => rest);

  const hasNonVatFieldChanged = JSON.stringify(currentRdn1WithoutVAT) !== JSON.stringify(previousRdn1WithoutVAT);

  
  if (hasNonVatFieldChanged) {
    handleCalculations2();
  }
  previousRdn1Ref.current = Rdn1;

}, [Rdn1]);

  const handleOpenModal = async (field, index) => {
    setSelectedField({ name: field, index });
    setOpen(true);
    if (field === 'UM') {
      try {
        const res = await axiosInstance.get("UM/");
        const formattedData1 = res.data.map(item => ({
          number: item.CodeUM,
          description: item.NomUM,
          id: item.id
        }));
        setModalContentUM(formattedData1);
      } catch (error) {
        console.error("Failed to fetch UM data:", error);
      }
    } else if (field === 'WhsCode') {
      try {
        const res = await axiosInstance.get("Warehouse/");
        const formattedData2 = res.data.map(item => ({
          number: item.CodeWarehouse,
          description: item.NomWarehouse,
          id: item.id
        }));
        setModalContentWhsCode(formattedData2);
      } catch (error) {
        console.error("Failed to fetch Warehouse data:", error);
      }
    } else if (field === 'ItemCode') {
        try {
            const res = await axiosInstance.get("Item/");
            const formattedDataItemCode = res.data.map(async item => {
            let nomUM = item.CodeUMA;
            let nomWarehouse = item.Magasin; 
            let taxName = item.GroupeTax; 
            

            if (item.CodeUMA) {
              try {
                const umResponse = await axiosInstance.get(`UM/${item.CodeUMA}`);
                nomUM = umResponse.data.NomUM;
              } catch (umError) {
                console.error("Failed to fetch NomUM data:", umError);
              }
            }else {
              nomUM = "";
            }
            if (item.Magasin) {
              try {
                const whResponse = await axiosInstance.get(
                  `Warehouse/code/${item.Magasin}`
                );
                nomWarehouse = whResponse.data.NomWarehouse;
              } catch (whError) {
                console.error("Failed to fetch NomWarehouse data:", whError);
                nomWarehouse = "";
              }
            }else {
              nomWarehouse = "";
            }
            if (item.GroupeTax) {
              try {
                const taxResponse = await axiosInstance.get(
                  `Tax/${item.GroupeTax}`
                );
                taxName = taxResponse.data.Rate;
              } catch (taxError) {
                console.error("Failed to fetch Tax data:", taxError);
                taxName = "";
              }
            }else {
              taxName = 0;
            }

                return {
                    number: item.ItemCode,
                    description: item.ItemName,
                    id: item.id,
                    CodeUMA: item.CodeUMA,
                    NomUM: nomUM,
                    Magasin: item.Magasin,
                    NomWarehouse: nomWarehouse || "",
                    GroupeTax: item.GroupeTax,
                    NomTax: taxName || 0
                };
            });
            const finalFormattedDataItemCode = await Promise.all(formattedDataItemCode);
            setModalContentItemCode(finalFormattedDataItemCode);
        } catch (error) {
            console.error("Failed to fetch Item data:", error);
        }
    } else if (field === 'CardCode') {
      try {
        const res = await axiosInstance.get("Partner/");
        const filteredData = res.data.filter(item => item.CardType === 'C');
        const formattedData4 = filteredData.map(item => ({
          number: item.CardName,
          description: item.CardCode,
          id: item.id ,
          type:item.CardType 
        }));
        setModalContentCardCode(formattedData4);
      } catch (error) {
        console.error("Failed to fetch Warehouse data:", error);
      }
    }
  };

  const handleCloseModal = () =>{
    setOpen(false); setPage(0);    
    setSearchQuery("");
    setSearchInputVisible(false); 
    setSelectedItem([]); 
  };
 
  const handleSelect = (item) => {
    const updatediqr1 = Rdn1.map((iqr, i) => (
      i === selectedField.index
        ? {
            ...iqr,
            [selectedField.name]: selectedField.name === "ItemCode" ? item.number : item.description,
            ...(selectedField.name === "ItemCode" && { ItemName: item.description }),
            ...(selectedField.name === "ItemCode" && { UM: item.NomUM  }),
            ...(selectedField.name === "ItemCode" && { WhsCode: item.NomWarehouse }),
            ...(selectedField.name === "ItemCode" && { VAT: item.NomTax }),
            ...(selectedField.name === "UM" && { UM: item.description }),
            ...(selectedField.name === "WhsCode" && { WhsCode: item.description })
          }
        : iqr
    ));
    const updatedoiqr = {
      ...Ordn,
      [selectedField.name]: selectedField.name === "CardCode" ? item.description : Ordn[selectedField.name],
      ...(selectedField.name === "CardCode" && { CardName: item.number })
    };
    setOrdn(updatedoiqr);
    setRdn1(updatediqr1); 
    handleCloseModal();
  };

  const handleSelectItem = (item) => {
    const isSelected = selectedItem.some(selected => selected.number === item.number);
  
    if (selectedField.name === "ItemCode" && Rdn1[selectedField.index].ItemCode) {
      
      setSelectedItem([item]); 
    } else {
      
      if (isSelected) {
        setSelectedItem(prevSelected => 
          prevSelected.filter(selected => selected.number !== item.number)
        );
      } else {
        setSelectedItem(prevSelected => [...prevSelected, item]);
      }
    }
  };
  
  const handleSaveSelectedItem = () => {
    if (selectedField.name === "ItemCode") {
      const next = fetchNextDocEntry();
      const updatedRdn1 = Rdn1.filter(row => row.ItemCode !== "");
  
      if (selectedItem.length > 0) {
      
        const currentRow = Rdn1[selectedField.index];
  
        if (!currentRow.ItemCode) {
          
          selectedItem.forEach(item => {
            updatedRdn1.push({
              DocEntry: next,
              LineNum: updatedRdn1.length + 1,
              ItemCode: item.number,
              ItemName: item.description,
              Quantity: 1,
              WhsCode: item.NomWarehouse || "",
              PrixHT: "",
              Price: "",
              Discount: "",
              RemiseTotal:'',
              VAT: item.NomTax,
              LineTotal: "",
              LineHT: "",
              UM: item.NomUM || "",
              isEditing: false,
            });
          });
        } else {
          
          const updatedRow = {
            ...currentRow,
            ItemCode: selectedItem[0].number,
            ItemName: selectedItem[0].description,
            WhsCode: selectedItem[0].NomWarehouse || "",
            VAT: selectedItem[0].NomTax || "0",
            UM: selectedItem[0].NomUM || "",
          };
  
          updatedRdn1[selectedField.index] = updatedRow;
        }
  
        setRdn1(updatedRdn1);
        handleCloseModal();
      } else {
        handleCloseModal();
        console.error("No item selected!");
      }
    } else {
      if (selectedItem.length > 0) {
        handleSelect(selectedItem[0]);
      } else {
        handleCloseModal();
        console.error("No item selected!");
      }
    }
  
    setSelectedItem([]);
    setPage(0);
    setSearchQuery("");
    setSearchInputVisible(false);
  };

  const prepareDataForSubmission = () => {
    const sortedRdn1 = Rdn1.sort((a, b) => parseInt(a.LineNum) - parseInt(b.LineNum));
    return sortedRdn1.map(Rdn1 => {
      const umItem = modalContentItemCode.find(item => item.NomUM === Rdn1.UM)?.CodeUMA || modalContentUM.find(item => item.description === Rdn1.UM)?.id;
      const whsCodeItem = modalContentItemCode.find(item => item.NomWarehouse === Rdn1.WhsCode)?.Magasin || modalContentWhsCode.find(item => item.description === Rdn1.WhsCode)?.number;
      return {
        ...Rdn1,
        UM: umItem ,
        WhsCode: whsCodeItem || Rdn1.WhsCode,
       
      };
    });
  };
    
  const allFieldsFilled = () => {
        return Rdn1.every((por) => {
          return (
 
            por.ItemCode 
 
          );
        });
  };


  const allFieldsFilleddd = () => {

        if (!Ordn.CardCode) return ` saiser Code Client`;
        if (!Ordn.CardName) return `saiser Nom Client `;

      for (const [index, Rdn] of Rdn1.entries()) {
        if (!Rdn.ItemCode) return `saiser Code Article dans ligne ${index + 1}`;
        if (!Rdn.ItemName) return `saiser Nom Article  dans ligne ${index + 1}`;
        if (!Rdn.Quantity) return `saiser Quantity dans ligne ${index + 1}`;
        if (!Rdn.WhsCode) return `saiser Magasin dans ligne ${index + 1}`;
        if (!Rdn.Price) return `saiser Price - TTC   dans ligne ${index + 1}`;
        // if (!Rdn.VAT) return `saiser TVA  dans ligne ${index + 1}`;
        if (!Rdn.UM) return `saiser Unite de Mesure dans ligne ${index + 1}`;
      }
     
      return true;
  };

 

const updateStock = async (preparedIqr1) => {
  try {
    const itemResponse = await axiosInstance.get("Item/");  
    const items = itemResponse.data;
    const updatedItems = [];
    const quantitiesMap = {};

    for (let rdn1Item of preparedIqr1) {
      const itemCode = rdn1Item.ItemCode;
      const QuantityRdn1 = parseInt(rdn1Item.Quantity, 10); 
      if (quantitiesMap[itemCode]) {
        quantitiesMap[itemCode] += QuantityRdn1;
      } else {
        quantitiesMap[itemCode] = QuantityRdn1;
      }
    }

    for (let item of items) {
      const itemCode = item.ItemCode;
      const currentStock = item.EnStock ? parseInt(item.EnStock, 10) : 0;
      if (quantitiesMap[itemCode]) {
        const newQuantité = currentStock + quantitiesMap[itemCode];

        updatedItems.push({
          ItemCode: itemCode,
          newQuantité: newQuantité
        });
      }
    }

    for (let update of updatedItems) {
      await axiosInstance.post('Item/stock', {
        ItemCode: update.ItemCode ,
        newQuantité: update.newQuantité ,
      });
    }

  } catch (error) {
    console.error("Une erreur s'est produite lors du changement d'inventaire :", error);
  }
};


  const handleSubmit = async (event) => {
    event.preventDefault();
    const fieldCheckResult = allFieldsFilleddd();
    if (fieldCheckResult !== true ) {
      setState({...state, open: true, message: ` ${fieldCheckResult}`,  severity: "error" });
      return;
    }
    const preparedIqr1 = prepareDataForSubmission();

    const stockData = preparedIqr1.map((item) => ({
      TransType: "16",  
      CardCode: Ordn.CardCode,  
      DocNum: Ordn.DocNum,  
      ItemCode: item.ItemCode,  
      LineNum: item.LineNum, 
      WhsCode: item.WhsCode,  
      Price: item.Price,  
      InQty: item.Quantity, 
      OutQty: "0",
    }));
  
    if (state.Mode === "Créer") {      
      try {
        await Promise.all([
          axiosInstance.post("ORDN", Ordn),
          ...preparedIqr1.map(item => axiosInstance.post("RDN1", item)),
          ...stockData.map((item) => axiosInstance.post("Stock", item)),
          
        ]);
        setState({ Mode: 'Créer',  vertical: 'top',  horizontal: 'center',  open: true,  message: "Operation completed successfully",  severity: "success"  });
        setOrdn({  DocNum: '',  DocDate: today,  DueDate: today,  UserSign: '',  CardCode: '',  CardName: '',  DocEntry: '',  Canceled: 'No',  DocStatus: '',  Comment: '',  TotalHT: '', DiscPrcnt:'',  RemiseTotal:'', VatSum: '',  DocTotal: ''  });
        setRdn1([{  DocEntry: "",  LineNum: "1",  ItemCode: "",  ItemName: "",  Quantity: 1,  WhsCode: "",  Price: "", PrixHT:"", Discount: "0",RemiseTotal:'',  VAT: "",  LineTotal: "", LineHT: "", UM: "",isEditing: true,  }]);
        
        await fetchNextDocEntry('Créer');
        await updateStock(preparedIqr1);
      } catch (error) {
        handelError(error);
      }
    }
    else if(state.Mode === "Mettre à jour")  {
      try {
        await Promise.all([
          axiosInstance.put(`ORDN/${Ordn.id}`, Ordn),
        ]);
        
        setState({    Mode: 'Créer',  vertical: 'top',  horizontal: 'center',  open: true,  message: "Opération correctement achevée",  severity: "success"  });
        setOrdn({  DocDate: today,  DueDate: today,  UserSign: '',  CardCode: '',  CardName: '',  Canceled: '',  DocStatus: '',  Comment: '',  TotalHT: '',  DiscPrcnt:'',  RemiseTotal:'', VatSum: '',  DocTotal: '',  DocEntry: '',  });
        setRdn1([{  LineNum: "",  ItemCode: "",  ItemName: "",  Quantity: '1',  WhsCode: "",  Price: "",PrixHT:"",  Discount: "0",RemiseTotal:'',  VAT: '0',  LineTotal: "",LineHT: "",  UM: "" ,isEditing: true,},  ]);
        await fetchNextDocEntry('Créer');
        await updateStock(preparedIqr1);
      } catch (error) {
        handelError(error);
      }
    } else {
      navigate("/");
    }
  };

   const start = <Breadcrumb routeSegments={[{ name: "Ventes", path: "/SalesOrder" }, { name: "Retour client" }]} />;
   const end =<ReturnsToolBar  setShowORDNList={setShowORDNList} Rdn1={Rdn1}
          fetchNextDocEntry={fetchNextDocEntry} state={state} setState={setState}  
          setRdn1={setRdn1}  setOrdn={setOrdn}   Ordn={Ordn}
            today={today}  handelError={handelError}
          />

  return (
   
   
      <Container>
      <div className="card">
            <Menubar start={start} end={end} style={{ border: '1px solid #dee2e600' }}/>
      </div>

      <Stack spacing={3}>
      { ShowORDNList ? (
        <ReturnsList state={state} setState={setState} setRdn1={setRdn1}  Ordn={Ordn} setOrdn={setOrdn} setShowORDNList={setShowORDNList}/>
        ) : (
        <SimpleCard>
          <ReturnsForm handleCalculations2={handleCalculations2}
           handleCloseModal={handleCloseModal} page={page} setPage={setPage} Ordn={Ordn} 
           setRowsPerPage={setRowsPerPage} allFieldsFilled={allFieldsFilled}selectedField={selectedField}
           handleSaveSelectedItem={handleSaveSelectedItem} handleSelectItem={handleSelectItem} Rdn1={Rdn1}
           handleOpenModal={handleOpenModal} setLastSavedRow={setLastSavedRow} lastSavedRow={lastSavedRow}
           setSearchQuery={setSearchQuery} searchQuery={searchQuery} selectedItem={selectedItem} open={open}
           searchInputVisible={searchInputVisible} setSelectedItem={setSelectedItem} 
           setSelectedField={setSelectedField}  setSearchInputVisible={setSearchInputVisible} state={state}
           setState={setState} today={today}  setRdn1={setRdn1} handelError={handelError} setOrdn={setOrdn} 
            axiosInstance={axiosInstance} fetchNextDocEntry={fetchNextDocEntry}
           setOpen={setOpen}  vatOptions={vatOptions} handleSubmit={handleSubmit} rowsPerPage={rowsPerPage}
           setShowORDNList={setShowORDNList} handleChange={handleChange} Mode={state.Mode}
           modalContent={{ UM: modalContentUM, WhsCode: modalContentWhsCode, ItemCode: modalContentItemCode,CardCode: modalContentCardCode }}
             />
           
        </SimpleCard>
        )}
      </Stack>
    </Container>
);
   
};

export default AppForm;