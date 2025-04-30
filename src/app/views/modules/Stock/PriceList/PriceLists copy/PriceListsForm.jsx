import { styled, Icon} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

const ExtAndIntCommon = {
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '4px',
  height: 44,
  whiteSpace: 'pre',
  marginBottom: '8px',
  textDecoration: 'none',
  justifyContent: 'space-between',
  transition: 'all 150ms ease-in',
  '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
  '&.compactNavItem': {
    overflow: 'hidden',
    justifyContent: 'center !important',
  },
  '& .icon': {
    fontSize: '18px',
    paddingLeft: '16px',
    paddingRight: '16px',
    verticalAlign: 'middle',
  },
};
const ExternalLink = styled('a')(({ theme }) => ({
  ...ExtAndIntCommon,
  color: theme.palette.text.primary,
}));

const PriceListsForm = () => {

    const PriceLists = [{ id: "1", Name: "Liste de prix 01", TTC: "Y", }];
    const ActiveBodyTemplate = (prixlist) => {

      if (prixlist.status === 'Actif')
        return <Tag value="Actif" severity="success" style={{ fontSize: '0.7rem' }}></Tag>;
      else
        return <Tag value="Inactif" severity="warning" style={{ fontSize: '0.7rem' }}></Tag>;

    };

    const TTCBodyTemplate = (prixlist) => {
      if (prixlist.TTC === 'Y')
        return <Checkbox  checked disabled style={{ fontSize: '0.7rem' }}></Checkbox>;
      else
        return <Checkbox  disabled style={{ fontSize: '0.7rem' }}></Checkbox>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
          <ExternalLink href="/DetailPriceLists" rel="noopener noreferrer">
              <Icon color="primary" style={{ fontSize: '1.2rem' }}>edit</Icon>
          </ExternalLink>
        );
    };
  
  return (
          <div className="card">
              <DataTable value={PriceLists} size="small" tableStyle={{ minWidth: '50rem' }}  emptyMessage="Aucun groupe trouvée." >
                  <Column field="id" header="#" style={{ width: '5%' }} ></Column>
                  <Column field="Name" header="Nom de la liste de prix" style={{ width: '50%' }} ></Column>
                  <Column field="TTC" header="Prix TTC" style={{ width: '10%' }} className="TTC" body={TTCBodyTemplate}></Column>
                  <Column body={actionBodyTemplate} exportable={false} style={{ width: '5%' }}></Column>
              </DataTable>
          </div>
   );
};

export default PriceListsForm;
