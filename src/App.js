import './App.css';
import RibbonMenu from './components/RibbonMenu/RibbonMenu';
import DataGrid from './components/DataGrid/DataGrid';
import Sidebar from './components/Sidebar/Sidebar';
import { useState } from 'react';
import { normalize } from './services/apiService';
import { validate } from './services/apiService';

function App() {

	const [selectedId, setSelectedId] = useState(null);
	const [selectedCell, setSelectedCell] = useState(null);
	const [validationErrors, setValidationErrors] = useState([]);

	// Función que recibe el ID desde el hijo
	const openFileWithId = (id) => {
	  setSelectedId(id);
	};

	
	const clickMenuButton = (menu) => {
		let fn = '';
		if(menu.startsWith('validation_') || menu.startsWith('normalization_')) {
			const ar = menu.split('_');
			menu = ar[0];
			fn = ar[1];
		}

		const columns = [1];

		let promise = null;
		switch(menu) {
			case 'validation':
				promise = validate(columns, 'validate_' + fn, selectedId);
				break;
			case 'normalization':
				promise = normalize(columns, fn, selectedId);
				break;
		}

		if(promise != null) {
			promise.then(response => {
				setValidationErrors(response);
				console.log(response);
			})
			.catch(error => {
				console.error('Error:', error);
			});
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
				<Sidebar openFile={openFileWithId}/>
				<div class="flex-grow-1">
					<div class="h-100 w-100 d-flex flex-column">
						<DataGrid class="flex-grow-1" selectedCell={selectedCell} idFile={selectedId} />

						<div id="status_bar">

							<input type="radio" name="status_bar" id="status_bar_validations" checked />
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
