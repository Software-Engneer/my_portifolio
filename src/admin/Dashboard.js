import React from 'react';
import { useAuth } from '../components/auth/AuthContext';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
        <div className={styles.userInfo}>
          <span>Welcome, {user?.name}</span>
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </header>
      
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <nav>
            <ul>
              <li><a href="#overview">Overview</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#creative">Creative Works</a></li>
              <li><a href="#settings">Settings</a></li>
            </ul>
          </nav>
        </div>
        
        <main className={styles.mainContent}>
          <section id="overview" className={styles.section}>
            <h2>Overview</h2>
            <div className={styles.stats}>
              <div className={styles.statCard}>
                <h3>Total Projects</h3>
                <p>12</p>
              </div>
              <div className={styles.statCard}>
                <h3>Creative Works</h3>
                <p>8</p>
              </div>
              <div className={styles.statCard}>
                <h3>Total Views</h3>
                <p>1,234</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 