import React from "react";
import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.scss";

const PageNotFound: React.FC = () => {
  return (
    <>
      <Link to="/" className="button">Back</Link>
      <div className={styles.page}>
        <h1>Page Not Found</h1>
      </div>
    </>
  );
}

export default PageNotFound;