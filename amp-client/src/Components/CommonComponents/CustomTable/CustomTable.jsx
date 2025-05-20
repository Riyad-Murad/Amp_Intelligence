// src/Components/CommonComponents/CustomTable/CustomTable.jsx
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const CustomTable = ({ headers, data }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((user, idx) => (
          <tr key={idx}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone_number}</td>
            <td>
              <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
