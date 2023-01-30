import React, { createContext, useState } from 'react';

export const stokeIdContext = createContext();

export const StokeProvider = ({ children }) => {
    const [stokeId, setStokeId] = useState(1);
    const changeId = (Id) => {
        setStokeId(Id);
    };

    return <stokeIdContext.Provider value={{ stokeId, changeId }}>
        {children}
    </stokeIdContext.Provider>;

}; 