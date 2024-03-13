import { useContext, useEffect } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext();

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [product, setProd] = useState({});

    useEffect(() => {
        const data = localStorage.getItem("user");
        if (data) {
            const parseData = JSON.parse(data);
            setUser(parseData)
        }

    }, []);

    useEffect(() => {
        const product = localStorage.getItem("product");
        if (product) {
            const parseProduct = JSON.parse(product);
            setProd(parseProduct)
        }
    }, [])

    // console.log("Context User", user);
    // console.log("Product", product);

    return (
        <UserContext.Provider value={ [user, setUser, product, setProd] }>{ children }</UserContext.Provider>
    )
}

const Auth = () => useContext(UserContext);

export { Auth, ContextProvider }