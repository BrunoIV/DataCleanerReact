import logo from './logo.svg';
import './App.css';
import RibbonMenu from './components/RibbonMenu/RibbonMenu';
import DataGrid from './components/DataGrid/DataGrid';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
<div class="h-100 w-100 d-flex flex-column">

	<div id="title_bar">
	DataCleaner
	</div>

	<RibbonMenu />

	<div class="flex-grow-1">
		<div class="h-100 w-100 d-flex flex-row">
			<Sidebar />
			<div class="flex-grow-1">
				<div class="h-100 w-100 d-flex flex-column">
					<div id="row_grid">
						<DataGrid />
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
