import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { NavBar, Footer, Loader } from "../components";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../stores";
import { useEffect, useState } from "react";
import { api } from "../utils";

export const Route = createRootRoute({
    component: () => {
        const location = useLocation();
        let x: string = location.pathname;
        // console.log(location);
        const [loading, setLoading] = useState<boolean>(false);
        const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
        const login = useAuthStore((state) => state.login);

        const verify = async () => {
            setLoading(true);
            try {
                const response = await api.get("/api/v1/auth/verify-token");
                if (response.data?.success && response.data?.is_authenticated) {
                  const user = response.data.data; 
                  login(user);
                }
            } catch (error) {
                console.error("Token verification failed:", error);
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            if (!isLoggedIn) {
                verify();
            }
        }, []);

        return (
            <>
                {!x.startsWith("/admin") && (<NavBar />)}
                <Toaster />
                {loading ? <Loader /> : <Outlet />}
                {!x.startsWith("/admin") && <Footer />}
                <TanStackRouterDevtools />
            </>
        );
    },
});