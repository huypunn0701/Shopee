import Navbar from "../header/Navbar";
import "./search.css";
import Footer from "../footer/Footer";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";

const { Meta } = Card;

type Product = {
  avatarURL: string;
  imageProduct: string;
  productId: number;
  productName: string;
  quantitySold: number;
  price: number;
};

const SearchProduct = () => {
  const location = useLocation();
  const [key, setKey] = useState<string | null>("");
  const handleGetKey = () => {
    const searchParams = new URLSearchParams(location.search);
    setKey(searchParams.get("key"));
  };

  useEffect(() => {
    handleGetKey();
  }, [location]);

  const [products, setProducts] = useState<Product[]>([]);
  const loadProducts = async () => {
    const response = await axios.get(
      `http://localhost:8000/products/search/find?key=${key}`
    );
    setProducts(response.data.products);
  };

  useEffect(() => {
    if (key) {
      loadProducts();
    }
  }, [key]);

  // Hàm chuyển đổi đơn vị tiền
  const formatCurrency = (value: any) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="products_search">
        <div className="products_search1">DANH SÁCH TÌM KIẾM</div>
        {products.length === 0 ? (
          <div>Không có sản phẩm nào trùng khớp!!!</div>
        ) : (
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
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchProduct;
