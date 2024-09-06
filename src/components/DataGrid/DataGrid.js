import React, { useEffect, useState } from 'react';
import './DataGrid.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

function DataGrid(props) {

  useEffect(() => {
    if (props.idFile) {
      loadGrid(props.idFile);
    }
  }, [props.idFile]); // When idFile changes


  // Maneja eventos de teclado globales
  const handleKeyDown = (event) => {
    if (event.key === 'Control') {
      setCtrlPressed(true);
    }
  };

  
  const handleKeyUp = (event) => {
    setCtrlPressed(false);
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);


 const [idFile, setIdFile] = useState(null);
 const [columnDefs, setColumnDefs] = useState([]);
 const [rowData, setRowData] = useState([]);
 const [validationErrors, setValidationErrors] = useState([]);
 const [ctrlPressed, setCtrlPressed] = useState(false);
 const [selectedColumns, setSelectedColumns] = useState([]);
 const [selectedRows, setSelectedRows] = useState([]);

  const defaultColDef = {
    sortable: false,
    filter: false
  };

  const gridOptions = {
    animateRows: true
  };


 const loadGrid = async (idFile) => {
   setIdFile(idFile);

   try {
     const response = await fetch(`http://localhost:8080/data/getData/${idFile}`);
     const data = await response.json();

     setColumnDefs(data.header);
     setRowData(data.values);
     setValidationErrors(data.validationErrors); 

   } catch (error) {
     console.error('Error loading data: ', error);
   }
 };


  const onHeaderClick = (params) => {
    setSelectedRows([]);
    const headerName = params.column.getColDef().field;
    const colIndex = getColumnIndex(headerName);

    const fakeHeader = colIndex === -1;
    let array = [...selectedColumns];

    if(fakeHeader || !ctrlPressed) {
      array = [];
    }

    if(fakeHeader) {
      //Selects all
      for(let i = 0; i < columnDefs.length; i++) {
        array.push(i);
      }
    } else {
      const indexInArray = array.indexOf(colIndex);

      if(indexInArray === -1) {
        array.push(colIndex);
      } else {
        array.splice(indexInArray, 1);
      }

    }

    setSelectedColumns(array);
    selectColumn(array);
  };

  const getColumnIndex = (id) => {
    for(let i = 0; i < columnDefs.length; i++) {
      if(columnDefs[i].field===id) {
        return i - 1;
      }
    }
    return -1;
  }

  // Evento cuando se hace click en una celda
  const onCellClick = (params) => {
    setSelectedColumns([]);

    const { rowIndex } = params;
    const colIndex = getColumnIndex(params.column.colId);
    const fakeHeader = colIndex === -1;
    let array = [...selectedRows];

    //If is a regular cell or "ctrl" is not pressed
    if(!fakeHeader || !ctrlPressed) {
        array = [];
    }

     //Click in the left header
     if(fakeHeader) {
      const indexInArray = array.indexOf(rowIndex);
      if(indexInArray === -1) {
        array.push(rowIndex);
      } else {
        array.splice(indexInArray, 1);
      }
    }

    setSelectedRows(array);
    selectRows(array);


    //Highlight the column and row of selected cell
    highlightActiveCol(colIndex + 2);
    highlightActiveRow(rowIndex + 2)
  };

  const highlightActiveCol = (col) => {
    const element = document.querySelector(`[aria-colindex="${col}"]`);
    
    if (element) {
      element.classList.add('bg-range-selected');
    }
  }


  const highlightActiveRow = (row) => {
    const element = document.querySelector(`[aria-rowindex="${row}"]`);
    if (element) {
      element.children[0].classList.add('bg-range-selected');
    }
  }

  const selectRows = (rows) => {
    deselectAll();

    rows.forEach(function(rowIndex) {
      let container = document.querySelector('.ag-center-cols-container');

      if(container != null) {
        const cells = container.children[rowIndex].querySelectorAll('.ag-cell');

        cells.forEach(cell => {
          cell.classList.add('bg-range-selected');
        });
      }
    });
  }

  const deselectAll = () => {
    const cells = document.querySelectorAll('.ag-cell');
    cells.forEach(cell => {
      cell.classList.remove('bg-selected');
      cell.classList.remove('bg-range-selected');
    });

    const headers = document.querySelectorAll('.ag-header-cell');
    headers.forEach(header => {
      header.classList.remove('bg-range-selected');
    });
  }

  const selectColumn = (columns) => {
    deselectAll();
    const headers = document.querySelectorAll('.ag-header-cell');
    const cells = document.querySelectorAll('.ag-cell');

    columns.forEach(function(colIndex) {
      headers.forEach(header => {
        //Add a background en each cell of the same index
        if(header.ariaColIndex != null && colIndex == (parseInt(header.ariaColIndex) - 2)) {
          header.classList.add('bg-range-selected');
        }
      });

      cells.forEach(cell => {
        if(cell.ariaColIndex != null && colIndex == (parseInt(cell.ariaColIndex) - 2)) {
          cell.classList.add('bg-range-selected');
        }
      });
    });
  };

  return (
    <div className="ag-theme-quartz" style={{ height: '100%' }} >
      <AgGridReact
        rowData={rowData}
        defaultColDef={defaultColDef}
        gridOptions={gridOptions}
        onCellClicked={onCellClick}
        onColumnHeaderClicked={onHeaderClick}
        pagination="true"
        columnDefs={columnDefs}
      />
    </div>
  );
}

export default DataGrid;
