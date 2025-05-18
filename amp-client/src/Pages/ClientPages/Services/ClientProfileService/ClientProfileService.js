import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../Axios/axios";

const ClientProfileService = () => {
  const navigate = useNavigate();

  const updatePassword = async ({ password }) => {
    try {
      const response = await axiosInstance.post("/clients/editProfile", {
        password,
      });

      if (response.data.success) {
        toast.success("Password updated successfully.");
        setTimeout(() => navigate("/client/dashboard"), 1000);
      } else {
        toast.error(response.data.message || "Failed to update password.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return { updatePassword };
};

export default ClientProfileService;
