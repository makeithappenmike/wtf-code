import { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
    const [currentSnippet, setCurrentSnippet] = useState({});
    const [refetchSnippets, setRefetchSnippets] = useState( 0 );

    return <GlobalContext.Provider value={{setCurrentSnippet, currentSnippet, refetchSnippets, setRefetchSnippets}}>{props.children}</GlobalContext.Provider>
}
