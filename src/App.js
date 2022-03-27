import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState("");
  const [imageURL, setImageURL] = useState(null); // for displaying the image
  const [loaded, setLoaded] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageURL(URL.createObjectURL(event.target.files[0]));
    setLoaded(!loaded)
  };

  const predictImage = () => {
    const formData = new FormData();
    // image_bytes = image_file.file.read()
    // must use same name as in the fastapi.target.read()
    formData.append("file", selectedFile);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:8080/predict", formData, config)
      .then((response) => {
        console.log(response.data);
        setResult(response.data.predictions.class_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="App">
      <h1 className="header">PyTorch Image Classification - DenseNet</h1>
      <div className="inputHolder">
        <input
          type="file"
          accept="image/*"
          capture="camera"
          className="uploadInput"
          onChange={handleFileSelect}
          ref={fileInputRef}
        />
        <button className={`${loaded ? "hidden" : "uploadImage"}`} onClick={triggerUpload}>
          Upload Image
        </button>
        {selectedFile && (
          <button className="buttonz" onClick={predictImage}>
            Identify Image
          </button>
        )}
      </div>

      <div className="mainWrapper">
        <div className="mainContent">
          <div className="imageHolder">
            {imageURL && (
              <img
                src={imageURL}
                alt="Upload Preview"
                crossOrigin="anonymous"
              />
            )}
          </div>
          {result && (
            <div className="resultsHolder">
              <div className="result">
                <span className="name">{result}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
