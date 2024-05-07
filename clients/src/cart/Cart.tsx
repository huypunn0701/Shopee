import { NavLink, useNavigate } from "react-router-dom";
import "./cart.css";
import { Avatar, notification } from "antd";
import { Dropdown } from "antd";
import MessageIcon from "@mui/icons-material/Message";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import Footer from "../footer/Footer";
import axios from "axios";
type Product = {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  quantityCart: number;
  imageProduct: string;
  storeName: string;
  storeId: number;
  userId: number;
  quantitySold: number;
};
const Cart = () => {
  // Lấy dữ liệu user lưu trên local
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carts, setCarts] = useState<Product[]>([]);
  const [addressOrder, setAddress] = useState("");
  const [phoneOrder, setPhoneOrder] = useState("");
  const [nameOrder, setNameOrder] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // end modal

  const navigate = useNavigate();
  // Hàm đăng xuất về trang login
  const handleButton = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/dangnhap");
  };

  // Tăng giảm số lượng
  const decreaseQuantity = (productId: number) => {
    const updatedCarts = carts.map((cart) => {
      if (cart.productId === productId && cart.quantityCart > 1) {
        return {
          ...cart,
          quantityCart: cart.quantityCart - 1,
        };
      }
      return cart;
    });
    setCarts(updatedCarts);
  };

  const increaseQuantity = (productId: number) => {
    const updatedCarts = carts.map((cart) => {
      if (cart.productId === productId) {
        return {
          ...cart,
          quantityCart: cart.quantityCart + 1,
        };
      }
      return cart;
    });
    setCarts(updatedCarts);
  };

  // Lấy dữ liệu giỏ hàng
  const getCart = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8000/carts/${flagUser.userId}`
      );
      setCarts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Tính tổng thanh toán
  const calculateTotal = () => {
    let total = 0;
    carts.forEach((cart) => {
      total += cart.price * cart.quantityCart;
    });
    return total;
  };

  // Hàm xóa sản phẩm trong giỏ hàng
  const handleDelete = async (id: number) => {
    try {
      let response = await axios.delete(
        `http://localhost:8000/carts/${flagUser.userId}/${id}`
      );
      if (response.status === 200) {
        notification.success({
          message: "Sản phẩm đã được xóa khỏi Giỏ hàng!",
          placement: "top",
          duration: 2,
        });
        getCart();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Sự kiện xử lý thanh toán đơn hàng tạo bảng order và orderDetail
  const handlePay = async () => {
    let totalPrice = calculateTotal();
    let userId = flagUser.userId;
    let orderIds = [];
    try {
      // Tạo order và lấy orderId từ response
      for (let i = 0; i < carts.length; i++) {
        let cart = carts[i];
        let orderResponse = await axios.post(`http://localhost:8000/orders`, {
          addressOrder,
          phoneOrder,
          nameOrder,
          totalPrice,
          storeId: cart.storeId,
          userId,
        });
        orderIds.push(orderResponse.data.newOrder.orderId);
      }

      // Tạo orderDetail cho từng sản phẩm trong giỏ hàng
      try {
        for (let i = 0; i < carts.length; i++) {
          let cart = carts[i];
          await axios.post(`http://localhost:8000/order-detail`, {
            productId: cart.productId,
            quantityOrder: cart.quantityCart,
            priceOrder: cart.price,
            orderId: orderIds[i],
          });
        }
      } catch (error) {
        console.log(error);
      }

      // Cập nhật số lượng đã bán
      try {
        for (let i = 0; i < carts.length; i++) {
          const cart = carts[i];
          const updatedQuantitySold = cart.quantitySold + cart.quantityCart;
          await updateProductQuantitySold(cart.productId, updatedQuantitySold);
        }
      } catch (error) {
        console.log(error);
      }

      // Cập nhật số lượng sản phẩm
      try {
        for (let i = 0; i < carts.length; i++) {
          const cart = carts[i];
          const updatedQuantity = cart.quantity - cart.quantityCart;
          await updateProductQuantity(cart.productId, updatedQuantity);
        }
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await axios.post("http://localhost:8800/payment", {
          amount: totalPrice,
          email: flagUser.email || "fishyshynn@gmail.com",
        });
        window.location.href = response.data.url;
      } catch (error) {
        console.log(error);
      }
      notification.success({
        message: "Thanh toán thành công!",
        placement: "top",
        duration: 2,
      });
      setIsModalOpen(false);
      // Xóa khỏi giỏ hàng
      try {
        let response = await axios.delete(
          `http://localhost:8000/carts/${userId}`
        );
        if (response.status === 200) {
          getCart();
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm cập nhật lại số lượng tồn kho
  const updateProductQuantity = async (productId: number, quantity: number) => {
    try {
      await axios.put(`http://localhost:8000/products/quantity/${productId}`, {
        quantity: quantity,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm cập nhật lại số lượng đã bán
  const updateProductQuantitySold = async (
    productId: number,
    quantitySold: number
  ) => {
    try {
      await axios.put(
        `http://localhost:8000/products/quantitySold/${productId}`,
        {
          quantitySold: quantitySold,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);
  // Hàm chuyển đổi đơn vị tiền
  const formatCurrency = (value: any) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <div>
      <div className="header11">
        <nav className="header__navbar hide-on-mobile-tablet">
          <ul className="header__nav-list">
            <li className="header__nav-item header__nav-item--hover header__nav-item--separate">
              <NavLink
                to={"/danhsachsanpham"}
                style={{ textDecoration: "none", color: "white" }}
              >
                Kênh Người Bán
              </NavLink>
            </li>
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
                Thông báo
              </a>
            </li>
            <li className="header__nav-item">
              <a href="#" className="header__nav-item-link">
                <i className="header__nav-icon far fa-question-circle" />
                Hỗ trợ
              </a>
            </li>
            <li className="header__nav-item header__nav-item--bold header__nav-item--separate">
              <a href="#" className="header__nav-item-link">
                <i className="header__nav-icon fa-solid fa-globe"></i>
                Tiếng việt
              </a>
            </li>
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
                          className="btn__logout"
                        >
                          <button style={{ fontSize: "1rem" }}>
                            Hồ sơ shop
                          </button>
                        </NavLink>
                      ),
                    },
                    {
                      key: "2",
                      label: (
                        <button
                          onClick={handleButton}
                          style={{
                            background: "none",
                            border: "none",
                            fontSize: "1rem",
                          }}
                        >
                          Đăng xuất
                        </button>
                      ),
                    },
                  ],
                }}
                placement="bottom"
                arrow
              >
                <Button className="avatar__order111">
                  {" "}
                  <Avatar
                    src={flagUser?.avatarUrl}
                    className="avatarrr"
                    size={25}
                  >
                    ĐN
                  </Avatar>
                  <span style={{ paddingLeft: 5 }}> {flagUser?.userName}</span>
                </Button>
              </Dropdown>
            </li>
          </ul>
        </nav>
      </div>
      <div className="avatar__cart">
        <NavLink to={"/"} style={{ cursor: "pointer" }}>
          <img src="../assets/ShopeeLogo.png" alt="" width={120} />
        </NavLink>
        <div className="avatar__cart1">Giỏ Hàng</div>
      </div>
      <div className="cart__ship">
        <div className="ship__cart">
          <img src="../assets/ship/10.png" alt="" width={32} />
          <p>
            Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển
            bạn nhé!
          </p>
        </div>
        <div className="th_table">
          <div className="th_table1">Sản Phẩm</div>
          <div className="th_table2">Đơn Giá</div>
          <div className="th_table3">Số Lượng</div>
          <div className="th_table4">Số Tiền</div>
          <div className="th_table5">Thao Tác</div>
        </div>

        {/* Các mặt hàng */}
        {carts &&
          carts.map((cart: Product, index) => (
            <div className="th_table111" key={index}>
              <div className="th_table1111" style={{ paddingTop: 20 }}>
                <div className="th__table222">
                  <div className="yeuthich"> Yêu thích</div>
                  <div style={{ color: "black", cursor: "pointer" }}>
                    {cart.storeName}
                  </div>
                  <MessageIcon
                    style={{ color: "#ee4d2d", cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className="th__table">
                <div className="th_table1">
                  <img src={cart.imageProduct} alt="" width={100} />
                  <p>{cart.productName}</p>
                </div>
                <div className="th_table2" style={{ color: "black" }}>
                  {formatCurrency(cart.price)}
                </div>
                <div className="th_table3">
                  <div className="buttons_added">
                    <button
                      className="minus is-form"
                      onClick={() => decreaseQuantity(cart.productId)}
                    >
                      -
                    </button>
                    <input
                      aria-label="quantity"
                      className="input-qty"
                      min={1}
                      value={cart.quantityCart}
                      readOnly
                    />
                    <button
                      className="plus is-form"
                      onClick={() => increaseQuantity(cart.productId)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="th_table4" style={{ color: "#ee4d2d" }}>
                  {formatCurrency(cart.price * cart.quantityCart)}
                </div>
                <div className="th_table6">
                  <button onClick={() => handleDelete(cart.productId)}>
                    Xóa
                  </button>
                </div>
              </div>
              <div className="voucher">
                <BrandingWatermarkOutlinedIcon
                  style={{ color: "#ee4d2d", cursor: "pointer" }}
                />
                <div style={{ cursor: "pointer" }}>
                  Shop Voucher giảm đến ₫20k
                </div>
                <p style={{ color: "#05a", cursor: "pointer" }}>
                  Xem thêm voucher
                </p>
              </div>
              <div className="voucher1">
                <img src="../assets/ship/10.png" alt="" width={30} />
                <div style={{ cursor: "pointer" }}>
                  Giảm ₫15.000 phí vận chuyển đơn tối thiểu ₫50.000; Giảm
                  ₫25.000 phí vận chuyển đơn tối thiểu ₫99.000
                </div>
                <p style={{ color: "#05a", cursor: "pointer" }}>
                  Tìm hiểu thêm
                </p>
              </div>
            </div>
          ))}
        {/* End */}

        <div className="thanhtoan">
          <div className="sum">
            Tổng thanh toán: <span>{formatCurrency(calculateTotal())}</span>
          </div>
          <div className="muahang">
            <>
              <button onClick={showModal}>Mua Hàng</button>
              <Modal
                title="Thông tin nhận hàng"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={""}
              >
                <table className="table">
                  <tbody>
                    <tr>
                      <td className="label">Tên người nhận</td>
                      <td className="label1">
                        <input
                          type="text"
                          onChange={(e) => setNameOrder(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="label">Số điện thoại</td>
                      <td className="label1">
                        <input
                          type="text"
                          onChange={(e) => setPhoneOrder(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="label">Địa chỉ</td>
                      <td className="label1">
                        <input
                          type="text"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="label"></td>
                      <td className="label1" style={{ fontSize: 20 }}>
                        Tổng thanh toán:{" "}
                        <span style={{ color: "rgb(238,77,45)" }}>
                          {formatCurrency(calculateTotal())}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="label"></td>
                      <td className="label1">
                        <button onClick={handlePay}>Thanh Toán</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Modal>
            </>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
