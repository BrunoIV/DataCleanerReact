import './App.css';
import RibbonMenu from './components/RibbonMenu/RibbonMenu';
import DataGrid from './components/DataGrid/DataGrid';
import Sidebar from './components/Sidebar/Sidebar';
import { useState } from 'react';
import { normalize } from './services/apiService';
import { validate } from './services/apiService';
import { fillAutoIncremental } from './services/apiService';
import { loadHistory } from './services/apiService';
import { fillFixedValue } from './services/apiService';
import { newFile } from './services/apiService';
import { addColumn } from './services/apiService';
import React, { useRef } from 'react';


function App() {

	const [selectedId, setSelectedId] = useState(null);
	const [selectedCell, setSelectedCell] = useState(null);
	const [validationErrors, setValidationErrors] = useState([]);
	const [historyList, setHistoryList] = useState([]);
	const [refreshGrid, setrefreshGrid] = useState(0);
	const [selectedHistory, setSelectedHistory] = useState(0);
	const [selectedError, setSelectedError] = useState(0);
	const columns = [1];
	const sidebarRef = useRef();


	// Función que recibe el ID desde el hijo
	const openFileWithId = (id) => {
	  setSelectedId(id);
	  doLoadHistory(id);
	};

	const doLoadHistory = (id) => {
		loadHistory(id).then(response => {
			setHistoryList(response);
		})
		.catch(error => {
			console.error('Error:', error);
		});
	};


	const doNewFile = () => {
		const name = prompt('New name?');
		if(name !== null) {
			newFile(name)
			.then(response => {
				sidebarRef.current?.loadFiles(); 
			})
			.catch(error => {
				console.error('Error:', error);
			});
		}
	};
	
	const doValidation = (menu) => {
		const fn = menu.split('_')[1];

		validate(columns, 'validate_' + fn, selectedId)
		.then(response => {
			setValidationErrors(response);
		})
		.catch(error => {
			console.error('Error:', error);
		});
	};

	const doNormalize = (menu) => {
		const fn = menu.split('_')[1];

		normalize(columns, fn, selectedId)
		.then(response => {
			doRefreshGrid();
		})
		.catch(error => {
			console.error('Error:', error);
		});
	};

	const doFillAutoIncremental = () => {
		fillAutoIncremental(columns, selectedId)
		.then(response => {
			doRefreshGrid();
		})
		.catch(error => {
			console.error('Error:', error);
		});
	};

	const doFillFixedValue = () => {
		const newValue = prompt('New value?');
		if(newValue !== null) {
			fillFixedValue(columns, selectedId, newValue)
			.then(response => {
				doRefreshGrid();
			})
			.catch(error => {
				console.error('Error:', error);
			});
		}
	};
	

	const doRefreshGrid = () => {
		setrefreshGrid(prevKey => prevKey + 1);
	}

	const clickMenuButton = (menu) => {

		const actions = {

			//New
			new_file: (param) => doNewFile(param),


			//Structure
			//add_column_end: (param) => doAddColumn(),

			
			//Normalizations
			normalization_uppercase: (param) => doNormalize(param),
			normalization_lowercase: (param) => doNormalize(param),
			normalization_trim: (param) => doNormalize(param),
			normalization_capitalize: (param) => doNormalize(param),

			//Validations
			validation_email: (param) => doValidation(param),
			validation_number: (param) => doValidation(param),
			validation_alpha: (param) => doValidation(param),
			validation_alfanumeric: (param) => doValidation(param),

			//Fill
			fill_column_numbered: (param) => doFillAutoIncremental(),
			fill_fixed_value: (param) => doFillFixedValue()
		};


		const fn = actions[menu];
		if (fn) {
			fn(menu);
		} else {
		  console.error(`Invalid action "${menu}"`);
		}
	}

	const selectCell = (line, column) => {
		setSelectedCell({row: line, column: column});
	}

  return (
	<div class="h-100 w-100 d-flex flex-column">
		<RibbonMenu clickButton={clickMenuButton} />

		<div class="flex-grow-1">
			<div class="h-100 w-100 d-flex flex-row">
				<Sidebar ref={sidebarRef}  openFile={openFileWithId}/>
				<div class="flex-grow-1">
					<div class="h-100 w-100 d-flex flex-column">
						<div class="flex-grow-1">
							<DataGrid key={refreshGrid} selectedCell={selectedCell} idFile={selectedId} />
						</div>

						<div id="status_bar">

							<input type="radio" name="status_bar" id="status_bar_history" checked />
							<label for="status_bar_history">History</label>

							<div id="history" class="overflow-scroll px-2">
								{historyList.map((history, index) => (
									
									<div key={index}>
									<span class="material-symbols-outlined">error</span>
                					<span>{history.date} :{history.description}</span>
									</div>
								))}
							</div>

							<input type="radio" name="status_bar" id="status_bar_validations" />
							<label for="status_bar_validations">Validations</label>

							<div id="validations" class="overflow-scroll px-2">
								{validationErrors.map((error, index) => (
									
									<div key={index} onClick={() => selectCell(error.line, error.column)}>
									<span class="material-symbols-outlined">error</span>
                					<span>{error.error} <small>:{error.line + 1}</small></span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  );
}

export default App;
