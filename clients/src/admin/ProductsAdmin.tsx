import { Avatar, Pagination, notification } from "antd";
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SearchIcon from "@mui/icons-material/Search";
import privateAxios from "../configAxios/privateAxios";

type Product = {
  avatarUrl: string;
  storeName: string;
  imageProduct: string;
  productId: string;
  storeId: string;
  userId: string;
  productName: string;
  statusProduct: number;
};

const ProductsAdmin = () => {
  const [groupedOrders, setGroupedOrders] = useState<{
    [storeId: string]: Product[];
  }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  // const flaguserJSON = localStorage.getItem("user");
  // const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (flaguser?.statusUser != 1) {
  //     navigate("/");
  //   }
  // }, [flaguser]);

  // Phân trang
  const shopsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startShopIndex = (currentPage - 1) * shopsPerPage;
  const visibleShops = Object.keys(groupedOrders).slice(
    startShopIndex,
    startShopIndex + shopsPerPage
  );

  // Lấy tất cả sản phẩm
  const getProducts = async () => {
    try {
      let response = await privateAxios.get(`/products/get/admin`);

      setProducts(response.data);
      const groupedData = response.data.reduce(
        (acc: { [storeId: string]: Product[] }, cart: Product) => {
          if (!acc[cart.storeId]) {
            acc[cart.storeId] = [];
          }
          acc[cart.storeId].push(cart);
          return acc;
        },
        {}
      );
      setGroupedOrders(groupedData);
    } catch (error) {
      console.log(error);
    }
  };

  // Ẩn sản phẩm
  const handleLock = async (productId: string, storeId: string) => {
    try {
      let response = await axios.put(
        `http://localhost:8000/products/status/admin/lock`,
        {
          statusProduct: 2,
          productId: productId,
          storeId: storeId,
        }
      );
      if (response.status === 200) {
        notification.success({
          message: "Đã ẩn sản phẩm thành công!",
          placement: "top",
          duration: 2,
        });
        getProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Mở Ẩn sản phẩm
  const handleUnLock = async (productId: string, storeId: string) => {
    try {
      let response = await axios.put(
        `http://localhost:8000/products/status/admin/lock`,
        {
          statusProduct: 0,
          productId: productId,
          storeId: storeId,
        }
      );
      if (response.status === 200) {
        notification.success({
          message: "Đã mở sản phẩm thành công!",
          placement: "top",
          duration: 2,
        });
        getProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Search sản phẩm
  const handleSearch = async () => {
    try {
      let products = await axios.get(
        `http://localhost:8000/products/search/products?key=${search}`
      );
      const groupedData = products.data.reduce(
        (acc: { [storeId: string]: Product[] }, cart: Product) => {
          if (!acc[cart.storeId]) {
            acc[cart.storeId] = [];
          }
          acc[cart.storeId].push(cart);
          return acc;
        },
        {}
      );
      setGroupedOrders(groupedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <HeaderAdmin />
      <div className="userAdmin">
        <NavbarAdmin />
        <div className="container_right1">
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
              <div style={{ fontSize: 25 }}>{products?.length}</div>{" "}
              <ListAltIcon style={{ fontSize: 30, color: "red" }} />
            </div>
          </div>

          <div className="order_table">
            <div className="name_order3">Sản phẩm</div>
            <div className="sum_order1">Tên sản phẩm</div>
            <div className="active_order1">Trạng thái</div>
            <div className="active_order10">Hành động</div>
          </div>

          {visibleShops.map((storeId) => (
            <div className="order_table1" key={storeId}>
              <div className="order_name">
                <Avatar
                  src={groupedOrders[String(storeId)][0].avatarUrl}
                  className="avatarrr"
                  size={35}
                >
                  ĐN
                </Avatar>
                <p style={{ color: "black", cursor: "pointer" }}>
                  {groupedOrders[String(storeId)][0].storeName}
                </p>
              </div>
              {groupedOrders[String(storeId)].map((store: Product) => (
                <div
                  className="order_table2 products_table2"
                  key={store.productId}
                >
                  <div className="name_order3">
                    <img src={store.imageProduct} alt="123" width={70} />
                  </div>
                  <div className="sum_order1">{store.productName}</div>
                  {store.statusProduct === 0 ? (
                    <>
                      <div className="active_order1">
                        <p style={{ padding: 0, color: "rgb(38, 115, 221)" }}>
                          Đang hoạt động
                        </p>
                      </div>
                      <div className="active_order10 active_order11">
                        <p
                          onClick={() =>
                            handleLock(store.productId, store.storeId)
                          }
                        >
                          <LockOpenOutlinedIcon />
                        </p>
                      </div>
                    </>
                  ) : store.statusProduct === 1 ? (
                    <>
                      <div className="active_order1">
                        <p style={{ padding: 0, color: "rgb(38, 115, 221)" }}>
                          Ngừng hoạt động
                        </p>
                      </div>
                      <div className="active_order10 active_order11">
                        <p style={{ color: "gray" }}>Ẩn bởi Shop</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="active_order1">
                        <p style={{ padding: 0, color: "rgb(38, 115, 221)" }}>
                          Ngừng hoạt động
                        </p>
                      </div>
                      <div className="active_order10 active_order11">
                        <p
                          onClick={() =>
                            handleUnLock(store.productId, store.storeId)
                          }
                        >
                          <LockOutlinedIcon />
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
          <Pagination
            current={currentPage}
            pageSize={shopsPerPage}
            total={Object.keys(groupedOrders).length}
            onChange={handlePageChange}
            style={{ paddingBottom: 50, paddingTop: 20, marginLeft: "35%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsAdmin;
