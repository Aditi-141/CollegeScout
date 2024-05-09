import React from 'react';
import './App.css';
import Applications from './applications';
import FileUpload from "./FileUpload";

function ParentForm() {
  return (
    <div className="App">
      <header className="App-header">
        <FileUpload/>
        {/* <Applications/> */}
      </header>
    </div>
  );
}

export default ParentForm;
