import "./styles/Header.scss";
import { useAppSelector } from "../redux/hooks";
import AdminHeader from "./pages/admin/AdminHeader";
import UserHeader from "./pages/users/UserHeader";
function Header() {
  const isAuthorizeForAdmin = useAppSelector(
    (state) => state.auth.user?.role === "ADMIN",
  );
  const isAuthorizeForUser = useAppSelector(
    (state) => state.auth.user?.role === "USER",
  );
  return (
    <>
      {isAuthorizeForUser && <UserHeader />}
      {isAuthorizeForAdmin && <AdminHeader />}
    </>
  );
}

export default Header;
