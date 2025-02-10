import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Explore from '../components/Explore';
import Way from '../components/Way';
import Featured from '../components/Featured';
import Guides from '../components/Guides';
import Testimonials from '../components/Testimonials';

const Home = () => {
    // console.log("Home component rendered");
    // const user = useSelector((state) => state.auth.user);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const handleLogout = () => {
    //     dispatch(logout());
    //     navigate("/login");
    // };

    return (
        <div>
            {/* <h1>Добро пожаловать, {user?.username || "Пользователь"}!</h1>
            <button onClick={handleLogout}>Выйти</button> */}
            <Header />
            <Explore />
            <Way />
            <Featured />
            <Guides />
            <Testimonials />
            <Footer />
        </div>
    );
};

export default Home;
