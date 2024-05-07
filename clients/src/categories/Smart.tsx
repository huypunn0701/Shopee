import "./Smart.css";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Card } from "antd";
const { Meta } = Card;
import { Rate } from "antd";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SlideSmart from "../slide/SlideSmart";

type Product = {
  productId: number;
  productName: string;
  price: number;
  description: string;
  quantity: number;
  categoryId: number;
  storeId: number;
  imageProduct: string;
  quantitySold: number;
};
const Smart = () => {
  const params = useParams();
  const categoryId = params.id;
  // Lấy dữ liệu của tất cả products
  const [products, setProducts] = useState([]);

  const handleProducts = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8000/categories/products/${categoryId}`
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleProducts();
  }, []);

  // Hàm chuyển đổi đơn vị tiền
  const formatCurrency = (value: any) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <div className="container">
      <Navbar />
      <SlideSmart />
      <>
        {/* container */}
        <div className="container3">
          <div className="grid wide">
            <div className="row sm-gutter container1">
              <div className="container_left">
                {/* category */}
                <nav className="category">
                  <div className="icon_1">
                    <FilterAltOutlinedIcon style={{ fontSize: 18 }} />
                    <h5 className="category-heading">Bộ lọc tìm kiếm</h5>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">Theo Danh Mục</div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Thiết bị mạng
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Chuột và bàn phím
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        USB
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Link kiện máy tính
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Wifi
                      </li>
                    </ul>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">Nơi Bán</div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Hà Nội
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Hồ Chí Minh
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Đà Nẵng
                      </li>
                    </ul>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">
                      Đơn Vị Vận Chuyển
                    </div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Hoả tốc
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Nhanh
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Tiết kiệm
                      </li>
                    </ul>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">Thương Hiệu</div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Kingston
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Sandisk
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Seagate
                      </li>
                    </ul>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">Khoảng Giá</div>
                    <div className="category-group-filter">
                      <input
                        type="number"
                        placeholder="đ TỪ"
                        className="category-group-filter-input"
                      />
                      <div className="toPrice"></div>
                      <input
                        type="number"
                        placeholder="đ ĐẾN"
                        className="category-group-filter-input"
                      />
                    </div>
                    <button className="btn btn--primary category-group-filter-btn">
                      ÁP DỤNG
                    </button>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">Loại Shop</div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Shoppee
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Shoppee Mail
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Shop yêu thích
                      </li>
                    </ul>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">Tình Trạng</div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Mới
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Đã sử dụng
                      </li>
                    </ul>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">
                      Các lựa chọn thanh toán
                    </div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        0% TRẢ GÓP
                      </li>
                    </ul>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">Đánh Giá</div>
                    <Rate allowHalf defaultValue={5} />
                    <Rate allowHalf defaultValue={4} /> trở lên
                    <Rate allowHalf defaultValue={3} /> trở lên
                    <Rate allowHalf defaultValue={2} /> trở lên
                    <Rate allowHalf defaultValue={1} /> trở lên
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">
                      Dịch Vụ &amp; Khuyến Mãi
                    </div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Voucher Xtra
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Đang giảm giá
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Gì cũng rẻ
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Miễn phí vận chuyển
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Hàng có sẵn
                      </li>
                    </ul>
                  </div>
                  <button className="btn btn--primary category-group-filter-btn category-group--margin">
                    XÓA TẤT CẢ
                  </button>
                </nav>
              </div>
              <div className="container_right">
                {/* home filter */}
                <div className="home-filter hide-on-mobile-tablet">
                  <div className="home-filter-control">
                    <p className="home-filter-title">Sắp xếp theo</p>
                    <button className="btn home-filter-btn">Mới nhất</button>
                    <button className="btn home-filter-btn">Bán chạy</button>
                    <div className="btn home-filter-sort">
                      <p className="home-filter-sort-btn">Giá</p>
                      <KeyboardArrowDownOutlinedIcon />
                      <ul className="home-filter-sort-list">
                        <li>
                          <button className="home-filter-sort-item-link">
                            Giá: Thấp đến cao
                          </button>
                        </li>
                        <li>
                          <button className="home-filter-sort-item-link">
                            Giá: Cao đến thấp
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* home product */}
                <div className="home-product">
                  <div id="list-product" className="row sm-gutter" />
                  <div id="list-product" className="row sm-gutter">
                    <div className=" home-product-item">
                      <div className="cart_today">
                        {products &&
                          products.map((product: Product, index) => (
                            <div key={index}>
                              <NavLink
                                to={`/chitiet/${product.productId}`}
                                style={{ textDecoration: "none" }}
                              >
                                <Card
                                  hoverable
                                  style={{ width: 220 }}
                                  cover={
                                    <img
                                      height={250}
                                      alt="example"
                                      src={product.imageProduct}
                                    />
                                  }
                                >
                                  <Meta
                                    title={product.productName}
                                    description={
                                      <div className="price__description">
                                        <div className="price__description1">
                                          {formatCurrency(product.price)}
                                        </div>
                                        <div className="price__description2">
                                          {" "}
                                          Đã bán {product.quantitySold}
                                        </div>
                                      </div>
                                    }
                                  />
                                </Card>
                              </NavLink>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <Footer />
    </div>
  );
};

export default Smart;
