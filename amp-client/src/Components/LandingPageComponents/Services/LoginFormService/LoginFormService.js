import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../Axios/axios";
import { storeData } from "../../../../Redux/Slices/UserSlice";
import { toggleLoad } from "../../../../Redux/Slices/loadingSlice";

const useLoginFormService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      dispatch(toggleLoad(true));

      const response = await axiosInstance.post("/login", { email, password });
      const userData = response.data.data;

      localStorage.setItem("Token", userData.token);
      dispatch(storeData(userData));

      const userType = userData.user_type;

      switch (userType) {
        case "Client":
          toast.success("Hello Client");
          navigate("/client/dashboard");
          break;
        case "Provider":
          toast.success("Hello Provider");
          navigate("/provider/dashboard");
          break;
        case "Admin":
          toast.success("Hello Admin");
          navigate("/admin/navigation-page");
          break;
        default:
          toast.warn("Unknown user type.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      dispatch(toggleLoad(false));
    }
  };

  return { handleLogin };
};

export default useLoginFormService;
