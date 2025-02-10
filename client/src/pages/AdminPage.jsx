// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "../store/slices/authSlice";


// const AdminPage = () => {
//     const [users, setUsers] = useState([]);
//     const [editUser, setEditUser] = useState(null);
//     const [newRole, setNewRole] = useState("");
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
    
//     const token = useSelector((state) => state.auth.token);
//     const user = useSelector((state) => state.auth.user); // 👈 Получаем данные пользователя
    
//         const handleLogout = () => {
//             dispatch(logout());
//             navigate("/login");
//         };

//     useEffect(() => {
//         if (!token) {
//             navigate("/login");
//             return;
//         }

//         if (!user) return; // ⏳ Ждём, пока загрузится пользователь

//         if (user.role !== "admin") {
//             navigate("/"); // ❌ Нет прав — перенаправляем на главную
//             return;
//         }

//         const fetchUsers = async () => {
//             try {
//                 const res = await fetch("http://localhost:5000/api/admin/users", {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 if (!res.ok) throw new Error("Ошибка загрузки пользователей");
//                 const data = await res.json();
//                 setUsers(data);
//             } catch (error) {
//                 console.error("Ошибка:", error);
//             }
//         };

//         fetchUsers();
//     }, [token, user, navigate]);

//     const deleteUser = async (id) => {
//         if (!window.confirm("Вы уверены, что хотите удалить пользователя?")) return;

//         try {
//             const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (!res.ok) throw new Error("Ошибка удаления");

//             setUsers(users.filter(user => user.id !== id));
//         } catch (error) {
//             console.error("Ошибка:", error);
//         }
//     };

//     const handleEdit = (user) => {
//         setEditUser(user);
//         setNewRole(user.role);
//     };

//     const saveEdit = async () => {
//         try {
//             const res = await fetch(`http://localhost:5000/api/admin/users/${editUser.id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ role: newRole }),
//             });

//             if (!res.ok) throw new Error("Ошибка обновления");

//             setUsers(users.map(user => (user.id === editUser.id ? { ...user, role: newRole } : user)));
//             setEditUser(null);
//         } catch (error) {
//             console.error("Ошибка:", error);
//         }
//     };

//     if (!user) {
//         return <h2>Загрузка...</h2>; // ⏳ Показываем, пока данные загружаются
//     }

//     return (
//         <div className="admin-container">
//             <h1>Админ-панель</h1>
//             <button onClick={handleLogout}>Выйти</button>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Имя</th>
//                         <th>Email</th>
//                         <th>Роль</th>
//                         <th>Действия</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user) => (
//                         <tr key={user.id}>
//                             <td>{user.id}</td>
//                             <td>{user.username}</td>
//                             <td>{user.email}</td>
//                             <td>
//                                 {editUser?.id === user.id ? (
//                                     <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
//                                         <option value="user">User</option>
//                                         <option value="admin">Admin</option>
//                                     </select>
//                                 ) : (
//                                     user.role
//                                 )}
//                             </td>
//                             <td>
//                                 {editUser?.id === user.id ? (
//                                     <>
//                                         <button onClick={saveEdit}>Сохранить</button>
//                                         <button onClick={() => setEditUser(null)}>Отмена</button>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <button onClick={() => handleEdit(user)}>Редактировать</button>
//                                         <button onClick={() => deleteUser(user.id)}>Удалить</button>
//                                     </>
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminPage;


import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [formData, setFormData] = useState({ username: "", email: "", role: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        if (!user) return; // Ждём, пока загрузится пользователь

        if (user.role !== "admin") {
            navigate("/"); // Нет прав — перенаправляем на главную
            return;
        }

        const fetchUsers = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/admin/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Ошибка загрузки пользователей");
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error("Ошибка:", error);
            }
        };

        fetchUsers();
    }, [token, user, navigate]);

    const deleteUser = async (id) => {
        if (!window.confirm("Вы уверены, что хотите удалить пользователя?")) return;

        try {
            const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Ошибка удаления");

            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleEdit = (user) => {
        setEditUser(user);
        setFormData({ username: user.username, email: user.email, role: user.role, password: "" });
    };

    const saveEdit = async () => {
        try {
            const updatedData = { ...formData };

            if (!updatedData.password) {
                delete updatedData.password; // Не отправляем, если пароль не изменён
            }

            const res = await fetch(`http://localhost:5000/api/admin/users/${editUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!res.ok) throw new Error("Ошибка обновления");

            setUsers(users.map(user => (user.id === editUser.id ? { ...user, ...updatedData } : user)));
            setEditUser(null);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    if (!user) {
        return <h2>Загрузка...</h2>;
    }

    return (
        <div className="admin-container">
            <h1>Админ-панель</h1>
            <button onClick={handleLogout}>Выйти</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Роль</th>
                        <th>Пароль</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                                {editUser?.id === user.id ? (
                                    <input 
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    />
                                ) : (
                                    user.username
                                )}
                            </td>
                            <td>
                                {editUser?.id === user.id ? (
                                    <input 
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td>
                                {editUser?.id === user.id ? (
                                    <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                ) : (
                                    user.role
                                )}
                            </td>
                            <td>
                                {editUser?.id === user.id ? (
                                    <input 
                                        type="password"
                                        placeholder="Новый пароль (если нужно)"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                ) : (
                                    "••••••"
                                )}
                            </td>
                            <td>
                                {editUser?.id === user.id ? (
                                    <>
                                        <button onClick={saveEdit}>Сохранить</button>
                                        <button onClick={() => setEditUser(null)}>Отмена</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(user)}>Редактировать</button>
                                        <button onClick={() => deleteUser(user.id)}>Удалить</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
