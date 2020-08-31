import React from "react";
import { ReactComponent as RoomSvg } from "../../assets/rooms.svg";
import "../auth/homepage.scss";
import SelectRoom from "../../components/rooms/SelectRoom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className='home-page'>
      <motion.div
        initial={{ opacity: 0, y: "100vh" }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 1 } }}
        className='svg'
      >
        <RoomSvg />
      </motion.div>
      <div className='sign-container'>
        <SelectRoom />
      </div>
    </div>
  );
};

export default Home;
