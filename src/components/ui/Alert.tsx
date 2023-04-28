import styled from "styled-components";
interface AlertContainerOptions {
  type: "success" | "error";
  message?: string;
}
const AlertContainer = styled.div<AlertContainerOptions>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: ${({ type }) =>
    type === "success" ? "#c9ffd9" : "#ffbdbd"};
  color: ${({ type }) => (type === "success" ? "#4caf50" : "#f44336")};
  font-size: 1.2rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
`;

const Alert: React.FC<AlertContainerOptions> = ({ type, message }) => {
  return <AlertContainer type={type}>{message}</AlertContainer>;
};

export default Alert;
