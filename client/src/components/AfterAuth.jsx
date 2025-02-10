import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const AfterAuth = () => {

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    // console.log(user);
    

  return (
    <div className='after__auth'>
      <h1>Добро пожаловать, {user?.username || "Пользователь"}!</h1>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  )
}

export default AfterAuth;
