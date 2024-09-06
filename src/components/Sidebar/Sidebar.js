import React, { useState, useEffect } from 'react';

import './Sidebar.css';

function Sidebar(props) {


  const lateralIcons = [{
    id: 'tab_files',
    icon: 'draft'
  }];


  const openFile = (id) => {
    if(props.openFile) {
      props.openFile(id);
    }

  };
  

  const [lateralTab, setLateralTab] = useState('tab_files');
  const clickButton = (id) => {
    if(lateralTab == id) {
      id = '';
    }

    setLateralTab(id);
  };


  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const loadFiles = async (selectLast = false) => {
    try {
      const response = await fetch('http://localhost:8080/file/getFiles');
      const data = await response.json();

      let selected = 0;
      if (selectLast) {
        selected = data.length - 1;
      }

      if (data.length > selected) {
        setSelectedFile(data[selected].id); 
      }

      setFiles(data);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };

  // after render
  useEffect(() => {
    loadFiles();
  }, []); // [] only one time

  return (
    <div id="sidebar">
      <div id="side_tabs">
      {lateralIcons.map((icon, index) => (
        <span active={lateralTab === icon.id} class="material-symbols-outlined" onClick={() => clickButton(icon.id)}>
          {icon.icon}
        </span>
      ))}
      </div>
  

      <div class="side_panel" id="tab_config" hidden={lateralTab != 'tab_config'}>
        <h1>Config</h1>

        Color: <input type="color" value="#ff0000" />
      </div>

      <div class="side_panel" id="tab_files" hidden={lateralTab != 'tab_files'}>
        <h1>Files</h1>
        <header class="text-end">
          <button>
            <span class="material-symbols-outlined">add_box</span>
          </button>

          <button>
            <span class="material-symbols-outlined">delete</span>
          </button>
      </header>

      <ul>
        {files.map((file, index) => (
        <li onDoubleClick={() => openFile(file.id)}>
          <span class="material-symbols-outlined">draft</span> { file.name }
        </li>
        ))}
      </ul>

      </div>
  </div>
  );
}

export default Sidebar;
