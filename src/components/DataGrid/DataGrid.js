import React, { useEffect, useState } from "react";
import './DataGrid.css';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function DataGrid(props) {

 const [idFile, setIdFile] = useState(null);
 const [columnDefs, setColumnDefs] = useState([]);
 const [rowData, setRowData] = useState([]);
 const [validationErrors, setValidationErrors] = useState([]);

 const loadGrid = async (idFile) => {
   setIdFile(idFile);

   try {
     const response = await fetch(`http://localhost:8080/data/getData/${idFile}`);
     const data = await response.json();

     setColumnDefs(data.header);
     setRowData(data.values);
     setValidationErrors(data.validationErrors); 

   } catch (error) {
     console.error('Error al cargar los datos:', error);
   }
 };

    // after render
    useEffect(() => {
      loadGrid(1108);
    }, []); // [] only one time

  return (
    <div className="ag-theme-quartz" style={{ height: '100%' }} >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
      />
    </div>
  );
}

export default DataGrid;
