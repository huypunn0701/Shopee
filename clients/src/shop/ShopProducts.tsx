import "./shopproduct.css";
import HeaderOrder from "./HeaderOrder";
import ShopUser from "./ShopUser";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Pagination, notification } from "antd";

type Product = {
  productId: string;
  productName: string;
  price: number;
  description: string;
  quantity: number;
  categoryId: string;
  storeId: string;
  imageProduct: string;
  statusProduct: number;
};
const ShopProducts = () => {
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isRotating, setIsRotating] = useState(false);

  const showModal = (product: any) => {
    setSelectedProduct(product);
    setProductId(product.productId);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<any>([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productId, setProductId] = useState("");

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  // Lấy category
  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  // Lấy user trên local
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;

  // Lấy dữ liệu sản phẩm của 1 cửa hàng
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/products/${flagUser.userId}`
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Cập nhật lại thông tin sản phẩm
  const handleEdit = async () => {
    try {
      let response = await axios.put(
        `http://localhost:8000/products/${productId}`,
        {
          productName: productName || selectedProduct.productName,
          categoryId,
          description: description || selectedProduct.description,
          quantity: quantity || selectedProduct.quantity,
          price: price || selectedProduct.price,
        }
      );
      if (response.status === 200) {
        notification.success({
          message: "Cập nhật thông tin thành công!",
          placement: "top",
          duration: 2,
        });
      }
      setIsModalOpen(false);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // Ẩn sản phẩm
  const handleEditStatus = async (id: string) => {
    setIsRotating(true);
    try {
      let response = await axios.put(
        `http://localhost:8000/products/status/${id}`,
        { statusProduct: 1 }
      );

      if (response.status === 200) {
        notification.success({
          message: "Cập nhật trạng thái sản phẩm thành công!",
          placement: "top",
          duration: 2,
        });
      }
      getProducts();
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };

  // Mở ẩn sản phẩm
  const handleUnlockStatus = async (id: string) => {
    setIsRotating(true);
    try {
      let response = await axios.put(
        `http://localhost:8000/products/status/${id}`,
        { statusProduct: 0 }
      );

      if (response.status === 200) {
        notification.success({
          message: "Cập nhật trạng thái sản phẩm thành công!",
          placement: "top",
          duration: 2,
        });
      }
      getProducts();
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };

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
            <h2 style={{ color: "black" }}>{products.length} Sản phẩm</h2>
            <div className="order_header2">
              <p style={{ color: "rgb(38,115,221)", cursor: "pointer" }}>
                Tối ưu sản phẩm
              </p>
              <p className="order_header5">Công cụ Xử lý hàng loạt</p>
              <div className="icon__shop">
                <ListOutlinedIcon style={{ color: "#ee4d2d" }} />
                <TuneOutlinedIcon />
              </div>
            </div>
          </div>
          <div>
            <table className="tbShop">
              <thead>
                <th className="theadShop">Hình ảnh sản phẩm</th>
                <th className="theadShop">Tên sản phẩm</th>
                <th className="theadShop">Giá</th>
                <th className="theadShop">Kho</th>
                <th className="theadShop">Chức năng</th>
              </thead>
              <tbody>
                <tr>
                  {visibleProducts?.map((product: Product, index) => (
                    <>
                      {product.statusProduct === 0 ? (
                        <>
                          <td className="tdShop">
                            {" "}
                            <img src={product.imageProduct} alt="" width={80} />
                          </td>
                          <td className="tdShop">
                            {" "}
                            <p>{product.productName}</p>
                          </td>
                          <td className="tdShop">
                            {" "}
                            {formatCurrency(product.price)}
                          </td>
                          <td className="tdShop">{product.quantity}</td>
                          <td className="tdShop">
                            <Button
                              type="primary"
                              onClick={() => showModal(product)}
                            >
                              <CreateOutlinedIcon className="icon111" />
                            </Button>
                            <Button
                              type="primary"
                              onClick={() =>
                                handleEditStatus(product.productId)
                              }
                            >
                              <ChangeCircleIcon
                                className="icon111"
                                style={{
                                  border: "none",
                                  transform: isRotating
                                    ? "rotate(360deg)"
                                    : "none",
                                  transition: "transform 1s",
                                }}
                              />
                            </Button>
                          </td>
                        </>
                      ) : product.statusProduct === 2 ? (
                        <>
                          <td className="tdShop">
                            {" "}
                            <img src={product.imageProduct} alt="" width={80} />
                          </td>
                          <td className="tdShop">
                            {" "}
                            <p>{product.productName}</p>
                          </td>
                          <td className="tdShop">
                            {" "}
                            {formatCurrency(product.price)}
                          </td>
                          <td className="tdShop">{product.quantity}</td>
                          <td className="tdShop">
                            <LockOutlinedIcon className="icon111" />
                          </td>
                        </>
                      ) : (
                        <>
                          {" "}
                          <td className="tdShop">
                            {" "}
                            <img src={product.imageProduct} alt="" width={80} />
                          </td>
                          <td className="tdShop">
                            {" "}
                            <p>{product.productName}</p>
                          </td>
                          <td className="tdShop">
                            {" "}
                            {formatCurrency(product.price)}
                          </td>
                          <td className="tdShop">{product.quantity}</td>
                          <td className="tdShop">
                            <Button
                              type="primary"
                              onClick={() =>
                                handleUnlockStatus(product.productId)
                              }
                            >
                              <ChangeCircleIcon
                                className="icon111"
                                style={{
                                  border: "none",
                                  transform: isRotating
                                    ? "rotate(360deg)"
                                    : "none",
                                  transition: "transform 1s",
                                }}
                              />
                            </Button>
                          </td>
                        </>
                      )}
                    </>
                  ))}
                </tr>
              </tbody>
            </table>
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={products.length}
              onChange={handlePageChange}
              style={{ paddingBottom: 50, paddingTop: 20 }}
            />
          </div>
        </div>
      </div>

      {selectedProduct && (
        <Modal
          title="Cập Nhật Lại Sản Phẩm"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="add_products" style={{ paddingLeft: 10 }}>
            <table className="table">
              <tbody>
                <tr>
                  <td className="label">Hình ảnh sản phẩm</td>
                  <td className="label1">
                    <input
                      type="file"
                      style={{ border: "none", paddingTop: 10 }}
                      multiple
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Tên sản phẩm</td>
                  <td className="label1">
                    <input
                      type="text"
                      placeholder="Nhập vào"
                      value={productName || selectedProduct.productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Ngành hàng</td>
                  <td className="label1">
                    <select
                      className="label3"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Chọn ngành hàng</option>
                      {categories.map((category: any) => (
                        <option
                          value={category.categoryId}
                          key={category.categoryId}
                        >
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td className="label">Mô tả sản phẩm</td>
                  <td className="label1">
                    <textarea
                      value={description || selectedProduct.description}
                      className="textarea"
                      placeholder="Nhập mô tả"
                      name=""
                      id=""
                      cols={53}
                      rows={8}
                      style={{ resize: "none" }}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td className="label">Số lượng</td>
                  <td className="label1">
                    <input
                      type="number"
                      placeholder="Nhập số lượng"
                      value={quantity || selectedProduct.quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Giá sản phẩm</td>
                  <td className="label1">
                    <input
                      type="number"
                      placeholder="Nhập giá sản phẩm"
                      value={price || selectedProduct.price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label"></td>
                  <td className="label1">
                    <button onClick={handleEdit}>Cập nhật</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ShopProducts;
