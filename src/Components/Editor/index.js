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
    checkSpell();
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

  function handleClickOutside(event) {
    if (
      ContextMenuRef.current &&
      !ContextMenuRef.current.contains(event.target)
    ) {
      alert("You clicked outside of me!");
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ContextMenuRef]);

  return (
    <>
      <div className="editor-container">
        <div className="editor-input">
          <textarea
            onChange={handleChange}
            value={etxt}
            spellCheck={false}
          ></textarea>
        </div>
        <div className="editor-render" unselectable="on">
          {etxt
            .replace(/ /g, "\u00A0")
            .split(/\b(\s)/)
            .map((item) => {
              // console.log(etxt.replace(/ /g, "\u00A0").split("\u00A0"));

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
