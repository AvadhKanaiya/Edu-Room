import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../../lib/firebase";

const AddContext = createContext();
export function useLocalContext() {
    return useContext(AddContext);
}

export function ContextProvider({ children }) {
    const [createClassDialog, setCreateClassDialog] = useState(false);
    const [joinClassDialog, setJoinClassDialog] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [loggedInMail, setLoggedInMail] = useState(null)
    const [loggedInAvatar, setLoggedInAvatar] = useState(null)
    const login = () => {
        auth.signInWithPopup(provider)
    }
    const logout = () => auth.signOut()
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setLoggedInMail(authUser.email)
                setLoggedInUser(authUser)
                setLoggedInAvatar(authUser.photoURL)
            } else {
                setLoggedInMail(null)
                setLoggedInUser(null)
                setLoggedInAvatar(null)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])
    const value = { createClassDialog, setCreateClassDialog, joinClassDialog, setJoinClassDialog, login, loggedInUser, loggedInMail, logout, loggedInAvatar, setLoggedInAvatar }
    return (
        <AddContext.Provider value={value}>
            {children}
        </AddContext.Provider>
    )
}