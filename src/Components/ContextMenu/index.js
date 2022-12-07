import React, { useEffect } from "react";
import "./styles.css";

function ContextMenu({x,y,handleReplace}) {
  var sampleArr = [
    "hello",
    "hi",
    "pop",
    "hello",
    "hi",
    "pop",
    "hello",
    "hi",
    "pssop",
  ];
  return (
    <div className="context-menu-container" style={{top:y, left:x}}>
      <div className="context-menu-top">
        {sampleArr.map((item) => {
          return <button className="but" onClick={()=> handleReplace(item)}>{item}</button>;
        })}
      </div>
      <div className="context-menu-bottom"></div>
    </div>
  );
}

export default ContextMenu;
