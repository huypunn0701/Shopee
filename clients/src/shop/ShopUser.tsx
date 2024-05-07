import { NavLink } from "react-router-dom";
import "./Shopuser.css";
const ShopUser = () => {
  return (
    <div>
      <div className="shop_left">
        <div>
          <div className="option_shop">
            <div className="option_shop1" style={{ marginRight: 10 }}>
              <img src="../assets/shop/2.png" alt="" width={18} />
            </div>
            <div>
              <h3>Quản Lý Sản Phẩm</h3>
              <NavLink
                to={"/danhsachsanpham"}
                style={{ textDecoration: "none" }}
              >
                <p>Tất Cả Sản Phẩm</p>
              </NavLink>
              <NavLink to={"/themsanpham"} style={{ textDecoration: "none" }}>
                <p>Thêm Sản Phẩm</p>
              </NavLink>
              <NavLink to={"/vipham"} style={{ textDecoration: "none" }}>
                <p>Sản Phẩm Vi Phạm</p>
              </NavLink>
              <NavLink to={"/caidatsanpham"} style={{ textDecoration: "none" }}>
                <p>Cài Đặt Sản Phẩm</p>
              </NavLink>
            </div>
          </div>
          <div className="option_shop">
            <div className="option_shop1" style={{ marginRight: 10 }}>
              <img src="../assets/shop/1.png" alt="" width={18} />
            </div>
            <div>
              <h3>Quản Lý Đơn Hàng</h3>
              <NavLink to={"/order"} style={{ textDecoration: "none" }}>
                <p>Tất Cả Đơn Hàng</p>
              </NavLink>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p>Đã Hủy</p>
              </NavLink>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p>Trả Hàng/Hoàn tiền</p>
              </NavLink>
            </div>
          </div>
          <div className="option_shop">
            <div className="option_shop1" style={{ marginRight: 10 }}>
              <img src="../assets/shop/3.png" alt="" width={18} />
            </div>
            <div>
              <h3>Quản Lý Shop</h3>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p>Đánh Giá Shop</p>
              </NavLink>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p>Hồ Sơ Shop</p>
              </NavLink>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p>Trang Trí Shop</p>
              </NavLink>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p>Danh Mục Của Shop</p>
              </NavLink>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p>Kho Hình Ảnh/Video</p>
              </NavLink>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p>Báo Cáo Của Tôi</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopUser;
