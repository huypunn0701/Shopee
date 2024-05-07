import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";
import { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { notification } from "antd";
// import { useNavigate } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import privateAxios from "../configAxios/privateAxios";

type Stores = {
  storeName: string;
  addressStore: string;
  phone: string;
  storeId: string;
  statusstore: number;
};

const ShopAdmin = () => {
  const [stores, setStores] = useState<Stores[]>([]);
  const [search, setSearch] = useState("");
  // const flaguserJSON = localStorage.getItem("user");
  // const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (flaguser?.statusUser != 1) {
  //     navigate("/");
  //   }
  // }, [flaguser]);

  const getStores = async () => {
    try {
      let response = await privateAxios.get("/stores/admin/user");
      setStores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   Khóa Cửa hàng
  const handleLock = async (id: string) => {
    let statusStore = 2;
    try {
      let response = await axios.put(
        `http://localhost:8000/stores/status/${id}`,
        {
          statusStore,
        }
      );
      let email = response.data.emailStore;
      if (response.status === 200) {
        try {
          await axios.post(`http://localhost:8000/send-email/lock-shop`, {
            email,
          });
          notification.success({
            message: "Cửa hàng đã được khóa!",
            placement: "top",
            duration: 2,
          });
        } catch (error) {
          console.log(error);
        }
        getStores();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   Mở khóa cửa hàng
  const handleUnLock = async (id: string) => {
    let statusStore = 1;
    try {
      let response = await axios.put(
        `http://localhost:8000/stores/status/${id}`,
        {
          statusStore,
        }
      );
      if (response.status === 200) {
        notification.success({
          message: "Đã mở khóa cửa hàng!",
          placement: "top",
          duration: 2,
        });
        getStores();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Search sản phẩm
  const handleSearch = async () => {
    try {
      let storeSearch = await axios.get(
        `http://localhost:8000/stores/search/stores?key=${search}`
      );
      setStores(storeSearch.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStores();
  }, []);

  return (
    <div>
      <HeaderAdmin />
      <div className="userAdmin">
        <NavbarAdmin />
        <div className="main_admin">
          <div className="userAdmin111">
            <div className="search_admin">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button onClick={handleSearch}>
                <SearchIcon />
              </button>
            </div>
            <div style={{ alignItems: "center", display: "flex" }}>
              <div style={{ fontSize: 25 }}>{stores?.length}</div>{" "}
              <StorefrontIcon style={{ fontSize: 30, color: "red" }} />
            </div>
          </div>

          <div className="div_table">
            <table className="table_users">
              <tbody>
                <tr className="tr_user1">
                  <th>Stt</th>
                  <th>Tên cửa hàng</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Hành động</th>
                </tr>
                {stores &&
                  stores.map((store, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{store.storeName}</td>
                      <td>{store.phone}</td>
                      <td>{store.addressStore}</td>
                      {store.statusstore === 1 ? (
                        <td
                          className="icon_"
                          onClick={() => handleLock(store.storeId)}
                        >
                          <LockOpenOutlinedIcon />
                        </td>
                      ) : (
                        <td
                          className="icon_"
                          onClick={() => handleUnLock(store.storeId)}
                        >
                          <LockOutlinedIcon />
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopAdmin;
