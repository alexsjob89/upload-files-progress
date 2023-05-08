import React,{useCallback,useState} from "react";
import {useDropzone} from "react-dropzone";
import Loading from "react-loading";
import "./App.css";

const App = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

const uploadFiles = async () => {
  setIsLoading(true);

  for (const file of files) {
    // Simulate the time it takes to upload a file
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update the progress percentage
    const progressValue = Math.floor(((files.indexOf(file) + 1) / files.length) * 100);
    setProgress(progressValue);
  }
  setIsLoading(false);
};




  return (
    <div className="MultiFileUpload">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop files here, or click to select files</p>
      </div>
      <button onClick={uploadFiles} disabled={files.length === 0} style={{
        background: "none",
        backgroundColor: "grey",
        color: "white",
        padding: " 5px 10px ",
        borderRadius: "5px",
        border: "none",
        margin: "20px"
         }}>

        Upload Files
      </button>
      <div className="fileList">
        {files.map(file => (
          <div style={{color: "blue", border:"1px solid white", borderRadius: "8px", margin: "5px"}} key={file.path}>{file.path}</div>
        ))}
        {isLoading && (
        <div className="loading">
          <Loading type="spin" color="#3f51b5" width={30}/>
          <div>{progress}%</div>
        </div>
      )}
      </div>

    </div>
  );
};


export default App;
