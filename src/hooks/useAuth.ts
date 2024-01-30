import { useAppSelector } from "@/lib/store/store";
import { useContext, useDebugValue } from "react";

const useAuth = () => {
    const { auth } = useAppSelector((state) => state.auth_reducer);
    useDebugValue(auth, auth => auth?.token ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;