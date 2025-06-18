import React from "react";
import styles from "./ErrorMessage.module.scss";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <>
      <div className={styles.message}>
        <h2>{message}</h2>
      </div>
    </>
  );
}

export default ErrorMessage;