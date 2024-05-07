// import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Smart from "./categories/Smart";
import Menfashion from "./categories/Menfashion";
import GirlFashion from "./categories/GirlFashion";
import HomePage from "./home/HomePage";
import { Route, Routes, useLocation } from "react-router-dom";
import ProfileUser from "./profileuser/ProfileUser";
import OrderUser from "./profileuser/OrderUser";
import ShopUser from "./shop/ShopUser";
import OrderDetail from "./shop/OrderDetail";
import ShopProducts from "./shop/ShopProducts";
import AddProducts from "./shop/AddProducts";
import DetailProduct from "./detailproduct/DetailProduct";
import Cart from "./cart/Cart";
import { useEffect } from "react";
import SearchProduct from "./search/SearchProduct";
import UserAmin from "./admin/UserAmin";
import ProductsAdmin from "./admin/ProductsAdmin";
import ShopAdmin from "./admin/ShopAdmin";
import RegisterStore from "./addStore/RegisterStore";
import AddStores from "./addStore/AddStores";
import Laptop from "./categories/Laptop";
import PrivateRouter from "./privateRouter/PrivateRouter";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="app">
      <Routes>
        <Route path="/admin/users" element={<PrivateRouter />}>
          <Route path="/admin/users" element={<UserAmin />} />
        </Route>
        <Route path="/admin/products" element={<PrivateRouter />}>
          <Route path="/admin/products" element={<ProductsAdmin />} />
        </Route>
        <Route path="/admin/shop" element={<PrivateRouter />}>
          <Route path="/admin/shop" element={<ShopAdmin />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="dangky" element={<Register />} />
        <Route path="/dangnhap" element={<Login />} />
        <Route path="/phukiendienthoai/:id" element={<Smart />} />
        <Route path="/thoitrangnam/:id" element={<Menfashion />} />
        <Route path="/thoitrangnu/:id" element={<GirlFashion />} />
        <Route path="/maytinh-laptop/:id" element={<Laptop />} />
        <Route path="/profile" element={<ProfileUser />} />
        <Route path="/donmua" element={<OrderUser />} />
        <Route path="/banhang" element={<ShopUser />} />
        <Route path="/order" element={<OrderDetail />} />
        <Route path="/danhsachsanpham" element={<ShopProducts />} />
        <Route path="/themsanpham" element={<AddProducts />} />
        <Route path="/chitiet/:id" element={<DetailProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search-product" element={<SearchProduct />} />
        <Route path="/dangky-cuahang" element={<RegisterStore />} />
        <Route path="/them-cuahang" element={<AddStores />} />
      </Routes>
    </div>
  );
}

export default App;
