import { createContext, useState } from "react";
import AppConstant from "../util/constant.js";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendURL = AppConstant.BACKEND_URL;

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const contextValue = {
        backendURL,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};
