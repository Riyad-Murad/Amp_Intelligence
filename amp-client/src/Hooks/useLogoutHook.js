import { toast } from "react-toastify";
import axiosInstance from "../Axios/axios";
import { useDispatch } from "react-redux";
import { persistor } from "../Redux/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/UserSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/logout");
      if (response.data.success === true) {
        localStorage.clear();
        await persistor.purge();
        dispatch(logout());
        navigate("/");
      } else {
        toast.error("Failed to Logout");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return handleLogout;
};
