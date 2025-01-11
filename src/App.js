import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import SupplierTable from './SupplierTable';
import './index.css';
import CustomerOrder from './CustomerOrder';
import MaterialInquiry from './MaterialInquiry';

import { BrowserRouter as Router } from "react-router-dom";
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

function Header({ onToggleSidebar, activePageName }) {
  return (
    <div className="header" id="header">
      <div className="header__container">
        <div className="header__logo">
          <i className="ri-cloud-fill"></i>
          <span>{activePageName}</span> {/* Display active page name */}
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
  const [activePage, setActivePage] = useState("SupplierInfo");

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
    const savedTheme = localStorage.getItem("selected-theme");
    setDarkTheme(savedTheme === "dark");
  }, []);

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
            {/* Pass the capitalized active page name to the Header */}
            <Header 
              onToggleSidebar={handleSidebarToggle} 
              activePageName={activePage.charAt(0).toUpperCase() + activePage.slice(1)} // Capitalizing first letter of active page
            />
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


