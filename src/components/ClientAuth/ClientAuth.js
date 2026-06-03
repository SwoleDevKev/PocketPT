import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RedirectPage from "../RedirectPage/RedirectPage";



export function ClientAuthorization(WrappedComponent) {
    return function AuthenticatedComponent(props) {
        const [user, setUser] = useState(null);
        const [failedAuth, setFailedAuth] = useState(false);

        useEffect(() => {
            const token = sessionStorage.getItem("token");

            if (!token) {
                setFailedAuth(true);
                return;
            }

            axios
                .get(`${process.env.REACT_APP_API_URL}/api/clients/current`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setUser(response.data);
                })
                .catch(() => {
                    setFailedAuth(true);
                });
        }, []);

        if (failedAuth) {
            return (
                <RedirectPage role="client" />
            );
        }

        if (user === null) {
            return (
                <main className="dashboard">
                    <p>Loading...</p>
                </main>
            );
        }
		

        return (
			<WrappedComponent {...props} user={user} />
        );
    };
}
