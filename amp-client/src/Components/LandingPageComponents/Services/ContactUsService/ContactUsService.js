// ContactUsService.js
import axiosInstance from "../../../../Axios/axios";

const sendContactMessage = async (contactData) => {
  try {
    const response = await axiosInstance.post("/insertMessage", contactData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error sending contact message:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to send message",
    };
  }
};

export default sendContactMessage;

