import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from "./MainLayout.module.scss";

const MainLayout: React.FC = () => {
  return (
    <>
      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>© 2025 Chess.com</p>
      </footer>
    </>
  );
};

export default MainLayout;