import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import SupplierTable from './SupplierTable';
import './index.css';
import CustomerOrder from './CustomerOrder';
import MaterialInquiry from './MaterialInquiry';

import { BrowserRouter as Router} from "react-router-dom";
import MaterialReplenishment from "./MaterialReplenishment";
import CustomerDeliveryNotice from "./CustomerDeliveryNotice";
import DailyWorkReport from "./DailyWorkReport";


function Sidebar({ showSidebar, onToggleTheme, onLinkClick, activePage }) {
  return (
    <div className={`sidebar ${showSidebar ? "show-sidebar" : ""}`} id="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__user">
          <div className="sidebar__img">
            <img src="/image.png" alt="profile" />
          </div>
          <div className="sidebar__info">
            <h3>Mugil</h3>
            <span>mugil9451@email.com</span>
          </div>
        </div>
        <nav className="sidebar__content">
          <h4 className="sidebar__title">MANAGER</h4>
          <ul className="sidebar__list">
            <li
              className={`sidebar__link ${activePage === "dashboard" ? "active-link" : ""}`}
              onClick={() => onLinkClick("dashboard")}
            >
              <i className="ri-dashboard-line"></i>
              <span>Dashboard</span>
            </li>
            <li
              className={`sidebar__link ${activePage === "wallet" ? "active-link" : ""}`}
              onClick={() => onLinkClick("wallet")}
            >
              <i className="ri-wallet-line"></i>
              <span>My Wallet</span>
            </li>
            <li
              className={`sidebar__link ${activePage === "calendar" ? "active-link" : ""}`}
              onClick={() => onLinkClick("calendar")}
            >
              <i className="ri-calendar-line"></i>
              <span>Calendar</span>
            </li>
            <li
              className={`sidebar__link ${activePage === "transactions" ? "active-link" : ""}`}
              onClick={() => onLinkClick("transactions")}
            >
              <i className="ri-exchange-line"></i>
              <span>Recent Transactions</span>
            </li>
            <li
              className={`sidebar__link ${activePage === "statistics" ? "active-link" : ""}`}
              onClick={() => onLinkClick("statistics")}
            >
              <i className="ri-bar-chart-line"></i>
              <span>Statistics</span>
            </li>
          </ul>
          <ul className="sidebar__actions">
            <li
              className={`sidebar__link ${activePage === "settings" ? "active-link" : ""}`}
              onClick={() => onLinkClick("settings")}
            >
              <i className="ri-settings-2-line"></i>
              <span>Settings</span>
            </li>
            <li
              className={`sidebar__link ${activePage === "messages" ? "active-link" : ""}`}
              onClick={() => onLinkClick("messages")}
            >
              <i className="ri-mail-line"></i>
              <span>My Messages</span>
            </li>
            <div></div>
            <li className="sidebar__link" onClick={onToggleTheme}>
              <i className="ri-moon-line"></i>
              <span>Theme</span>
            </li>
            <li
              className={`sidebar__link ${activePage === "logout" ? "active-link" : ""}`}
              onClick={() => onLinkClick("logout")}
            >
              <i className="ri-logout-box-line"></i>
              <span>Log Out</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

function Header({ onToggleSidebar }) {
  return (
    <div className="header" id="header">
      <div className="header__container">
        <div className="header__logo">
          <i className="ri-cloud-fill"></i>
          <span>Cloud</span>
        </div>
        <button className="header__toggle" id="header-toggle" onClick={onToggleSidebar}>
          ☰
        </button>
      </div>
    </div>
  );
}

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const timeoutRef = useRef(null);

  const handleSidebarToggle = () => {
    setShowSidebar((prev) => !prev);
  };

  const toggleTheme = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    document.body.classList.toggle("dark-theme", newTheme);
    localStorage.setItem("selected-theme", newTheme ? "dark" : "light");
  };

  const handleLinkClick = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    if (setShowSidebar) {
      timeoutRef.current = setTimeout(() => {
        setShowSidebar(true);  // Close sidebar after timeout
      }, 5000);  // 5 seconds timeout
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [showSidebar]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("selected-theme");
    setDarkTheme(savedTheme === "dark");
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <SupplierTable />;
      case "wallet":
        return <CustomerOrder />;
      case "calendar":
        return <MaterialInquiry />;
      case "transactions":
        return <MaterialReplenishment />;
      case "statistics":
        return <CustomerDeliveryNotice />;
      case "settings":
        return <DailyWorkReport />;
      case "messages":
        return <div>My Messages Content</div>;
      case "logout":
        return <div>Log Out Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
        <Router>
          <>
            <div className={`app ${darkTheme ? "dark-theme" : ""}`}>
              <Sidebar
                showSidebar={showSidebar}
                onToggleTheme={toggleTheme}
                onLinkClick={handleLinkClick}
                activePage={activePage}
              />
              <div className={`main ${showSidebar ? "left-pd" : "full-width"}`} id="main">
                <Header onToggleSidebar={handleSidebarToggle} />
                <div className={`content ${showSidebar ? "left-pd" : ""}`}>
                  {renderContent()}
                </div>
              </div>
            </div>
          </>
        </Router>
      );
}

export default App;
