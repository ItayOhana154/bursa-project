import React, { createContext, useState } from 'react';




export const userInfoContext = createContext();

export const UserProvider = ({ children }) => {
    const [myInfo, setMyInfo] = useState({
        id: 1,
        user_name: "boazFFF"
    });
    const changeInfo = (Id, userName) => {
        setMyInfo({
            id: Id,
            user_name: userName
        });
    };

    return <userInfoContext.Provider value={{ myInfo, changeInfo }}>
        {children}
    </userInfoContext.Provider>;

}; 