import "./styles.css";

const ActionButton = ({ backgroundColor, color, text, width, onClick  }) => {
  const buttonStyle = {
    backgroundColor: backgroundColor || "#000000",
    color: color || "#FFFFFF",
    borderRadius: "6px",
    padding: "10px 20px",
    fontWeight: 500,
    fontSize: "20px",
    border: "none",
    cursor: "pointer",
    width: width || "auto",
  };

  return <button style={buttonStyle} onClick={onClick}>{text}</button>;
};

export default ActionButton;
