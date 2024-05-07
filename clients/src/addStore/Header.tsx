import { Avatar, Button, Dropdown } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Stores.css";

const Header = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;
  // Hàm đăng xuất về trang login
  const handleButton = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/dangnhap");
  };
  return (
    <div>
      <div className="container_store">
        <div className="header_store">
          <div className="store_logo">
            <NavLink to={"/"} className="header__logo-link">
              <img
                src="../assets/ShopeeLogo.png"
                className="header__logo-img"
              />
            </NavLink>
          </div>
          <div className="store_register">
            Đăng ký trở thành Người bán Shopee
          </div>
        </div>
        <div className="header_store1">
          <div>
            <Dropdown
              menu={{
                items: [
                  {
                    key: "2",
                    label: (
                      <button
                        style={{
                          alignItems: "center",
                          display: "flex",
                          gap: 10,
                          background: "none",
                          border: "none",
                          fontSize: ".9125rem",
                        }}
                      >
                        <LogoutIcon />
                        <p
                          onClick={handleButton}
                          style={{ color: "rgba(0, 0, 0, 0.88)" }}
                        >
                          Log Out
                        </p>
                      </button>
                    ),
                  },
                ],
              }}
              placement="bottom"
              arrow
            >
              <Button className="avatar__order">
                {" "}
                <Avatar
                  className="avatarrr"
                  size={40}
                  src={flagUser?.avatarUrl}
                >
                  ĐN
                </Avatar>
                <span>{flagUser?.userName}</span>{" "}
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
