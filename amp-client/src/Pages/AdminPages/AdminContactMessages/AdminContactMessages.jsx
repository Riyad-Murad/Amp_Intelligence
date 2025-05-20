import "./styles.css";
import { useEffect, useState } from "react";
import Table from "../../../Components/AdminComponents/Table/Table";
import { fetchContactMessages } from "../Services/AdminContactMessagesService/AdminContactMessagesService";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchContactMessages();
      setMessages(data);
    };

    loadMessages();
  }, []);

  const headers = ["Full Name", "Email", "Phone Number", "Message", "Actions"];

  return (
    <div className="admin-contact-messages-container">
      <div className="admin-main-content">
        <h1 className="admin-main-content-title section-titles">
          Contact Messages
        </h1>
        <Table headers={headers} data={messages} />
      </div>
    </div>
  );
};

export default AdminContactMessages;
