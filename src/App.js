import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import SupplierTable from './SupplierTable';
import './index.css';
import CustomerOrder from './CustomerOrder';
import MaterialInquiry from './MaterialInquiry';

import { BrowserRouter as Router, Navigate } from "react-router-dom";
import MaterialReplenishment from "./MaterialReplenishment";
import CustomerDeliveryNotice from "./CustomerDeliveryNotice";
import DailyWorkReport from "./DailyWorkReport";
import LoginPage from "./LoginPage";

function Sidebar({ showSidebar, onToggleTheme, onLinkClick, activePage, onLogout, userInfo }) {
  return (
    <div className={`sidebar ${showSidebar ? "show-sidebar" : ""}`} id="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__user">
          <div className="sidebar__img">
            <img src="/image.png" alt="profile" />
          </div>
          <div className="sidebar__info">
            <h3>{userInfo.name}</h3>
            <span>{userInfo.email || userInfo.role}</span>
          </div>
        </div>
        <nav className="sidebar__content">
          <h4 className="sidebar__title">{userInfo.role.toUpperCase()}</h4>          
          <ul className="sidebar__list">
            <li
              className={`sidebar__link ${activePage === "SupplierInfo" ? "active-link" : ""}`}
              onClick={() => onLinkClick("SupplierInfo")}
            >
              <i className="ri-dashboard-line"></i>
              <span>Supplier Info</span>
            </li>
            <li
              className={`sidebar__link ${activePage === "Customer Order" ? "active-link" : ""}`}
              onClick={() => onLinkClick("Customer Order")}
            >
              <i className="ri-wallet-line"></i>
              <span>Customer Order</span>
            </li>
            <li
              className={`sidebar__link ${activePage === "Material Inquiry" ? "active-link" : ""}`}
              onClick={() => onLinkClick("Material Inquiry")}
            >
              <i className="ri-calendar-line"></i>
              <span>Material Inquiry</span>
            </li>
            <li
              className={`sidebar__link ${activePage === "Material Replenishment" ? "active-link" : ""}`}
              onClick={() => onLinkClick("Material Replenishment")}
            >
              <i className="ri-exchange-line"></i>
              <span>Material Replenishment</span>
            </li>
            <li
              className={`sidebar__link ${activePage === "Customer Delivery" ? "active-link" : ""}`}
              onClick={() => onLinkClick("Customer Delivery")}
            >
              <i className="ri-bar-chart-line"></i>
              <span>Customer Delivery </span>
            </li>
          </ul>
          <ul className="sidebar__actions">
            <li
              className={`sidebar__link ${activePage === "DAILY WORK" ? "active-link" : ""}`}
              onClick={() => onLinkClick("DAILY WORK")}
            >
              <i className="ri-settings-2-line"></i>
              <span>DAILY WORK REPORT</span>
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
            <li className="sidebar__link" onClick={onLogout}>
              <i className="ri-logout-box-line"></i>
              <span>Log Out</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

function Header({ onToggleSidebar, activePageName }) {
  return (
    <div className="header" id="header">
      <div className="header__container">
        <div className="header__logo">
          <i className="ri-cloud-fill"></i>
          <span>{activePageName}</span>
        </div>
        <button className="header__toggle" id="header-toggle" onClick={onToggleSidebar}>
          ☰
        </button>
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activePage, setActivePage] = useState("SupplierInfo");
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    role: ''
  });

  const timeoutRef = useRef(null);

  const handleLogin = (loginUserInfo) => {
    setIsLoggedIn(true);
    setUserInfo({
      name: loginUserInfo.name,
      email: loginUserInfo.email || '',
      role: loginUserInfo.role
    });
    localStorage.setItem('userInfo', JSON.stringify(loginUserInfo));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo({
      name: '',
      email: '',
      role: ''
    });
    localStorage.removeItem('userInfo');
    setActivePage("SupplierInfo");
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setIsLoggedIn(true);
      setUserInfo({
        name: parsedUserInfo.name,
        email: parsedUserInfo.email || '',
        role: parsedUserInfo.role
      });
    }
  }, []);

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
    const savedTheme = localStorage.getItem("selected-theme");
    setDarkTheme(savedTheme === "dark");

    // Check if user was previously logged in
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (showSidebar) {
      timeoutRef.current = setTimeout(() => {
        setShowSidebar(true);
      }, 5000);
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

  const renderContent = () => {
    switch (activePage) {
      case "SupplierInfo":
        return <SupplierTable />;
      case "Customer Order":
        return <CustomerOrder />;
      case "Material Inquiry":
        return <MaterialInquiry />;
      case "Material Replenishment":
        return <MaterialReplenishment />;
      case "Customer Delivery":
        return <CustomerDeliveryNotice />;
      case "DAILY WORK":
        return <DailyWorkReport />;
      case "messages":
        return <div>My Messages Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className={`app ${darkTheme ? "dark-theme" : ""}`}>
        <Sidebar
          showSidebar={showSidebar}
          onToggleTheme={toggleTheme}
          onLinkClick={handleLinkClick}
          activePage={activePage}
          onLogout={handleLogout}
          userInfo={userInfo}
        />
        <div className={`main ${showSidebar ? "left-pd" : "full-width"}`} id="main">
          <Header 
            onToggleSidebar={handleSidebarToggle} 
            activePageName={activePage.charAt(0).toUpperCase() + activePage.slice(1)}
          />
          <div className={`content ${showSidebar ? "left-pd" : ""}`}>
            {renderContent()}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;