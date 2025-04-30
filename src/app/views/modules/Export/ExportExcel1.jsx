import React from 'react';
import { saveAs } from 'file-saver';
import XlsxPopulate from "xlsx-populate";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from "@mui/material";

const XLSXDownload = ({ fileName, tableHeaders, data, Text }) => {
  
  
  function getSheetData(data, header) {
    var fields = Object.keys(data[0]);
    var sheetData = data.map(function (row) {
      return fields.map(function (fileName) {
        return row[fileName] ? row[fileName] : "";
      });
    });
    sheetData.unshift(header);
    return sheetData;
  }

  async function saveAsExcel() {
    const rowData = data.map((row) => row);
    let header = tableHeaders;

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
        saveAs(res, `${fileName}.xlsx`);
      });
    });
  }

  return (
    <Button startIcon={<FileDownloadIcon />} onClick={saveAsExcel} disabled={data.length === 0}>
      {Text}
    </Button>
  );
};

export default XLSXDownload;
