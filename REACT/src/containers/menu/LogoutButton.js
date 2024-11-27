// import React, { useContext } from 'react';
// import userService from './userService';
// import { UserContext } from './UserContext';

// const LogoutButton = () => {
//     const { logoutContext } = useContext(UserContext);

//     const handleLogout = async () => {
//         try {
//             const response = await userService.logout();
//             if (response.data.err === 1) {
//                 logoutContext();
//             }
//         } catch (err) {
//             console.error('Logout error:', err);
//         }
//     };

//     return <button onClick={handleLogout}>Logout</button>;
// };

// export default LogoutButton;
