import "./App.css";
import React, { useState } from "react";
import Editor from "./Components/Editor";
function App() {
  const textGearkey = "Basic kDLREYBUZdMxHSV4";

  const [name, setName] = useState("");
  const [nameFromRef, setNameFromRef] = useState("sdd");

  

  const checkSpell = (e) => {
    let textData = e?.target?.value;

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
      {/* <div className="main-card">
        <textarea
          className="editor-area"
          spellCheck="false"
          onChange={checkSpell}
        />
      </div> */}
      <Editor  value={nameFromRef} onChange={setNameFromRef} />
    </div>
  );
}

export default App;
