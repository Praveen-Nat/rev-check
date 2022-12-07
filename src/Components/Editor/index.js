import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

function Editor(props) {
  const [etxt, setetxt] = useState("");
  const [final, setfinal] = useState("");

  const handleChange = (e) => {
    setetxt(e.target.value);
  };

  return (
    <>
      <div className="editor-container">
        <div className="editor-input">
          <textarea onChange={handleChange}></textarea>
        </div>
        <div className="editor-render" unselectable="on">
          {etxt.split(" ").map((item) => {
            return item === "helop" ? (
              <div style={{color:"red"}}>{item}&nbsp;</div>
            ) : (
              <div>{item}&nbsp;</div>
            );
          })}
        </div>
      </div>
    </>
  );
  // <div contentEditable={true} onInput={handleInput} id="editor"></div>;
}

export default Editor;
