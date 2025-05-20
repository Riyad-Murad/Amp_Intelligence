import "./styles.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomTable from "../../../Components/CommonComponents/CustomTable/CustomTable";
import ProviderUsersService from "../Services/ProviderUsersService/ProviderUsersService";

const ProviderUsers = () => {
  const [users, setUsers] = useState([]);
  const userId = useSelector((state) => state.user.id);
  const { getAllUsers } = ProviderUsersService();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetched = await getAllUsers(userId);
      setUsers(Array.isArray(fetched) ? fetched : []);
    };
    fetchUsers();
  }, [userId]);

  const tableHeaders = ["Full Name", "Email", "Phone Number", "Actions"];

  return (
    <div className="provider-users-container">
      <div className="main-content">
        <h1 className="main-content-title section-titles">Users</h1>
        <CustomTable headers={tableHeaders} data={users} />
      </div>
    </div>
  );
};

export default ProviderUsers;
