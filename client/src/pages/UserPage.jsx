import React from 'react';
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const UserPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div>
            <h1>Страница пользователя</h1>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    )
}

export default UserPage;
