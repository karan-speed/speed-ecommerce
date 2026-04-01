import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "../components/auth/PublicRoute";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import ProtectRoute from "../components/pages/ProtectRoute";
import Home from "../components/pages/user/Home";
import { useAppSelector } from "../app/hooks";
import Dashboard from "../components/pages/admin/Dashboard";
import Category from "../components/pages/category/Category";
import Products from "../components/pages/product/Products";
import ProductDetails from "../components/pages/product/ProductDetails";
import CategoryDetails from "../components/pages/category/CategoryDetails";

function EcommerceRouter() {
  const { access_token, user } = useAppSelector((state) => state.auth);

  const isAuthenticated = !!access_token;
  const isAdmin = user?.role === "ADMIN";
  const isUser = user?.role === "USER";

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
            ) : isUser ? (
              <Navigate to="/user" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectRoute allowRoles="ADMIN" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/categories/:id" element={<CategoryDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Route>
        <Route element={<ProtectRoute allowRoles="USER" />}>
          <Route path="/user" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default EcommerceRouter;
