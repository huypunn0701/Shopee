import "./shopproduct.css";
import HeaderOrder from "./HeaderOrder";
import ShopUser from "./ShopUser";
import axios from "axios";
import { useEffect, useState } from "react";
import { notification } from "antd";

type category = {
  categoryId: number;
  categoryName: string;
};

const AddProducts = () => {
  const [category, setCategory] = useState([]);
  const [images, setImages] = useState<File[]>([]);
  const [productName, setNameProduct] = useState("");
  const [categoryId, setCategories] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stores, setStores] = useState(Number);

  // Lấy dữ liệu user lưu trên local
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;

  // Lấy dữ liệu bảng categories
  const getCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8000/categories");
      setCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    handleStore();
  }, [stores]);

  // Lấy dữ liệu bảng stores về
  const handleStore = async () => {
    try {
      let data = await axios.get(
        `http://localhost:8000/stores/${flagUser.userId}`
      );
      setStores(data.data[0].storeId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageChange = async (event: any) => {
    const files = event.target.files;
    setImages(files);
  };

  // Thêm dữ liệu vào bảng products
  const handlePost = async () => {
    let storeId: number = stores;
    try {
      if (images && images.length > 0) {
        const imageUrls: string[] = [];
        const formDataMain = new FormData(); // Tạo instance mới của FormData

        // Thêm vào bảng products
        formDataMain.append("file", images[0]);
        formDataMain.append("upload_preset", "shopee");
        const response1 = await axios.post(
          "https://api.cloudinary.com/v1_1/dqirycujn/image/upload",
          formDataMain
        );
        const imageProductUrl = response1.data.secure_url;

        const productResponse = await axios.post(
          "http://localhost:8000/products",
          {
            productName,
            categoryId,
            description,
            price,
            quantity,
            storeId,
            imageProduct: imageProductUrl,
          }
        );

        if (productResponse.status === 200) {
          notification.success({
            message: "Thêm sản phẩm mới thành công!",
            placement: "top",
            duration: 2,
          });
          setDescription("");
          setNameProduct("");
          setQuantity("");
          setPrice("");
          setCategories("");
        }

        const productId = productResponse.data.product.productId;
        const formDataDetails = new FormData();

        // Thêm vào bảng images
        for (let i = 0; i < images.length; i++) {
          formDataDetails.delete("file");
          formDataDetails.append("file", images[i]);
          formDataDetails.append("upload_preset", "shopee");

          try {
            const imageUploadResponse = await axios.post(
              "https://api.cloudinary.com/v1_1/dqirycujn/image/upload",
              formDataDetails
            );
            const imageUrl = imageUploadResponse.data.secure_url;
            imageUrls.push(imageUrl);
          } catch (error) {
            notification.error({
              message: "Thêm ảnh thất bại",
              placement: "top",
              duration: 2,
            });
          }
        }

        const postPromises = imageUrls.map(async (imageUrl) => {
          try {
            await axios.post("http://localhost:8000/images", {
              productId,
              imageUrl,
            });
          } catch (error) {
            console.log(error);
          }
        });

        try {
          await Promise.all(postPromises);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <HeaderOrder />
      <div className="container_shop">
        <ShopUser />
        <div className="container_right2">
          <h3>Thông tin cơ bản</h3>
          <div className="add_products">
            <table className="table">
              <tbody>
                <tr>
                  <td className="label">Hình ảnh sản phẩm</td>
                  <td className="label1">
                    <input
                      id="chonanh"
                      type="file"
                      style={{ border: "none", paddingTop: 10 }}
                      multiple
                      onChange={handleImageChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Tên sản phẩm</td>
                  <td className="label1">
                    <input
                      type="text"
                      placeholder="Nhập vào"
                      value={productName}
                      onChange={(e) => setNameProduct(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Ngành hàng</td>
                  <td className="label1">
                    <select
                      className="label3"
                      value={categoryId}
                      onChange={(e) => setCategories(e.target.value)}
                    >
                      <option value="">Chọn ngành hàng</option>
                      {category &&
                        category.map((categoryItem: category) => (
                          <option
                            value={categoryItem.categoryId}
                            key={categoryItem.categoryId}
                          >
                            {categoryItem.categoryName}
                          </option>
                        ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="label">Mô tả sản phẩm</td>
                  <td className="label1">
                    <textarea
                      className="textarea"
                      placeholder="Nhập mô tả"
                      name=""
                      id=""
                      cols={53}
                      rows={8}
                      style={{ resize: "none" }}
                      value={description}
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
                      value={quantity}
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
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label"></td>
                  <td className="label1">
                    <button onClick={handlePost}>Lưu & hiển thị</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
