import './App.css';
import RibbonMenu from './components/RibbonMenu/RibbonMenu';
import DataGrid from './components/DataGrid/DataGrid';
import Sidebar from './components/Sidebar/Sidebar';
import { useState } from 'react';

function App() {

	const [selectedId, setSelectedId] = useState(null);

	// Función que recibe el ID desde el hijo
	const openFileWithId = (id) => {
	  setSelectedId(id);
	};

	
	const clickMenuButton = (menu) => {
		alert(menu);
	}

  return (
	<div class="h-100 w-100 d-flex flex-column">
		<div id="title_bar">
		DataCleaner
		</div>

		<RibbonMenu clickButton={clickMenuButton} />

		<div class="flex-grow-1">
			<div class="h-100 w-100 d-flex flex-row">
				<Sidebar openFile={openFileWithId}/>
				<div class="flex-grow-1">
					<div class="h-100 w-100 d-flex flex-column">
						<div id="row_grid">
							<DataGrid idFile={selectedId} />
						</div>

						<div class="flex-grow-1" id="row_validation">
						<div>
							Validation error #1
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
