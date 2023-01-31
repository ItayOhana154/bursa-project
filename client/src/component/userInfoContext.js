import React, { createContext, useEffect, useState } from 'react';

export const UserInfoContext = createContext();

export const UserProvider = ({ children }) => {
    const [myInfo, setMyInfo] = useState({});

    useEffect(() => {
        const idCookie = document.cookie.split(';').find(c => c.trim().startsWith('id='));
        if (idCookie) {
            const cookieId = idCookie.split('=')[1];
            setMyInfo({ id: cookieId })
        }

    }, []);

    const changeInfo = (Id, userName) => {
        setMyInfo({
            id: Id,
            user_name: userName
        });
    };

    return <UserInfoContext.Provider value={{ myInfo, changeInfo }}>
        {children}
    </UserInfoContext.Provider>;

}; 