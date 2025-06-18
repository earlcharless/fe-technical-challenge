import React from "react";
import styles from "./PageLoader.module.scss";

const PageLoader: React.FC = () => {
  return (
    <div className={styles.pageLoader}>
      <div className={styles.loader} />
    </div>
  );
}

export default PageLoader;