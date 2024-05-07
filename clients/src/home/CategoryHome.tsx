import { Card } from "antd";
import { NavLink } from "react-router-dom";

const gridStyle: React.CSSProperties = {
  width: "12.5%",
  textAlign: "center",
  height: "14em",
};
const CategoryHome = () => {
  return (
    <div className="category_home">
      <Card title="DANH MỤC">
        <Card.Grid style={gridStyle}>
          <NavLink to="/thoitrangnam/1" style={{ color: "black" }}>
            <img src="../assets/category/1.png" alt="" height={100} />
            Thời Trang Nam
          </NavLink>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NavLink to="/thoitrangnu/3" style={{ color: "black" }}>
            <img src="../assets/category/2.png" alt="" height={100} />
            Thời Trang Nữ
          </NavLink>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NavLink to="/phukiendienthoai/2" style={{ color: "black" }}>
            <img src="../assets/category/3.png" alt="" height={100} />
            Phụ Kiện & Điện Thoại
          </NavLink>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NavLink to="/mebe" style={{ color: "black" }}>
            <img src="../assets/category/4.png" alt="" height={100} /> <br />
            Mẹ & Bé
          </NavLink>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NavLink to="thietbidientu" style={{ color: "black" }}>
            <img src="../assets/category/5.png" alt="" height={100} />
            Thiết Bị Điện Tử
          </NavLink>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NavLink to="/nhacua" style={{ color: "black" }}>
            <img src="../assets/category/6.png" alt="" height={100} />
            Nhà Cửa & Đời Sống
          </NavLink>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NavLink to="/maytinh-laptop/5" style={{ color: "black" }}>
            <img src="../assets/category/7.png" alt="" height={100} />
            Máy Tính & Laptop
          </NavLink>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NavLink to="/sacdep" style={{ color: "black" }}>
            <img src="../assets/category/8.png" alt="" height={100} />
            Sắc Đẹp
          </NavLink>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NavLink to="mayanh" style={{ color: "black" }}>
            <img src="../assets/category/9.png" alt="" height={100} />
            Máy Ảnh & Máy Quay Phim
          </NavLink>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NavLink to="/suckhoe" style={{ color: "black" }}>
            <img src="../assets/category/10.png" alt="" height={100} />
            Sức Khỏe
          </NavLink>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NavLink to="/dongho" style={{ color: "black" }}>
            <img src="../assets/category/11.png" alt="" height={100} />
            Đồng Hồ
          </NavLink>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NavLink to="/giaydepnu" style={{ color: "black" }}>
            <img src="../assets/category/12.png" alt="" height={100} />
            Giày Dép Nữ
          </NavLink>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NavLink to="/giaydepnam" style={{ color: "black" }}>
            <img src="../assets/category/13.png" alt="" height={100} />
            Giày Dép Nam
          </NavLink>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NavLink to="tuivinu" style={{ color: "black" }}>
            <img src="../assets/category/14.png" alt="" height={100} /> <br />
            Túi Ví Nữ
          </NavLink>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NavLink to="thietbidien" style={{ color: "black" }}>
            <img src="../assets/category/15.png" alt="" height={100} />
            Thiết Bị Điện Gia Dụng
          </NavLink>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <NavLink to="/trangsucnu" style={{ color: "black" }}>
            <img src="../assets/category/16.png" alt="" height={100} />
            Phụ Kiện & Trang Sức Nữ
          </NavLink>
        </Card.Grid>
      </Card>
    </div>
  );
};

export default CategoryHome;
