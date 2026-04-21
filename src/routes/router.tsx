import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "../components/pages/PublicRoute";
import Login from "../components/pages/login";
import Register from "../components/pages/register";
import ProtectRoute from "../components/pages/ProtectRoute";
import Home from "../components/pages/users/Home";
import { useAppSelector } from "../redux/hooks";
import Dashboard from "../components/pages/admin/Dashboard";
import Products from "../components/pages/product/Products";
import ProductDetails from "../components/pages/product/ProductDetails";
import CategoryDetails from "../components/pages/category/CategoryDetails";
import Categories from "../components/pages/category/Categories";
import Ref from "../components/pages/admin/Ref";

function EcommerceRouter() {
  const { access_token, user } = useAppSelector((state) => state.auth);

  const isAuthenticated = !!access_token;
  const isAdmin = user?.role === "ADMIN";

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" />
            ) : isAdmin ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/users" />
            )
          }
        />
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectRoute allowRoles="ADMIN" />}>
          <Route path="/ref" element={<Ref />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories/:id" element={<CategoryDetails />} />
        </Route>
        <Route element={<ProtectRoute allowRoles="USER" />}>
          <Route path="/users" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default EcommerceRouter;
