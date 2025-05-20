import "./styles.css";
import { useEffect, useState } from "react";
import Table from "../../../Components/AdminComponents/Table/Table";
import { fetchAllProviders } from "../Services/AdminViewProvidersService/AdminViewProvidersService";

const AdminViewProviders = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const loadProviders = async () => {
      const data = await fetchAllProviders();
      setProviders(data);
    };

    loadProviders();
  }, []);

  const headers = [
    "Provider ID",
    "Full Name",
    "Email",
    "Phone Number",
    "Actions",
  ];

  return (
    <div className="admin-view-providers-container">
      <div className="admin-main-content">
        <h1 className="admin-main-content-title section-titles">
          View Providers
        </h1>
        <Table headers={headers} data={providers} />
      </div>
    </div>
  );
};

export default AdminViewProviders;
