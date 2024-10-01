import React, { useState, useRef, useEffect } from "react";
import styles from "./Chatbot.module.css";
import clsx from "clsx";
import TextArea from "./components/TextArea";
import Request from "./assets/request.svg";
 
const Chatbot = () => {
  const [active, setActive] = useState(false);
  const mainRef = useRef(null);
  // document.activeElement === mainRef.current
 
  const toggleBot = () => {
    setActive(true);
  };
 
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (mainRef.current && !mainRef.current.contains(event.target)) {
        setActive(false);
      }
    };
 
    // Add click event listener to the document
    document.addEventListener("click", handleOutsideClick);
 
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [mainRef]);
 
  return (
    <>
      <main
        ref={mainRef}
        onClick={toggleBot}
        tabIndex={0}
        className={clsx(styles.main, { [styles.focus]: active })}
      >
        <div className={styles.container}>
          <div
            className={`${styles.talkBubble} ${styles.triRight} ${styles.btmRight}`}
          >
            {/* <div className='talktext'> */}
            Hey, How Can I Help You?
            {/* </div> */}
          </div>
 
          <img
            src={Request}
            alt="chatbot initialte"
            className={styles.requestDemo}
          />
          <TextArea active={active} />
        </div>
      </main>
    </>
  );
};
 
export default Chatbot;