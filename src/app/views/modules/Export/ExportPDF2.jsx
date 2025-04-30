import React from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from "@mui/material";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PDFDownload = ({ fileName, tableHeaders, data, Text }) => {
  const saveAsPDF = async () => {

    const doc = new jsPDF();
    const tableData = data.map((row) => Object.values(row));
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });
    doc.save(`${fileName}.pdf`);
  };

  return (
    <Button startIcon={<FileDownloadIcon/>} onClick={saveAsPDF} disabled={ data.length === 0}> {Text}</Button>
   
  );
};

export default PDFDownload;