import React from "react";
import "./alert.scss";
import { connect } from "react-redux";
import { motion } from "framer-motion";

const Alert = ({ alert }) => {
  return (
    <div className='alert-container'>
      {alert &&
        alert.length > 0 &&
        alert.map((alert) => (
          <motion.div
            initial={{ opacity: 0, x: "100vw" }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.5, duration: 0.5 },
            }}
            className={`alert ${alert.alertType}`}
          >
            {alert.msg}
          </motion.div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);
