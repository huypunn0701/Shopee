import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";
import "./admin.css";
import { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { notification } from "antd";
// import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import privateAxios from "../configAxios/privateAxios";

type Users = {
  userName: string;
  email: string;
  phone: string;
  gender: string;
  statusUser: number;
  userId: string;
};

const UserAmin = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [search, setSearch] = useState("");
  // const flaguserJSON = localStorage.getItem("user");
  // const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (flaguser?.statusUser != 1) {
  //     navigate("/");
  //   }
  // }, [flaguser]);

  const getUsers = async () => {
    try {
      let response = await privateAxios.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   Khóa user
  const handleLock = async (id: string) => {
    let statusUser = 2;
    try {
      let response = await axios.put(
        `http://localhost:8000/users/status/${id}`,
        {
          statusUser,
        }
      );
      let email = response.data.email;
      if (response.status === 200) {
        try {
          await axios.post(`http://localhost:8000/send-email/lock-user`, {
            email,
          });
        } catch (error) {
          console.log(error);
        }
        notification.success({
          message: "Đã khóa tài khoản!",
          placement: "top",
          duration: 2,
        });
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   Mở khóa user
  const handleUnLock = async (id: string) => {
    let statusUser = 0;
    try {
      let data = await axios.put(`http://localhost:8000/users/status/${id}`, {
        statusUser,
      });
      if (data.status === 200) {
        notification.success({
          message: "Đã mở khóa tài khoản!",
          placement: "top",
          duration: 2,
        });
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Search người dùng
  const handleSearch = async () => {
    try {
      let userSearch = await axios.get(
        `http://localhost:8000/users/search/users?key=${search}`
      );
      setUsers(userSearch.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
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
              <div style={{ fontSize: 25 }}>{users?.length}</div>{" "}
              <PersonOutlineIcon style={{ fontSize: 30, color: "red" }} />
            </div>
          </div>

          <div className="div_table">
            <table className="table_users">
              <tbody>
                <tr className="tr_user1">
                  <th>Stt</th>
                  <th>Tên người dùng</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Giới tính</th>
                  <th>Hành động</th>
                </tr>
                {users &&
                  users.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.gender}</td>
                      {user.statusUser === 0 ? (
                        <td
                          className="icon_"
                          onClick={() => handleLock(user.userId)}
                        >
                          <LockOpenOutlinedIcon />
                        </td>
                      ) : user.statusUser === 1 ? (
                        <td className="icon_">Admin</td>
                      ) : (
                        <td
                          className="icon_"
                          onClick={() => handleUnLock(user.userId)}
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

export default UserAmin;
