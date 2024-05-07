import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const flaguserJSON = localStorage.getItem("user");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;

  return flaguser.statusUser === 1 ? <Outlet /> : <Navigate to="/dangnhap" />;
};

export default PrivateRouter;
