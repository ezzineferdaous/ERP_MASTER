import * as React from 'react';
import { Tabs, Tab, Box, InputLabel, MenuItem, Select, Grid } from "@mui/material";
import { useState, useRef  } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { FilterMatchMode  } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

  const PartnersLists = [
    {id: 1,  CardCode: "F006381", CardName: "ZSN sarl" },
    {id: 2,  CardCode: "C000127", CardName: "ZOUHEIR BAHAEDDINE" },
    {id: 3,  CardCode: "F006669", CardName: "ZOUHAIR PUB" },
    {id: 4,  CardCode: "F000303", CardName: "ZNAGA INDUSTRIE" },
    {id: 5,  CardCode: "C000145", CardName: "ZIZ" },
    {id: 6,  CardCode: "F006598", CardName: "ZILAN NEGOCE" },
    {id: 7,  CardCode: "F000787", CardName: "ZIADI TRAVAUX" },
    {id: 8,  CardCode: "F187000", CardName: "ZEROUAL MBAREK" },
    {id: 9,  CardCode: "F006019", CardName: "ZENITH HOTEL" },
    {id: 10,  CardCode: "C000112", CardName: "ZAKARIA BARAKAT" },
    {id: 11,  CardCode: "C000138", CardName: "YOUSSEF ZERDANE" },
    {id: 12,  CardCode: "C000156", CardName: "Youssef LAHLOU" },
    {id: 13,  CardCode: "F006660", CardName: "YOUSS MATERIAUX" },
    {id: 14,  CardCode: "YAHYA STAR", CardName: "YAHYA STAR" },
    {id: 15,  CardCode: "YACOUT ELEC", CardName: "F006452" },
  ];

  const GroupsLists = [
    {id: 1,  GroupeName: "BLÉ DUR.", Discount: "0,00"},
    {id: 2,  GroupeName: "BLÉ TENDRE.", Discount: "0,00"},
    {id: 3,  GroupeName: "CONSERVE.", Discount: "0,00"},
    {id: 4,  GroupeName: "DECHETS.", Discount: "0,00"},
    {id: 5,  GroupeName: "Produits Finis.", Discount: "0,00"},
    {id: 6,  GroupeName: "THE VERT.", Discount: "0,00"},
    {id: 7,  GroupeName: "Pièces de rechange.", Discount: "0,00"},
    {id: 8,  GroupeName: "Services.", Discount: "0,00"},
    {id: 9,  GroupeName: "Emballages.", Discount: "0,00"},
    {id: 10,  GroupeName: "MAIS.", Discount: "0,00"},
    {id: 11,  GroupeName: "Fournitures bureau.", Discount: "0,00"},
    {id: 12,  GroupeName: "Matières Premières.", Discount: "0,00"},
    {id: 13,  GroupeName: "Produits Semi Finis.", Discount: "0,00"},
    {id: 14,  GroupeName: "Marchandises.", Discount: "0,00"},
    {id: 15,  GroupeName: "Fourniture Vestimentaires.", Discount: "0,00"},
   ];

  const ItemsLists = [
    {id: 1, ItemCode: "PV0008", ItemName: "TOMATE DOUBLE CONCENTRE 60G.", Discount: "0,00"},
    {id: 2,ItemCode: "SF0001", ItemName: "Vermicelles Fin Vrac" , Discount: "0,00"},
    {id: 3,ItemCode: "SF0018", ItemName: "Spaghetti Vrac" , Discount: "0,00"},
    {id: 4,ItemCode: "EM0117", ItemName: "EM Vermicelles Moyen AL JAWHARA C 500G" , Discount: "0,00"},
    {id: 5,ItemCode: "PF0116", ItemName: "The vert en Filament 4011, boite 200 g" , Discount: "0,00"},
    {id: 6,ItemCode: "PF0075", ItemName: "Penne  Regaté  AL JAWHARA C 1/2 KG" , Discount: "0,00"},
    {id: 7,ItemCode: "PF0076", ItemName: "FARINE FINO 5KG" , Discount: "0,00"},
    {id: 8,ItemCode: "PF0118", ItemName: "The Gunpowder extra, boite 200 g" , Discount: "0,00"},
    {id: 9,ItemCode: "PV0007", ItemName: "PATE A TARTINER DUO 700G" , Discount: "0,00"},
    {id: 10,ItemCode: "PV0009", ItemName: "Couscous Fin AL JAWHARA L 25 KG" , Discount: "0,00"},
    {id: 11,ItemCode: "PV0010", ItemName: "TOMATE DOUBLE CONCENTRE 800G" , Discount: "0,00"},
    {id: 12,ItemCode: "PV0011", ItemName: "Coquillette Moyen Vrac" , Discount: "0,00"},
    {id: 13,ItemCode: "PV0012", ItemName: "Couscous Fin Vrac" , Discount: "0,00"},
    {id: 14,ItemCode: "PV0013", ItemName: "SEMOULE GROS 10KG" , Discount: "0,00"},
    {id: 15,ItemCode: "PF0132", ItemName: "FARINE DE MAIS EL HILAL 10 KG" , Discount: "0,00"},
    {id: 16,ItemCode: "PF0133", ItemName: "Petit Plomb Moyen AL JAWHARA CD 1/2KG" , Discount: "0,00"},
    {id: 17,ItemCode: "PF0134", ItemName: "FARINE LUXE AL JAWHARA 10 KG" , Discount: "0,00"},
  ];
  const FamilleLists = [
    {id: 1,  FamilleName: "BJORN AXEN", Discount: "0,00"},
    {id: 2,  FamilleName: "STERIFEL", Discount: "0,00"},
    {id: 3,  FamilleName: "3M", Discount: "0,00"},
    {id: 4,  FamilleName: "EYE CARE", Discount: "0,00"},
    {id: 5,  FamilleName: "ACE", Discount: "0,00"},
    {id: 6,  FamilleName: "ALPHANOVA", Discount: "0,00"},
    {id: 7,  FamilleName: "ADDAX", Discount: "0,00"},
    {id: 8,  FamilleName: "ADDITIVA", Discount: "0,00"},
    {id: 9,  FamilleName: "ADERMA", Discount: "0,00"},
    {id: 10,  FamilleName: "PENTASKIN", Discount: "0,00"},
    {id: 11,  FamilleName: "ALBADERM", Discount: "0,00"},
    {id: 12,  FamilleName: "ALLERGIKA", Discount: "0,00"},
    {id: 13,  FamilleName: "AMONA", Discount: "0,00"},
    {id: 14,  FamilleName: "ANNICK DELMAS", Discount: "0,00"},
    {id: 15,  FamilleName: "AQUAFRESH", Discount: "0,00"},
    {id: 16,  FamilleName: "ARGILETZ", Discount: "0,00"},
    {id: 17,  FamilleName: "ARMONY", Discount: "0,00"},
    {id: 18,  FamilleName: "AURIGA", Discount: "0,00"},
  ];
  const SousFamilleLists = [
    {id: 1,  SFamilleName: "AURIGA", Discount: "0,00"},
    {id: 2,  SFamilleName: "AVENE", Discount: "0,00"},
    {id: 3,  SFamilleName: "AVENT", Discount: "0,00"},
    {id: 4,  SFamilleName: "EYE CARE COSMETICS", Discount: "0,00"},
    {id: 5,  SFamilleName: "BANITEX", Discount: "0,00"},
    {id: 6,  SFamilleName: "BAYER", Discount: "0,00"},
    {id: 7,  SFamilleName: "ALGOTHERM", Discount: "0,00"},
    {id: 8,  SFamilleName: "BCI", Discount: "0,00"},
    {id: 9,  SFamilleName: "BGOOD", Discount: "0,00"},
    {id: 10,  SFamilleName: "BIAFINE", Discount: "0,00"},
    {id: 11,  SFamilleName: "BIO CONSEILS", Discount: "0,00"},
    {id: 12,  SFamilleName: "BIO COSMETIQUE", Discount: "0,00"},
    {id: 13,  SFamilleName: "BIO ORGANIC", Discount: "0,00"},
    {id: 14,  SFamilleName: "BIOCOS", Discount: "0,00"},
    {id: 15,  SFamilleName: "BIODERMA", Discount: "0,00"},
    {id: 16,  SFamilleName: "BIOFAR", Discount: "0,00"},
    {id: 17,  SFamilleName: "BIOGENINA", Discount: "0,00"},
    {id: 18,  SFamilleName: "BIORGA", Discount: "0,00"},
  ];

const DiscountGroupsForm = () => {

  const toast = useRef(null);

  const [ filters_PartnersLists, setFilters_PartnersLists] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [ filters_GroupsLists, setFilters_GroupsLists] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [ filters_ItemsLists, setFilters_ItemsLists ] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [ filters_FamilleLists, setFilters_FamilleLists] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [ filters_SousFamilleLists, setFilters_SousFamilleLists ] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });

  const onGlobalFilterChange_PartnersLists = (event) => {
      const value = event.target.value;
      let _filters = { ...filters_PartnersLists };
      _filters['global'].value = value;
      setFilters_PartnersLists(_filters);
  }; 
  const onGlobalFilterChange_GroupsLists = (event) => {
    const value = event.target.value;
    let _filters = { ...filters_GroupsLists };
    _filters['global'].value = value;
    setFilters_GroupsLists(_filters);
};  
  const onGlobalFilterChange_ItemsLists = (event) => {
    const value = event.target.value;
    let _filters = { ...filters_ItemsLists };
    _filters['global'].value = value;
    setFilters_ItemsLists(_filters);
  }; 
  const onGlobalFilterChange_FamilleLists = (event) => {
    const value = event.target.value;
    let _filters = { ...filters_FamilleLists };
    _filters['global'].value = value;
    setFilters_FamilleLists(_filters);
  }; 
  const onGlobalFilterChange_SousFamilleLists = (event) => {
    const value = event.target.value;
    let _filters = { ...filters_SousFamilleLists };
    _filters['global'].value = value;
    setFilters_SousFamilleLists(_filters);
  }; 

  const renderHeader_PartnersLists = () => {
      const value = filters_GroupsLists['global'] ? filters_GroupsLists['global'].value : '';
      return (
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange_PartnersLists(e)} placeholder="Search" />
          </span>
      );
  };

  const renderHeader_GroupsLists = () => {
    const value = filters_GroupsLists['global'] ? filters_GroupsLists['global'].value : '';
    return (
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange_GroupsLists(e)} placeholder="Search" />
        </span>
    );
};

  const renderHeader_ItemsLists = () => {
    const value = filters_ItemsLists['global'] ? filters_ItemsLists['global'].value : '';
    return (
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange_ItemsLists(e)} placeholder="Search" />
        </span>
    );
  };

  const renderHeader_FamilleLists = () => {
    const value = filters_FamilleLists['global'] ? filters_FamilleLists['global'].value : '';
    return (
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange_FamilleLists(e)} placeholder="Search" />
        </span>
    );
  };

  const renderHeader_SousFamilleLists = () => {
    const value = filters_SousFamilleLists['global'] ? filters_SousFamilleLists['global'].value : '';
    return (
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange_SousFamilleLists(e)} placeholder="Search" />
        </span>
    );
  };

  const onCellEditComplete = (e) => {

      let { rowData, newValue, field } = e;
      rowData[field] = newValue;

  };

  const cellEditor = (options) => {
      if (options.field === 'Discount') return DiscountEditor(options);
      else return textEditor(options);
  };

  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  };

  const DiscountEditor = (options) => {
    return <InputNumber value = {isNaN(options.value) ? '' : options.value} onValueChange={(e) => options.editorCallback(e.value)} minFractionDigits={2} onFocus={event => event.target.select()} />;
  };

  const header_PartnersLists = renderHeader_PartnersLists();
  const header_GroupsLists = renderHeader_GroupsLists();
  const header_ItemsLists = renderHeader_ItemsLists();
  const header_FamilleLists = renderHeader_FamilleLists();
  const header_SousFamilleLists = renderHeader_SousFamilleLists();

  const [tabIndex, setTabIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rowClick] = useState(true);
  const [SelectedCardCode, setSelectedCardCode] = useState("");
  const [SelectedCardName, setSelectedCardName] = useState("");

  const handleTabChange = (event, newTabIndex) => { setTabIndex(newTabIndex);  };    
  const handleTypeSelectOnChange = event => { 

        console.log(event.target.value); 
        var ComboVal = event.target.value;

        if(ComboVal === 'TP') {
          console.log("Show All Partners"); 
          document.getElementById("CName").style.display="none";
          document.getElementById("SName").style.display="none";
          document.getElementById("CardCode").style.display="none";

        } else if (ComboVal === 'GC') {
          console.log("Show Groupes Client"); 
          document.getElementById("CName").style.display="block";
          document.getElementById("SName").style.display="none";
          document.getElementById("CardCode").style.display="none";
        } else if (ComboVal === 'GF') {
          console.log("Show Groupes Fournisseurs");
          document.getElementById("CName").style.display="none";
          document.getElementById("SName").style.display="block";
          document.getElementById("CardCode").style.display="none";
        } else if (ComboVal === 'PS') {
          console.log("Show Groupes Partenaires Special");
          document.getElementById("CName").style.display="none";
          document.getElementById("SName").style.display="none";
          document.getElementById("CardCode").style.display="block";

        }

  };

  const onRowSelect = (event) => {
      setSelectedCardCode(event.data.CardCode);
      setSelectedCardName(event.data.CardName);
  };

  const onRowUnselect = () => {
      setSelectedCardCode("");
      setSelectedCardName("");
  };

  const ChoosePartner = () => {
    console.log("SelectedCardCode: "+SelectedCardCode);
    console.log("SelectedCardCode: "+SelectedCardName);

    if(SelectedCardCode !== "") {
      document.getElementById("SearchCardCode").value = SelectedCardCode;
      document.getElementById("SearchCardName").value = SelectedCardName;
    } else {
      console.log("Value: "+SelectedCardCode);
    }

    setVisible(false);

  }; 

  const ClearRows = () => {

    console.log("ClearRows");

    var DiscountGroupeCollection = document.getElementsByClassName('DiscountGroupe p-editable-column');

    for(var i = 0; i < DiscountGroupeCollection.length; i++) {
      var item = DiscountGroupeCollection[i];
      console.log(item);
      item.innerHTML = '<a tabindex="0" class="p-cell-editor-key-helper p-hidden-accessible"><span></span></a> 0,00'; //Error when clicking on the  edited cells
    }

  }; 

  const Save = () => {
    console.log("Save ");
    toast.current.show({severity:'success', summary: 'Success', detail:'Opération correctement achevée', life: 3000});
    //toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
  }; 

  const Cancel = () => {
    console.log("Cancel ");

  }; 
  
  return (

    <Grid container spacing={3}>  

         {/*<div className="flex align-items-center">
              <Checkbox inputId="Actif" value="Y" />
              <label htmlFor="Actif" className="ml-2">Actif</label>
            </div>*/}

          <Grid item lg={3} md={3} sm={3} xs={3} sx={{ mt: 0 }}>
            <Box className="breadcrumb">
                  <InputLabel variant="standard" htmlFor="uncontrolled-native"> Type  </InputLabel>
                  <Select size="small" defaultValue="TP" style = {{ width: '100%' }} onChange={handleTypeSelectOnChange}>
                      <MenuItem value="TP">Tous les partenaires</MenuItem> 
                      <MenuItem value="GC">Groupe de clients</MenuItem>
                      <MenuItem value="GF">Groupe de fournisseurs</MenuItem>
                      <MenuItem value="PS">Partenaire spécifique</MenuItem>
                  </Select>
              </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={6} sx={{ mt: 0 }}>
              <Box className="breadcrumb" id="CName" sx={{ display: 'none' }}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native"> Nom de groupe Client</InputLabel>
                  <Select size="small" defaultValue="G1" style = {{ width: '100%' }}> 
                      <MenuItem value="G1">Groupe Client 1</MenuItem>
                      <MenuItem value="G2">Groupe Client 2</MenuItem>
                  </Select>
              </Box>

              <Box className="breadcrumb" id="SName" sx={{ display: 'none' }}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native"> Nom de groupe Fournisseur</InputLabel>
                  <Select size="small" defaultValue="G1" style = {{ width: '100%' }}> 
                      <MenuItem value="G1">Groupe Fournisseur 1</MenuItem>
                      <MenuItem value="G2">Groupe Fournisseur 2</MenuItem>
                  </Select>
              </Box>

              <Box className="breadcrumb" id="CardCode" sx={{ display: 'none' }}>
                  <div className="card flex flex-column md:flex-row gap-3" >                     
                      <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <div className="p-inputgroup">
                                <InputText id="SearchCardCode" placeholder="Code du partenaire" />
                                <Button icon="pi pi-search" className="p-button-warning" onClick={() => setVisible(true)} />
                              </div>
                            </Grid>

                            <Grid item xs={8}>
                              <div className="p-inputgroup">
                                <InputText id="SearchCardName" placeholder="Nom du partenaire" />
                                <Button icon="pi pi-search" className="p-button-warning" onClick={() => setVisible(true)} />
                              </div>
                            </Grid>
                      </Grid>
                  </div>
              </Box>
          </Grid>

          <Grid item lg={3} md={3} sm={3} xs={3} sx={{ mt: 0 }} justifyContent="flex-end" >                 
                 <Box display="flex" justifyContent="flex-end">
                    <Button color="primary" variant="contained" type="button" onClick={ClearRows} >  Réinitialiser </Button>
                </Box>
           </Grid>
           
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 0 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs   value={tabIndex} onChange={handleTabChange} textColor="secondary" indicatorColor="secondary" aria-label="secondary tabs example" >
                    <Tab label="Groupes d'articles" />
                    <Tab label="Famille" /> 
                    <Tab label="Sous Famille" />
                    <Tab label="Articles" />
                  </Tabs>
                </Box>

                <Box sx={{ padding: 2 }}>
                  {tabIndex === 0 && (
                        <div className="card">
                            <DataTable value={GroupsLists} editMode="cell" size="small" header={header_GroupsLists} stripedRows paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50, 100]} tableStyle={{ minWidth: '50rem' }}  emptyMessage="Aucun groupe trouvée." filters={filters_GroupsLists} onFilter={(e) => setFilters_GroupsLists(e.filters)}>
                                <Column field="id" header="#" style={{ width: '5%' }} sortable ></Column>
                                <Column field="GroupeName" header="Nom groupe d'articles" style={{ width: '70%' }} sortable ></Column>
                                <Column field="Discount" header="Remise %" style={{ width: '25%' }} className="DiscountGroupe" sortable editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
                            </DataTable>
                        </div>
                    )}
                  {tabIndex === 1 && (
                        <div className="card">
                            <DataTable value={FamilleLists} editMode="cell" size="small" header={header_FamilleLists} stripedRows paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50, 100]} tableStyle={{ minWidth: '50rem' }}  emptyMessage="Aucun famille trouvée." filters={filters_FamilleLists} onFilter={(e) => setFilters_FamilleLists(e.filters)}>
                                <Column field="id" header="#" style={{ width: '5%' }} sortable ></Column>
                                <Column field="FamilleName" header="Nom de Famille" style={{ width: '70%' }} sortable ></Column>
                                <Column field="Discount" header="Remise %" style={{ width: '25%' }} sortable editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
                            </DataTable>
                        </div>
                  )}
                  {tabIndex === 2 && (
                        <div className="card">
                            <DataTable value={SousFamilleLists} editMode="cell" size="small" header={header_SousFamilleLists} stripedRows paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50, 100]} tableStyle={{ minWidth: '50rem' }}  emptyMessage="Aucun sous famille trouvée." filters={filters_SousFamilleLists} onFilter={(e) => setFilters_SousFamilleLists(e.filters)}>
                                <Column field="id" header="#" style={{ width: '5%' }} sortable ></Column>
                                <Column field="SFamilleName" header="Nom de Sous Famille" style={{ width: '70%' }} sortable ></Column>
                                <Column field="Discount" header="Remise %" style={{ width: '25%' }} sortable editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
                            </DataTable>
                        </div>
                  )}
                  {tabIndex === 3 && (
                        <div className="card">
                              <DataTable value={ItemsLists} editMode="cell" size="small" header={header_ItemsLists} stripedRows paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50, 100]} tableStyle={{ minWidth: '50rem' }} 
                                        emptyMessage="Aucun article trouvée." filters={filters_ItemsLists} onFilter={(e) => setFilters_ItemsLists(e.filters)}>
                                <Column field="id" header="#" style={{ width: '5%' }} sortable ></Column>
                                <Column field="ItemCode" header="Numéro d'article" style={{ width: '25%' }} sortable ></Column>
                                <Column field="ItemName" header="Description article" style={{ width: '45%' }} sortable ></Column>
                                <Column field="Discount" header="Remise %" style={{ width: '25%' }} sortable editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
                            </DataTable>
                        </div>
                  )}
                </Box>
          </Grid>


          <div className="card buttoncard flex flex-wrap justify-content-center gap-6">
            <Button onClick={Save} label="Créer" icon="pi pi-check" />
            <Button onClick={Cancel} label="Interrompre" icon="pi pi-times" />
          </div>

          <Toast ref={toast} position="top-left"  />
          <Dialog header="Liste Des Partenaires" visible={visible} onHide={() => setVisible(false)} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                   <div className="card">
                      <DataTable value={PartnersLists} onRowSelect={onRowSelect} onRowUnselect={onRowUnselect} metaKeySelection={false} selectionMode={rowClick ? null : 'radiobutton'} selection={selectedProduct} onSelectionChange={(e) => setSelectedProduct(e.value)} editMode="cell" size="small" header={header_PartnersLists} stripedRows paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50, 100]} tableStyle={{ minWidth: '50rem' }}  emptyMessage="Aucun partenaire trouvée." filters={filters_PartnersLists} onFilter={(e) => setFilters_PartnersLists(e.filters)}>
                          <Column selectionMode="single" field="id" header="#" style={{ width: '5%' }} sortable ></Column>
                          <Column field="CardCode" header="Code Partenaire" style={{ width: '25%' }} sortable ></Column>
                          <Column field="CardName" header="Nom Partenaire" style={{ width: '75%' }} sortable ></Column>
                      </DataTable>
                          <Button label="Sélectionner" icon="pi pi-check" onClick={ChoosePartner} />
                  </div>
           </Dialog>
   </Grid>

   );
};

export default DiscountGroupsForm;
