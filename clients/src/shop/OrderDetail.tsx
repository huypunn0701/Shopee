import ShopUser from "./ShopUser";
import "./order.css";
import { Avatar, notification } from "antd";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import MessageIcon from "@mui/icons-material/Message";
import HeaderOrder from "./HeaderOrder";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import moment from "moment";

type Store = {
  storeId: number;
};
type Product = {
  addressOrder: string;
  avatarUrl: string;
  createDateOrder: string;
  imageProduct: string;
  nameOrder: string;
  orderId: string;
  phoneOrder: string;
  productId: number;
  quantityOrder: number;
  statusOrder: string;
  storeId: number;
  totalPrice: number;
  userId: number;
  productName: string;
  userName: string;
  price: number;
  priceOrder: number;
};
const OrderDetail = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [groupedOrders, setGroupedOrders] = useState<{
    [orderId: string]: Product[];
  }>({});
  const [currentOrder, setCurrentOrder] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (orderId: string) => {
    const order = groupedOrders[orderId][0];
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // Lấy user đang đăng nhập
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;

  // Hàm lấy id của stores
  const getStore = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8000/stores/${flagUser.userId}`
      );
      setStores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStore();
  }, []);

  let storeId = stores.length > 0 ? stores[0]?.storeId : null;

  // Lấy tất cả đơn hàng đã order
  const getOrder = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8000/stores/order/${storeId}`
      );
      if (response.data.orderStore[0].productName) {
        const groupedData = response.data.orderStore.reduce(
          (acc: { [orderId: string]: Product[] }, cart: Product) => {
            if (!acc[cart.orderId]) {
              acc[cart.orderId] = [];
            }
            acc[cart.orderId].push(cart);
            return acc;
          },
          {}
        );
        setGroupedOrders(groupedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm cập nhật trạng thái
  const handleUpdate = async (id: string) => {
    console.log(id);
    let statusOrder = "delivering";
    try {
      let response = await axios.put(`http://localhost:8000/orders/${id}`, {
        statusOrder,
      });
      if (response.data.status === 200) {
        notification.success({
          message: "Xác nhận đơn hàng thành công!",
          placement: "top",
          duration: 2,
        });
      }
      getOrder();
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    getOrder();
  }, [storeId]);

  // Hàm chuyển đổi đơn vị tiền
  const formatCurrency = (value: any) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div>
      <HeaderOrder />
      <div className="container_shop">
        <ShopUser />
        <div className="container_right1">
          <div className="order_header">
            <h2 style={{ color: "black" }}>
              {Object.keys(groupedOrders).length} Đơn hàng
            </h2>
            <div className="order_header1" style={{ color: "white" }}>
              Giao Hàng Loạt
            </div>
          </div>
          <div className="order_table">
            <div className="name_order">Sản phẩm</div>
            <div className="sum_order">Tổng đơn hàng</div>
            <div className="status_order">Trạng thái</div>
            <div className="active_order">Thao tác</div>
          </div>
          {Object.keys(groupedOrders).map((orderId) => (
            <div className="order_table1" key={orderId}>
              <div className="order_name">
                <Avatar
                  src={groupedOrders[String(orderId)][0].avatarUrl}
                  className="avatarrr"
                  size={35}
                >
                  ĐN
                </Avatar>
                <p>{groupedOrders[String(orderId)][0].userName}</p>
                <MessageIcon style={{ color: "red", cursor: "pointer" }} />
              </div>

              <div className="order_table2">
                <div className="name_order">
                  {groupedOrders[String(orderId)].map((order: Product) => (
                    <div className="name_order1" key={order.productId}>
                      <img src={order.imageProduct} alt="" width={70} />
                      <p>{order.productName}</p>
                    </div>
                  ))}
                </div>
                <div className="sum_order">
                  {formatCurrency(
                    groupedOrders[String(orderId)][0].quantityOrder *
                      groupedOrders[String(orderId)][0].priceOrder
                  )}
                </div>
                <div className="status_order">
                  {groupedOrders[String(orderId)][0].statusOrder ===
                  "pending" ? (
                    <button
                      style={{
                        color: "rgb(238,77,45)",
                        cursor: "pointer",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "none",
                      }}
                      onClick={() =>
                        handleUpdate(groupedOrders[String(orderId)][0].orderId)
                      }
                    >
                      Xác nhận đơn hàng
                    </button>
                  ) : groupedOrders[String(orderId)][0].statusOrder ===
                    "delivering" ? (
                    <span style={{ color: "#2673dd" }}>Đang Giao</span>
                  ) : groupedOrders[String(orderId)][0].statusOrder ===
                    "success" ? (
                    <span style={{ color: "#2673dd" }}>Đã Giao</span>
                  ) : groupedOrders[String(orderId)][0].statusOrder ===
                    "cancel" ? (
                    <span style={{ color: "#2673dd" }}>Đã Hủy</span>
                  ) : (
                    groupedOrders[String(orderId)][0].statusOrder
                  )}
                </div>

                <div
                  className="active_order"
                  style={{ color: "#2673dd", display: "flex", gap: "5px" }}
                >
                  <ManageSearchOutlinedIcon />
                  <p onClick={() => showModal(orderId)} style={{ padding: 0 }}>
                    Xem chi tiết
                  </p>
                  <Modal
                    // title=" Tạo Mới Thông Tin Cửa Hàng"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={""}
                  >
                    {currentOrder && (
                      <>
                        <div className="address">
                          <PinDropOutlinedIcon style={{ color: "#ee4d2d" }} />{" "}
                          <p>ĐỊA CHỈ NHẬN HÀNG</p>
                        </div>
                        <table className="table table_table">
                          <tbody>
                            <tr>
                              <td className="label">Ngày tạo đơn: </td>
                              <td className="label1">
                                {moment(currentOrder.createDateOrder).format(
                                  "YYYY-MM-DD HH:mm:ss"
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Tên người nhận: </td>
                              <td className="label1">
                                {currentOrder.nameOrder}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Số điện thoại: </td>
                              <td className="label1">
                                {currentOrder.phoneOrder}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Địa chỉ: </td>
                              <td className="label1">
                                {currentOrder.addressOrder}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}
                  </Modal>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
