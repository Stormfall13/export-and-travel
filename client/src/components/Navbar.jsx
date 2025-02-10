import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AfterAuth from "./AfterAuth";

const Navbar = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <nav>
            <Link to="/">Главная</Link>

            {/* Если пользователь авторизован, показываем "Личный кабинет" */}
            {user && (
                <>
                <AfterAuth />
                <Link to="/user">Личный кабинет</Link>
                </>
            )}

            {/* Если пользователь — админ, показываем "Админку" */}
            {user?.role === "admin" && <Link to="/admin">Админка</Link>}

            {/* Если пользователь не авторизован, показываем "Вход" и "Регистрация" */}
            {!user && (
                <>
                    <Link to="/login">Вход</Link>
                    <Link to="/register">Регистрация</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
