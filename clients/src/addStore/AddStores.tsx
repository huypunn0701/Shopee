import { notification } from "antd";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const AddStores = () => {
  const [addressStore, setAddressStore] = useState("");
  const [phone, setPhone] = useState("");
  const [storeName, setStoreName] = useState("");
  const [emailStore, setEmail] = useState("");

  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;

  // Post thông tin vào bảng stores
  const handleStores = async () => {
    if (!flagUser) {
      notification.error({
        message: "Cần đăng nhập để đăng ký cửa hàng",
        placement: "top",
        duration: 2,
      });
      setTimeout(() => {
        navigate("/dangnhap");
      }, 2000);
      return;
    }
    let statusstore = 1;
    try {
      let data = await axios.post(`http://localhost:8000/stores`, {
        phone,
        addressStore,
        storeName,
        statusstore,
        emailStore,
        userId: flagUser.userId,
      });
      if (data.data.status === 200) {
        notification.success({
          message: "Đăng ký cửa hàng thành công!",
          placement: "top",
          duration: 2,
        });
        setTimeout(() => {
          navigate("/danhsachsanpham");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="add_store">
        <Header />
        <div className="main_add">
          Cài đặt thông tin cửa hàng <hr />
        </div>
        <div className="main_left main_lefttt">
          <table className="table">
            <tbody>
              <tr>
                <td className="label">Tên Shop</td>
                <td className="label1">
                  <input
                    type="text"
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Số điện thoại</td>
                <td className="label1">
                  <input
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Địa chỉ lấy hàng</td>
                <td className="label1">
                  <input
                    type="text"
                    onChange={(e) => setAddressStore(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">Email</td>
                <td className="label1">
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className="label"></td>
                <td className="label1">
                  <button onClick={handleStores}>Lưu</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddStores;
