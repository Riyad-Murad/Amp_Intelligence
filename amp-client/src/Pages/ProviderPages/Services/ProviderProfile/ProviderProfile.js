import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../Axios/axios";

const ProviderProfileService = () => {
  const navigate = useNavigate();

  const updateProfile = async (formData) => {
    // Remove empty fields before sending to API
    const payload = Object.fromEntries(
      Object.entries(formData).filter(([_, val]) => val.trim() !== "")
    );

    if (Object.keys(payload).length === 0) {
      toast.error("Please fill at least one field to update.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/providers/editProfile",
        payload
      );

      if (response.data.success) {
        toast.success("Profile updated successfully.");
        setTimeout(() => navigate("/provider/dashboard"), 1000);
      } else {
        toast.error(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return { updateProfile };
};

export default ProviderProfileService;
