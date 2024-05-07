import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import "./authentication.css";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { MouseEvent, useState } from "react";
import { notification } from "antd";
import axios from "axios";

const Register: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [passwordUser, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!userName || userName.length === 0) {
        notification.error({
          message: "Tên người dùng không được để trống!",
          placement: "top",
          duration: 2,
        });
        return;
      }

      if (/\s/.test(userName) || !/^[\w_]+$/.test(userName)) {
        notification.error({
          message:
            "Tên người dùng không chứa khoảng trắng và chỉ được sử dụng ký tự _.",
          placement: "top",
          duration: 2,
        });
        return;
      }

      if (!passwordUser || passwordUser.length === 0) {
        notification.error({
          message: "Mật khẩu không được để trống!",
          placement: "top",
          duration: 2,
        });
        return;
      }
      if (passwordUser.length < 3) {
        notification.error({
          message: "Mật khẩu phải trên 3 ký tự!",
          placement: "top",
          duration: 2,
        });
        return;
      }
      if (!passwordConfirm || passwordUser.length === 0) {
        notification.error({
          message: "Mật khẩu không được để trống!",
          placement: "top",
          duration: 2,
        });
        return;
      }
      if (passwordConfirm.length < 3) {
        notification.error({
          message: "Mật khẩu phải trên 3 ký tự!",
          placement: "top",
          duration: 2,
        });
        return;
      }
      if (passwordUser != passwordConfirm) {
        notification.error({
          message: "Mật khẩu không trùng khớp!",
          placement: "top",
          duration: 2,
        });
        return;
      }
      const response = await axios.post(
        "http://localhost:8000/users/register",
        {
          userName,
          password: passwordUser,
        }
      );
      if (response.data.status === 201) {
        notification.error({
          message: "Tên đăng nhập đã được đăng ký!",
          placement: "top",
          duration: 2,
        });
      }
      if (response.status === 200) {
        notification.success({
          message: "Đăng ký thành công!",
          placement: "top",
          duration: 2,
        });
        setTimeout(() => {
          navigate("/dangnhap");
        }, 1000);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="containerr">
        <div className="containerr_left">
          <NavLink to={"/"}>
            <img
              src="../assets/ShopeeLogo.png"
              alt=""
              height={50}
              width={140}
            />
          </NavLink>
          <p>Đăng ký</p>
        </div>
        <div className="containerr_right">
          <p>Bạn cần giúp đỡ?</p>
        </div>
      </div>
      <div className="mainn">
        <div className="authen">
          <form action="">
            <p className="header1">Đăng ký</p>
            <div className="authen1">
              <input
                type="text"
                placeholder="Tên đăng nhập"
                onChange={(e) => setUserName(e.target.value)}
              />{" "}
              <br />
              <input
                type="password"
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />{" "}
              <br />
              <button onClick={(e) => handleButton(e)}>ĐĂNG KÝ</button>
              <div className="or_login">
                <div className="a"></div>
                <p>Hoặc</p>
                <div className="b"></div>
              </div>
              <div className="face">
                <div className="face1">
                  <p className="face12">
                    <FacebookOutlinedIcon />
                  </p>
                  <p>Facebook</p>
                </div>
                <div className="face1">
                  <p style={{ paddingTop: 5 }}>
                    <img
                      src="../assets/111.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  </p>
                  <p>Google</p>
                </div>
              </div>
              <div className="authen_login">
                <p>Bằng việc đăng ký, bạn đã đồng ý về</p>
                <p>
                  <span style={{ color: "#ee4d2d" }}>Điều khoản dịch vụ </span>
                  <span>& </span>
                  <span style={{ color: "#ee4d2d" }}>Chính sách bảo mật</span>
                </p>
              </div>
              <div style={{ marginTop: 30 }}>
                <p style={{ color: "rgba(0,0,0,.26)" }}>
                  Bạn đã có tài khoản?{" "}
                  <NavLink
                    to={"/dangnhap"}
                    style={{ textDecoration: "none", color: "#ee4d2d" }}
                  >
                    Đăng nhập
                  </NavLink>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
