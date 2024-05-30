import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const InforUser = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Đăng xuất thành công");
    navigate("/login");
  };
  return (
    <div className="absolute bottom-[-110px] -right-5 z-20 shadow-xl flex flex-col bg-[#f1f2f3] w-[200px] px-5 py-2 rounded">
      <div className="flex flex-col font-semibold cursor-pointer gap-y-2">
        <div
          className="w-max hover:text-[#80bd96] transition-all"
          onClick={() => navigate("/user/change-infor")}
        >
          Thông tin cá nhân
        </div>
        <div
          className="w-max hover:text-[#80bd96] transition-all"
          onClick={() => navigate("/user/change-password")}
        >
          Đổi mật khẩu
        </div>
        <div
          className="w-max hover:text-[#80bd96] transition-all"
          onClick={() => navigate("/user/history-order")}
        >
          Lịch sử mua hàng
        </div>
        <div
          className="w-max hover:text-[#80bd96] transition-all"
          onClick={handleLogout}
        >
          Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default InforUser;
