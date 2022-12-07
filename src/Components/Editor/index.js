import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import ContextMenu from "../ContextMenu";

function Editor(props) {
  const textGearkey = "Basic kDLREYBUZdMxHSV4";

  const [charCount, setcharCount] = useState([]);
  const [etxt, setetxt] = useState("");
  const [final, setfinal] = useState("");
  const [showContext, setshowContext] = useState(false);
  const [currentClientX, setcurrentClientX] = useState(0);
  const [currentClientY, setcurrentClientY] = useState(0);
  const [errArray, seterrArray] = useState([]);
  const [betterWordList, setbetterWordList] = useState([]);
  const [resp, setresp] = useState([]);

  const ContextMenuRef = useRef();

  const txtref = useRef();
  const txtrenderRef = useRef();

  const checkSpell = () => {
    setcharCount(etxt?.replace(/\s/g, "").length);

    fetch("https://api.textgears.com/spelling", {
      method: "POST", // or 'PUT'
      // TODO extract headers and params seperate variables
      headers: {
        "Content-Type": "application/json",
        Authorization: textGearkey,
      },
      body: JSON.stringify({
        text: etxt,
        language: "en-GB",
        ai: "true",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data?.response?.errors);
        setresp(data?.response?.errors);
        let temp = [];
        data?.response?.errors?.map((item) => {
          temp.push(item?.bad);
        });

        seterrArray(temp);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (e) => {
    setetxt(e.target.value);
  };

  const handleReplace = (replacetxt) => {
    let replacedtxt = etxt.replace(final.replace(/\s/g, ""), replacetxt);
    setetxt(replacedtxt);
    setshowContext(false);
  };

  const handleContext = (e, item) => {
    if (e.nativeEvent.button === 2) {
      let tempIndex = resp.findIndex((err) => err?.bad === item);

      setbetterWordList(resp[tempIndex]["better"]);
      setcurrentClientX(e.pageX);
      setcurrentClientY(e.pageY);
      setshowContext(true);
      setfinal(item);
      e.preventDefault();
    }
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      // checkSpell();
    }, 2000);

    return () => clearTimeout(getData);
  }, [etxt]);

  return (
    <>
      <div className="editor-container">
        <div className="editor-input">
          <textarea
          ref={txtref}
            onChange={handleChange}
            value={etxt}
            spellCheck={false}
            onScrollCapture={(e)=>{
              console.log(e);
              txtrenderRef.elem.scrollTop(50)
            }}
          ></textarea>
        </div>
        <div className="editor-render" unselectable="on"   ref={txtrenderRef}>
          {etxt
            .replace(/ /g, "\u00A0")
            .split(/\b(\s)/)
            .map((item) => {
           

              return errArray.includes(item.replace(/\s/g, "")) ? (
                <span
                  className="error-style"
                  onContextMenu={(e) => handleContext(e, item)}
                >
                  {item}
                </span>
              ) : (
                item
              );
            })}
        </div>
      </div>

      {showContext ? (
        <ContextMenu
          x={currentClientX}
          y={currentClientY}
          ref={ContextMenuRef}
          betterWordList={betterWordList}
          handleReplace={handleReplace}
        />
      ) : null}
    </>
  );
  // <div contentEditable={true} onInput={handleInput} id="editor"></div>;
}

export default Editor;
