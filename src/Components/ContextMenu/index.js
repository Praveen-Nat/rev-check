import React, { useEffect } from "react";
import "./styles.css";

function ContextMenu({ x, y, handleReplace, betterWordList }) {
  return (
    <div className="context-menu-container" style={{ top: y, left: x }}>
      <div className="context-menu-top">
        {betterWordList.map((item) => {
          return (
            <button className="but" onClick={() => handleReplace(item)}>
              {item}
            </button>
          );
        })}
      </div>
     
    </div>
  );
}

export default ContextMenu;
