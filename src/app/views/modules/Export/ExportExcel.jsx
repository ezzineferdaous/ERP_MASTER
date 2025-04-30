import React from 'react';
import { saveAs} from 'file-saver';
import XlsxPopulate from "xlsx-populate";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from "@mui/material";

const XLSXDownload = (props) => {

    function getSheetData(data,header) {
        var fields = Object.keys(data[0]);
        var sheetData = data.map(function (row) {
            return fields.map(function (fieldName) {
            return row[fieldName] ? row[fieldName] : "";
            });
        });
        sheetData.unshift(header);
        return sheetData;
    }

    async function saveAsExcel() {
        //console.log(data.data); 
        const rowData = props.data.map((row) => row.original);
        let header = props.tableHeaders;
     
        XlsxPopulate.fromBlankAsync().then(async (workbook) => {
          const sheet1 = workbook.sheet(0);
          const sheetData = getSheetData(rowData, header);
          const totalColumns = sheetData[0].length;
    
          sheet1.cell("A1").value(sheetData);
          const range = sheet1.usedRange();
          const endColumn = String.fromCharCode(64 + totalColumns);
          sheet1.row(1).style("bold", true);
          sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
          range.style("border", true);
          return workbook.outputAsync().then((res) => {
            saveAs(res, "file.xlsx");
          });
        });
      }

    return (
        <Button startIcon={<FileDownloadIcon/>} disabled={props.disabled} onClick={saveAsExcel}> {props.Text} </Button>
    );
};

export default XLSXDownload;