import { Outlet, Navigate } from "react-router-dom";
import Box from "../common/Box";
import "../styles/public.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { IProtectRoute } from "../../types";
import Header from "../Header";
import Sidebar from "./admin/Sidebar";
import { hideLoader } from "../../redux/features/loader/loader.slice";

function ProtectRoute({ allowRoles }: IProtectRoute) {
  const { access_token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isAuthorizeForAdmin = user?.role === "ADMIN";
  const isAuthorizeForUser = user?.role === "USER";
  setTimeout(() => {
    dispatch(hideLoader());
  }, 500);
  if (!access_token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Box className="app-root">
        <Header />
        {isAuthorizeForAdmin && (
          <Box
            className="app-root-container"
            sx={{ width: "100%", marginTop: "57px" }}
          >
            <Sidebar customClass="sidebar-closure" />
            <Box
              sx={{ width: `calc(100% - 250px)`, flex: 1, flexGrow: 1 }}
              component={"main"}
              className="section-container"
            >
              <Outlet />
            </Box>
          </Box>
        )}
        {isAuthorizeForUser && (
          <Box className="app-root-container">
            <Header />
            <Outlet />
          </Box>
        )}
      </Box>
    </>
  );
}

export default ProtectRoute;
