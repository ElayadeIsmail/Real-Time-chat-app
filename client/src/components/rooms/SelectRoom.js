import React from "react";
import "./selectrooms.scss";
import { ReactComponent as DiscSvg } from "../../assets/discussion.svg";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

const SelectRoom = () => {
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const room = document.getElementById("room");
    history.push(`/room/${room.value}`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: "-100vh" }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 1 } }}
      className='select-room'
    >
      <DiscSvg className='svg' />
      <h1>
        Welcome To DevConnecter <i className='far fa-comments'></i>
      </h1>
      <h2>Choose The room That you want to join</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <select id='room' name='room'>
            <option value='JavaScript'>JavaScript</option>
            <option value='Python'>Python</option>
            <option value='PHP'>PHP</option>
            <option value='C'>C</option>
            <option value='Ruby'>Ruby</option>
            <option value='Java'>Java</option>
          </select>
          <button type='submit'>Join</button>
        </div>
      </form>
    </motion.div>
  );
};

export default SelectRoom;
