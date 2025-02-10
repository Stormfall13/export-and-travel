import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import About from './pages/About';
import Destinations from './pages/Destinations';
import Partners from './pages/Partners';


const AppRouter = () => {
    // console.log("Маршруты загружены");  // ✅ Проверяем, вызывается ли роутер

    const [isLargeScreen, setIsLargeScreen] = useState(window.matchMedia("(min-width: 992px)").matches);
    
    useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 992px)");
      
      const handleScreenSizeChange = (e) => {
        setIsLargeScreen(e.matches);
        
        if (e.matches) {
          let currentSection = 0;
          const sections = document.querySelectorAll("section, footer");
          const totalSections = sections.length;
          let isScrolling = false;
  
          function scrollToSection(index) {
            if (index < 0 || index >= totalSections) return;
            isScrolling = true;
            currentSection = index;
            sections[index].scrollIntoView({ behavior: "smooth" });
            setTimeout(() => (isScrolling = false), 600);
          }
  
          window.addEventListener("wheel", (event) => {
            if (isScrolling) return;
            if (event.deltaY > 0) {
              scrollToSection(currentSection + 1);
            } else {
              scrollToSection(currentSection - 1);
            }
          });
  
          const contents = document.querySelectorAll(
            ".explore__wrapp-main, .way__wrapp-main, .featured__wrapp-main, .guides__wrapp-main, .testimonials__wrapp-main, .trending__wrapp-main, .footer__wrapp-main"
          );
  
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("visible");
                  observer.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.3 }
          );
  
          contents.forEach((content) => observer.observe(content));
  
          scrollToSection(0);
        }
      };
  
      mediaQuery.addEventListener("change", handleScreenSizeChange);
      handleScreenSizeChange(mediaQuery);
  
      return () => {
        mediaQuery.removeEventListener("change", handleScreenSizeChange);
      };
    }, []);
  
    useEffect(() => {
      const mediaQueryAdaptive = window.matchMedia("(max-width: 992px)");
      
      const handleScreenSizeChangeAdaptive = (x) => {
        if (x.matches) {
          const header = document.querySelector(".header");
          if (header) {
            const headerHeight = header.offsetHeight;
            const explore = document.querySelector(".explore");
            if (explore) {
              explore.style.paddingTop = `${headerHeight}px`;
            }
          }
        }
      };
  
      mediaQueryAdaptive.addEventListener("change", handleScreenSizeChangeAdaptive);
      handleScreenSizeChangeAdaptive(mediaQueryAdaptive);
  
      return () => {
        mediaQueryAdaptive.removeEventListener("change", handleScreenSizeChangeAdaptive);
      };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* 🔐 Защищенные маршруты (только для user и admin) */}
                <Route path="/" element={ <ProtectedRoute allowedRoles={["user", "admin"]}> <Home /> </ProtectedRoute> } />
                <Route path="/user" element={ <ProtectedRoute allowedRoles={["user", "admin"]}> <UserPage /> </ProtectedRoute> } />
                <Route path="/admin" element={ <ProtectedRoute allowedRoles={["admin"]}> <AdminPage /> </ProtectedRoute> } />

                {/* 🔐 Destinations, About и Partners тоже доступны только для user и admin */}
                <Route path="/destinations" element={ <ProtectedRoute allowedRoles={["user", "admin"]}> <Destinations /> </ProtectedRoute> } />
                <Route path="/about" element={ <ProtectedRoute allowedRoles={["user", "admin"]}> <About /> </ProtectedRoute> } />
                <Route path="/partners" element={ <ProtectedRoute allowedRoles={["user", "admin"]}> <Partners /> </ProtectedRoute> } />

                {/* Если страница не найдена — редирект на `/` */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
