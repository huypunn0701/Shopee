import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Button, Dropdown, notification } from "antd";
import { Avatar } from "antd";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import axios from "axios";
import { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

type Product = {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  quantityCart: number;
  image: string;
  storeName: string;
  storeId: number;
  userId: number;
  quantitySold: number;
};

type Stores = {
  statusstore: number;
};

const Navbar = () => {
  const [stores, setStores] = useState<Stores[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);

  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;

  // Hàm đăng xuất về trang login
  const handleButton = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/dangnhap");
  };

  // Lấy dữ liệu bảng stores về
  const handleStore = async () => {
    try {
      let data = await axios.get(
        `http://localhost:8000/stores/${flagUser.userId}`
      );
      setStores(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleStore();
  }, []);

  // Lấy giá trị query hàm search
  const [search, setSearch] = useState<string | null>("");
  const handleSearch = () => {
    navigate(`/search-product?key=${search}`);
  };

  // Lấy dữ liệu giỏ hàng
  const getCart = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8000/carts/${flagUser.userId}`
      );
      console.log(response);
      setCarts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Thông báo cửa hàng bị khóa
  const handleAlertStores = () => {
    notification.error({
      message: "Cửa hàng bị khóa, liên hệ với admin!",
      placement: "top",
      duration: 2,
    });
  };

  useEffect(() => {
    getCart();
  }, [carts.length]);

  return (
    <div className="header">
      {/* header */}
      <header>
        <div className="grid wide">
          {/* navbar */}
          <nav className="header__navbar hide-on-mobile-tablet">
            <ul className="header__nav-list">
              {stores.length > 0 && stores[0].statusstore === 1 ? (
                <li className="header__nav-item header__nav-item--hover header__nav-item--separate">
                  <NavLink
                    to={"/danhsachsanpham"}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Kênh Người Bán
                  </NavLink>
                </li>
              ) : stores.length > 0 && stores[0].statusstore === 2 ? (
                <li className="header__nav-item header__nav-item--hover header__nav-item--separate">
                  <div onClick={handleAlertStores}>Kênh Người Bán</div>
                </li>
              ) : (
                <li className="header__nav-item header__nav-item--hover header__nav-item--separate">
                  <div className="muahang">
                    <NavLink
                      to={"/dangky-cuahang"}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Kênh Người Bán
                    </NavLink>
                  </div>
                </li>
              )}
              <li className="header__nav-item header__nav-item--hover header__nav-item--separate header__show-qr">
                Tải ứng dụng
              </li>
              <li className="header__nav-item">
                Kết nối
                <a href="#" className="header__nav-icon-link">
                  <i className="header__nav-icon fab fa-facebook" />
                </a>
                <a href="#" className="header__nav-icon-link">
                  <i className="header__nav-icon fab fa-instagram" />
                </a>
              </li>
            </ul>
            <ul className="header__nav-list">
              <li className="header__nav-item header__show-note">
                <a href="#" className="header__nav-item-link">
                  <i className="header__nav-icon far fa-bell" />
                  Thông Báo
                </a>
              </li>
              <li className="header__nav-item">
                <a href="#" className="header__nav-item-link">
                  <i className="header__nav-icon far fa-question-circle" />
                  Hỗ Trợ
                </a>
              </li>
              <li className="header__nav-item header__nav-item--bold header__nav-item--separate">
                <a href="#" className="header__nav-item-link">
                  <i className="header__nav-icon fa-solid fa-globe"></i>
                  Tiếng Việt
                </a>
              </li>
              {flagUser ? (
                <>
                  {flagUser.statusUser === 1 && (
                    <li className="header__nav-item header__nav-item--bold">
                      <NavLink
                        to={"/admin/users"}
                        className="header__nav-item-link"
                      >
                        Admin
                      </NavLink>
                    </li>
                  )}
                  <li className="header__nav-item header__nav-item--bold header__nav-item--separate">
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
                                }}
                              >
                                <NoteAltOutlinedIcon />
                                <button
                                  style={{
                                    color: "black",
                                    background: "none",
                                    border: "none",
                                    fontSize: "1rem",
                                  }}
                                >
                                  Tài Khoản
                                </button>
                              </NavLink>
                            ),
                          },
                          {
                            key: "2",
                            label: (
                              <NavLink
                                to={"/donmua"}
                                style={{
                                  alignItems: "center",
                                  display: "flex",
                                  gap: 15,
                                  marginTop: 10,
                                  marginBottom: 10,
                                }}
                              >
                                <ShoppingBagOutlinedIcon />
                                <button
                                  style={{
                                    color: "black",
                                    background: "none",
                                    border: "none",
                                    fontSize: "1rem",
                                  }}
                                >
                                  Đơn Mua
                                </button>
                              </NavLink>
                            ),
                          },
                          {
                            key: "3",
                            label: (
                              <div
                                style={{
                                  alignItems: "center",
                                  display: "flex",
                                  gap: 15,
                                }}
                              >
                                <LogoutIcon />
                                <button
                                  style={{
                                    color: "black",
                                    background: "none",
                                    border: "none",
                                    fontSize: "1rem",
                                  }}
                                  onClick={handleButton}
                                >
                                  Đăng Xuất
                                </button>
                              </div>
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
                          src={flagUser.avatarUrl}
                          className="avatarrr"
                          size={25}
                        >
                          ĐN
                        </Avatar>
                        <span style={{ color: "#FDFFFF" }}>
                          {flagUser.userName}
                        </span>{" "}
                      </Button>
                    </Dropdown>
                  </li>
                </>
              ) : (
                <>
                  <li className="header__nav-item header__nav-item--bold header__nav-item--separate">
                    <NavLink to={"/dangky"} className="header__nav-item-link">
                      Đăng ký
                    </NavLink>
                  </li>
                  <li className="header__nav-item header__nav-item--bold">
                    <NavLink to={"/dangnhap"} className="header__nav-item-link">
                      Đăng nhập
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
          {/* search */}
          <div className="header__contain">
            <div className="header__logo">
              <NavLink to={"/"} className="header__logo-link">
                <img
                  src="../assets/logo-full-white.png"
                  className="header__logo-img"
                />
              </NavLink>
            </div>
            <div className="header__search">
              <div className="header__search-input-wrap">
                <input
                  type="text"
                  className="header__search-input"
                  placeholder="SĂN VOUCHER 1 TRIỆU ĐỒNG"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
              </div>
              <button className="btn header__search-btn" onClick={handleSearch}>
                <i className="header__search-btn-icon fas fa-search" />
              </button>
            </div>
            <div className="header__cart header__cart--has-cart">
              <NavLink to={"/cart"}>
                {" "}
                <ShoppingCartOutlinedIcon
                  className="header__cart-icon fas fa-shopping-cart"
                  style={{ fontSize: "2.2rem" }}
                />
              </NavLink>
              <span className="span_cartCount">{carts.length}</span>
            </div>
          </div>
        </div>
        <div className="hagtag">
          <ul>
            <a>
              <li>Áo Thể Thao Nam</li>
            </a>
            <li>Áo Polo Nam</li>
            <li>Quần Đùi Nam</li>
            <li>Đồ Chơi Người Lớn 18+</li>
            <li>Dép Nam</li>
            <li>Áo Thể Thao Nam</li>
            <li>Bóng Đá</li>
            <li>Thuốc Mê</li>
            <li>Điện Thoại 1k</li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
