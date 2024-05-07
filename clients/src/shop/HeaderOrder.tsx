import { NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import ListIcon from "@mui/icons-material/List";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import { Button, Dropdown } from "antd";

const HeaderOrder = () => {
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;

  // Hàm đăng xuất về trang login
  const navigate = useNavigate();
  const handleButton = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/dangnhap");
  };

  return (
    <div className="container_header">
      <NavLink to={"/"} className="header_order">
        {" "}
        <img src="../assets/ShopeeLogo.png" alt="" width={120} />
        <p style={{ paddingTop: 10 }}>Trang Chủ</p>
      </NavLink>
      <div className="header_orderl">
        <div>
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <NavLink
                      to={"/profile"}
                      style={{
                        alignItems: "center",
                        display: "flex",
                        gap: 10,
                        fontSize: "1.1rem",
                      }}
                    >
                      <NoteAltOutlinedIcon />
                      <p>Hồ sơ shop</p>
                    </NavLink>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <p
                      style={{
                        alignItems: "center",
                        display: "flex",
                        gap: 10,
                        background: "none",
                        border: "none",
                        fontSize: "1.1rem",
                      }}
                    >
                      <LogoutIcon />
                      <p
                        onClick={handleButton}
                        style={{ color: "rgba(0, 0, 0, 0.88)" }}
                      >
                        Log Out
                      </p>
                    </p>
                  ),
                },
              ],
            }}
            placement="bottom"
            arrow
          >
            <Button className="avatar__order">
              {" "}
              <Avatar src={flagUser?.avatarUrl} className="avatarrr" size={40}>
                ĐN
              </Avatar>
              <span>{flagUser?.userName}</span>{" "}
            </Button>
          </Dropdown>
        </div>
        <ListIcon />
        <NotificationsNoneOutlinedIcon />
        <div className="btn__order">
          <button>SHOPEE UNI</button>
        </div>
      </div>
    </div>
  );
};

export default HeaderOrder;
