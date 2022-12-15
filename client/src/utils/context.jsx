import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
    const [currentSnippet, setCurrentSnippet] = useState({});
    return <GlobalContext.Provider value={{setCurrentSnippet, currentSnippet}}>{props.children}</GlobalContext.Provider>
}
