import React from 'react';
 import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from "@mui/material";
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';

const PDFDownload = (props) => {

    async function saveAsPDF() {
      console.log(props.data);
        const doc = new jsPDF();
        const tableData = props.data.map((row) => Object.values(row.original));
        let tableHeaders = props.tableHeaders;
            
        autoTable(doc, {
          head: [tableHeaders],
          body: tableData,
        });
    
        doc.save(props.fileName+'.pdf');
      }
    return (
        <Button startIcon={<FileDownloadIcon/>} disabled={props.disabled} onClick={saveAsPDF}> {props.Text} </Button>
    );
};

export default PDFDownload;