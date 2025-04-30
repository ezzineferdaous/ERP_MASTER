import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import InputFileUpload from './InputFileUpload';
import Grid from '@mui/material/Grid';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1976d2',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
 
export default function BasicTable({setState, state, files, setFiles, Partner}) {

  // set db attachment and add more to the list 
    const changeFiles = (event) => {
      const selectedfiles = event.target.files;
      console.log("files.length: "+files.length);

      for (let i = 0; i < selectedfiles.length; i++) {
        setFiles([ ...files, { Line: files.length+1, FileName: selectedfiles[i].name, Date: new Date().toLocaleDateString() + "", Type: "New" }]);    
      }

      if(Partner.id === "") {
        setState({ ...state, Mode: "Créer" });
      } else  { setState({ ...state, Mode: "Mettre à jour" }); }

      console.log(files);
   };

  React.useEffect(() => {
      console.log('files - Has changed');
  },[files])
 
  return (
    <div>
       <Grid sx={{ p :'.5em'}} container direction="row" justifyContent="space-between" alignItems="center" >
          <Grid item></Grid>
          <Grid item><InputFileUpload changeFiles={changeFiles} /></Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
              <TableRow>
                <StyledTableCell sx={{ pl :'2rem'}}>Nom de fichier</StyledTableCell>
                <StyledTableCell>Date de la pièce jointe</StyledTableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <StyledTableRow  key={file.Line} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <StyledTableCell sx={{ pl :'2rem'}}> {file.FileName} </StyledTableCell>
                <StyledTableCell > {file.Date} </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
