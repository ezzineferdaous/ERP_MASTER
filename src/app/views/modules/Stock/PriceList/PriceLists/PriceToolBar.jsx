import { IconButton } from '@mui/material';
import { styled } from '@mui/system';
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

  const ToolBar = ({ Item, setItem, state, setState, handelError, setshowItem, setImageURL}) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });
  const path = "/assets/images/uploads/";

  const Add = async (e) => {
    setItem({ id: null, ItemCode: null, ItemName: null, NomEtrange:null, CodeBarre:null, Vendu:'Y', Active:'Y', Achete:'Y', Magasin:null, Famille:null, Stock:null, Picture:null, ItemGroupe:null, Sfamille:null, CodeUMV:null, CodeUMA:null, CodeUMS:null , ArticleGerePar:null, Remarque:null, PJ:null, EnStock: null, CmptCharges:null, CmptProduit:null, CmptStock:null, CmptVariation:null, GroupeTax:null , CodeReadOnly: false });
    setState({ ...state, Mode: "Créer", CodeReadOnly: false });
  };
  const Print = async (e) => {
    e.preventDefault();
    try {
      alert('Print');
    } catch (error) {
      setState({ ...state,vertical: 'top', horizontal: 'center', open: true, message: error.response.data.message, severity: 'error', CodeReadOnly: false });
    }
  };  
  const List = async (e) => {
    e.preventDefault();
    try {
      setshowItem(true);
    } catch (error) {
      console.log(error);
    }
  };

  const GetFirst = async() => {
      const response = await axiosInstance.get('Item/' + (await axiosInstance.get('Item/data/Min')).data.id + '' );
      setItem({ id: response.data.id, ItemCode: response.data.ItemCode, ItemName: response.data.ItemName, NomEtrange: response.data.NomEtrange, CodeBarre: response.data.CodeBarre, Vendu: response.data.Vendu, Active: response.data.Active, Achete: response.data.Achete, Magasin: response.data.Magasin, Famille: response.data.Famille, Stock:response.data.Stock, Picture: response.data.Picture, ItemGroupe: response.data.ItemGroupe, Sfamille: response.data.Sfamille, CodeUMV: response.data.CodeUMV, CodeUMA: response.data.CodeUMA, CodeUMS: response.data.CodeUMS, ArticleGerePar: response.data.ArticleGerePar, Remarque: response.data.Remarque, PJ: response.data.PJ, EnStock: response.data.EnStock, CmptCharges: response.data.CmptCharges, CmptProduit: response.data.CmptProduit, CmptStock: response.data.CmptStock, CmptVariation: response.data.CmptVariation, GroupeTax: response.data.GroupeTax  });
      setState({ ...state, Mode: 'OK', CodeReadOnly: true });
      
      if(response.data.Picture != null) { setImageURL({ preview: path + response.data.Picture,   raw: ''}); }
      else { setImageURL({ preview: "../../../../assets/images/placeholder.png",   raw: ''}); }

      console.log("ItemCode: "+response.data.ItemCode);
      console.log("Sfamille: "+response.data.Sfamille);
  }

  const GetPrevious = async() => {
    if(Item.id === null) { GetFirst(); }
    else {
          const PreviousItem = await axiosInstance.get('Item/data/Previous/' + Item.id);
          if (PreviousItem.data.id != null) {
            setItem({ id: PreviousItem.data.id.id, ItemCode: PreviousItem.data.id.ItemCode, ItemName: PreviousItem.data.id.ItemName, NomEtrange: PreviousItem.data.id.NomEtrange, CodeBarre: PreviousItem.data.id.CodeBarre, Vendu: PreviousItem.data.id.Vendu, Active: PreviousItem.data.id.Active, Achete: PreviousItem.data.id.Achete, Magasin: PreviousItem.data.id.Magasin, Famille: PreviousItem.data.id.Famille, Stock:PreviousItem.data.id.Stock, Picture: PreviousItem.data.id.Picture, ItemGroupe: PreviousItem.data.id.ItemGroupe, Sfamille: PreviousItem.data.id.Sfamille, CodeUMV: PreviousItem.data.id.CodeUMV, CodeUMA: PreviousItem.data.id.CodeUMA, CodeUMS: PreviousItem.data.id.CodeUMS, ArticleGerePar: PreviousItem.data.id.ArticleGerePar, Remarque: PreviousItem.data.id.Remarque, PJ: PreviousItem.data.id.PJ, EnStock: PreviousItem.data.id.EnStock, CmptCharges: PreviousItem.data.id.CmptCharges, CmptProduit: PreviousItem.data.id.CmptProduit, CmptStock: PreviousItem.data.id.CmptStock, CmptVariation: PreviousItem.data.id.CmptVariation, GroupeTax: PreviousItem.data.id.GroupeTax  });
            setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });

            console.log(PreviousItem.data.id.Picture);
            console.log(path + PreviousItem.data.id.Picture);
            if(PreviousItem.data.id.Picture != null) { setImageURL({  Preview: path + PreviousItem.data.id.Picture,  raw: ''}); }
            else { setImageURL({ preview: "../../../../assets/images/placeholder.png",   raw: ''}); }

          } else { setState({ ...state, open: true, message: 'Premier enregistrement', severity: 'info' }); }
    }
  }

  const GetNext = async() => {
    if(Item.id === null) { GetLast(); }
    else {
          const NextItem = await axiosInstance.get('Item/data/Next/' +Item.id);
          if (NextItem.data.id != null) {
            setItem({id: NextItem.data.id.id, ItemCode: NextItem.data.id.ItemCode, ItemName: NextItem.data.id.ItemName, NomEtrange: NextItem.data.id.NomEtrange, CodeBarre: NextItem.data.id.CodeBarre, Vendu: NextItem.data.id.Vendu, Active: NextItem.data.id.Active, Achete: NextItem.data.id.Achete, Magasin: NextItem.data.id.Magasin, Famille: NextItem.data.id.Famille, Stock:NextItem.data.id.Stock, Picture: NextItem.data.id.Picture, ItemGroupe: NextItem.data.id.ItemGroupe, Sfamille: NextItem.data.id.Sfamille, CodeUMV: NextItem.data.id.CodeUMV, CodeUMA: NextItem.data.id.CodeUMA, CodeUMS: NextItem.data.id.CodeUMS, ArticleGerePar: NextItem.data.id.ArticleGerePar, Remarque: NextItem.data.id.Remarque, PJ: NextItem.data.id.PJ, EnStock: NextItem.data.id.EnStock, CmptCharges: NextItem.data.id.CmptCharges, CmptProduit: NextItem.data.id.CmptProduit, CmptStock: NextItem.data.id.CmptStock, CmptVariation: NextItem.data.id.CmptVariation, GroupeTax: NextItem.data.id.GroupeTax  });
            setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
            if(NextItem.data.id.Picture != null) { setImageURL({  preview: path + NextItem.data.id.Picture, raw: ''}); }
            else { setImageURL({ preview: "../../../../assets/images/placeholder.png",   raw: ''}); }
          } else { setState({ ...state, open: true, message: 'Dernier enregistrement', severity: 'info' }); }
    }
  }

  const GetLast = async() => {
        const response = await axiosInstance.get('Item/' + (await axiosInstance.get('Item/data/Max')).data.id + '');
        setItem({ id: response.data.id, ItemCode: response.data.ItemCode, ItemName: response.data.ItemName, NomEtrange: response.data.NomEtrange, CodeBarre: response.data.CodeBarre, Vendu: response.data.Vendu, Active: response.data.Active, Achete: response.data.Achete, Magasin: response.data.Magasin, Famille: response.data.Famille, Stock:response.data.Stock, Picture: response.data.Picture, ItemGroupe: response.data.ItemGroupe, Sfamille: response.data.Sfamille, CodeUMV: response.data.CodeUMV, CodeUMA: response.data.CodeUMA, CodeUMS: response.data.CodeUMS, ArticleGerePar: response.data.ArticleGerePar, Remarque: response.data.Remarque, PJ: response.data.PJ, EnStock: response.data.EnStock, CmptCharges: response.data.CmptCharges, CmptProduit: response.data.CmptProduit, CmptStock: response.data.CmptStock, CmptVariation: response.data.CmptVariation, GroupeTax: response.data.GroupeTax  });
        setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
        if(response.data.Picture != null) { setImageURL({  preview: path + response.data.Picture,  raw: ''}); }
        else { setImageURL({ preview: "../../../../assets/images/placeholder.png",   raw: ''}); }
  }

  const Navigate = async (direction) => { 
    try {
      if (direction === 'First') {  GetFirst(); }
      else if (direction === 'Previous') { GetPrevious(); }
      else if (direction === 'Next') { GetNext(); }
      else if (direction === 'Last') { GetLast(); }
    } catch (error) { handelError(""+error); }
  };

  return (
    <IconBox>
    <IconButton onClick={Add} aria-label="Nouveau" size="small"><AddIcon fontSize="small" /></IconButton>
    <IconButton onClick={Print} aria-label="imprimer" size="small"><PrintIcon fontSize="small" /></IconButton>
    <IconButton onClick={() => Navigate('First')} aria-label="Premier" size="small"><KeyboardDoubleArrowLeftIcon fontSize="small" /></IconButton>
    <IconButton onClick={() => Navigate('Previous')} aria-label="Précédent" size="small"><KeyboardArrowLeftIcon fontSize="small" /></IconButton>
    <IconButton onClick={() => Navigate('Next')} aria-label="Suivant" size="small"><KeyboardArrowRightIcon fontSize="small" /></IconButton>
    <IconButton onClick={() => Navigate('Last')} aria-label="Dernier" size="small"><KeyboardDoubleArrowRightIcon fontSize="small" /></IconButton>
    <IconButton onClick={List} aria-label="Filtrer" size="small"><FormatListBulletedIcon fontSize="small" /></IconButton>
  </IconBox>
  );
};

export default ToolBar;
