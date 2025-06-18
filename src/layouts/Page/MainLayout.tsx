import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from "./MainLayout.module.scss";

const MainLayout: React.FC = () => {
  return (
    <>
      <header>
        <nav>
          <h1>My App</h1>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer>
        <p>© 2025 My Company</p>
      </footer>
    </>
  );
};

export default MainLayout;