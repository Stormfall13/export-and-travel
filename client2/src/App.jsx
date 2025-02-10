import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import About from '../../client/src/pages/About';
import Destinations from '../../client/src/pages/Destinations';
import Partners from '../../client/src/pages/Partners';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
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
    <div className="App">
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
    </div>
  );
}

export default App;
