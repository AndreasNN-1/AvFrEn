import React from "react";
import styles from "./Loading.module.css"; // Create a CSS module for styling the loader

const Loading: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
