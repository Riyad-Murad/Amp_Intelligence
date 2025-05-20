import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Table = ({ headers, data }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone_number}</td>
            <td>{item.message}</td>
            <td>
              <FontAwesomeIcon icon={faPenToSquare} className="admin-edit-icon" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
