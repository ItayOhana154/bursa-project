import React, { createContext, useEffect, useState } from 'react';

export const UserInfoContext = createContext();

export const UserProvider = ({ children }) => {
    const [myInfo, setMyInfo] = useState({});

    useEffect(() => {
        const idCookie = document.cookie.split(';').find(c => c.trim().startsWith('id='));
        const userNameCookie = document.cookie.split(';').find(c => c.trim().startsWith('username='));
        if (idCookie && userNameCookie) {
            const cookieId = idCookie.split('=')[1];
            const cookieusername = userNameCookie.split('=')[1];
            setMyInfo({ id: cookieId , username: cookieusername })
        }

    }, []);

    const changeInfo = (Id, userName) => {
        setMyInfo({
            id: Id,
            username: userName
        });
    };

    return <UserInfoContext.Provider value={{ myInfo, changeInfo }}>
        {children}
    </UserInfoContext.Provider>;

}; 