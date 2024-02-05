import { selectAuth } from "@/lib/store/slices/authSlice";
import { useSelector } from "react-redux";
import RedirectToLogin from "./RedirectToLogin";

const PrivateRoute = ({ children }: { children: any }) => {
  const { user } = useSelector(selectAuth);
  return user?.token ? children : <RedirectToLogin />;
};

export default PrivateRoute;
