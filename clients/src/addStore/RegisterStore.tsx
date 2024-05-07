import { NavLink } from "react-router-dom";
import Header from "./Header";

const RegisterStore = () => {
  return (
    <div className="container__">
      <div className="container__1">
        <Header />
        <div className="store_main">
          <div className="img_store">
            <img src="../assets/222.png" alt="" width={150} />
          </div>
          <div className="store_main1">Chào mừng đến với Shopee!</div>
          <div className="store_main2">
            Để đăng ký bán hàng trên Shopee, bạn cần cung <br /> cấp một số
            thông tin cơ bản.
          </div>
          <NavLink to="/them-cuahang" style={{ textDecoration: "none" }}>
            <button className="store_main3">Đăng ký</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RegisterStore;
