import "./App.css";
import React, { useState } from "react";
import Editor from "./Components/Editor";
function App() {
  // const textGearkey = "Basic kDLREYBUZdMxHSV4";

  const [charCount, setcharCount] = useState([]);

  const [name, setName] = useState("");
  const [nameFromRef, setNameFromRef] = useState("sdd");

  

  const checkSpell = (e) => {
    let textData = e?.target?.value;
    setcharCount(textData?.replace(/\s/g, "").length);

    console.log(textData?.replace(/\s/g, "").length);

    //  fetch("https://api.textgears.com/spelling", {
    //       method: "POST", // or 'PUT'
    //       // TODO extract headers and params seperate variables
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: textGearkey,
    //       },
    //       body: JSON.stringify({
    //         text: textData,
    //         language: "en-GB",
    //         ai: "true",
    //       }),
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log("Success:", data);
    //       })
    //       .catch((error) => {
    //         console.error("Error:", error);
    //       });
  };

  return (
    <div className="app-container">
<<<<<<< HEAD
      {/* <div className="main-card">
        <textarea
          className="editor-area"
          spellCheck="false"
          onChange={checkSpell}
        />
      </div> */}
      <Editor  value={nameFromRef} onChange={setNameFromRef} />
=======
      <textarea
        className="editor-area"
        spellCheck="false"
        onChange={checkSpell}
      />

      <div className="info-panel">
        
        Characters Count: {charCount} </div>
>>>>>>> 2f2d1cae99ad39e73dea70034818089291e4f958
    </div>
  );
}

export default App;
