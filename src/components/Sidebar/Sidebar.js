import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import './Sidebar.css';

const Sidebar = forwardRef((props, ref) => {

  const [selectedFileId, setSelectedFileId] = useState(null);

  const lateralIcons = [{
    id: 'tab_files',
    icon: 'draft'
  }];


  const openFile = (id) => {
    if(props.openFile) {
      props.openFile(id);
    }

    setSelectedFileId(id);
  };
  

  const [lateralTab, setLateralTab] = useState('tab_files');
  const clickButton = (id) => {
    if(lateralTab == id) {
      id = '';
    }

    setLateralTab(id);
  };


  const [files, setFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
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
      setAllFiles(data);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };


  const searchFile = (event) => {
    const searchTerm = event.target.value.toLowerCase();
  
    const filtered = allFiles.filter(file =>
      file.name.toLowerCase().includes(searchTerm)
    );
  
    setFiles(filtered);
  };

  // after render
  useEffect(() => {
    loadFiles();
  }, []); // [] only one time


  // Public method for parent
  useImperativeHandle(ref, () => ({
      loadFiles
  }));

  return (
    <div id="sidebar">
      <div id="side_tabs">
      {lateralIcons.map((icon, index) => (
        <span 
          className={`material-symbols-outlined ${lateralTab === icon.id ? 'active' : ''}`} 
          onClick={() => clickButton(icon.id)}>
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
        
        <header>
          <div class="row g-0">
            <div class="col col-8">
              <input placeholder="Search" type="text" onKeyUp={searchFile} />
            </div>

            <div class="col col-4 text-end">
              <button>
                <span class="material-symbols-outlined">add_box</span>
              </button>

              <button>
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
      </header>

      <ul>
        {files.map((file, index) => (
        <li onClick={() => openFile(file.id)} className={file.id === selectedFileId ? 'selected' : ''} >
          <span class="material-symbols-outlined">draft</span> { file.name }
          <span className={`material-symbols-outlined ${file.unsavedChanges === true ? 'd-block' : 'd-none'}`} title="Unsaved changes">warning</span>
        </li>
        ))}
      </ul>

      </div>
  </div>
  );
});

export default Sidebar;