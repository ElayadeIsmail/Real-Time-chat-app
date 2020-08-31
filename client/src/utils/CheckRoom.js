import { useHistory } from "react-router-dom";

const rooms = ["JavaScript", "Python", "PHP", "C", "Ruby", "Java"];

const CheckRoom = (room) => {
  const history = useHistory();
  const isValid = rooms.includes(room);
  if (!isValid) {
    history.push("/rooms");
  }
};

export default CheckRoom;
