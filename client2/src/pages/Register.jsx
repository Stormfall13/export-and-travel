import React, { useEffect } from 'react';
import './LoginReg.css';

const Register = () => {

  useEffect(() => {
    const handleScreenSizeChangeAdaptive = () => {
      const header = document.querySelector(".header");
      if (header) {
        const headerHeight = header.offsetHeight;
        const explore = document.querySelector(".wrapper__form");
        if (explore) {
          explore.style.paddingTop = `${headerHeight}px`;
        }
      }
    };

    // Вызываем при монтировании
    handleScreenSizeChangeAdaptive();

    // Подписываемся на изменение размера окна
    window.addEventListener("resize", handleScreenSizeChangeAdaptive);

    return () => {
      // Отписываемся при размонтировании
      window.removeEventListener("resize", handleScreenSizeChangeAdaptive);
    };
  }, []);
    
  return (
      <div className='wrapper__form'>
         <h1>Register</h1>
         <form className='global__form-logReg'>
            
            <input type="text" className='email' placeholder='Email' required/>
            <input type="text" className='login' placeholder='Login' required/>
            <input type="text" className='password' placeholder='Password' required/>
            <button>Register</button>
         </form>
      </div>
  )
}

export default Register;
