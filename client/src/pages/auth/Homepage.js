import React, { useState } from "react";
import "./homepage.scss";
import SignIn from "../../components/sign/SignIn";
import { Redirect } from "react-router-dom";
import { ReactComponent as AuthSvg } from "../../assets/auth.svg";
import SignUp from "../../components/sign/SignUp";
import { motion, AnimatePresence } from "framer-motion";
import { connect } from "react-redux";

const Homepage = ({ isAuthenticated }) => {
  const [account, setAccount] = useState(true);
  if (isAuthenticated) {
    return <Redirect to='/rooms' />;
  }
  return (
    <div className='home-page'>
      <motion.div
        initial={{ opacity: 0, y: "100vh" }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 1 } }}
        className='svg'
      >
        <AuthSvg />
      </motion.div>
      <div className='sign-container'>
        <AnimatePresence>
          {account ? (
            <SignIn setAccount={setAccount} />
          ) : (
            <SignUp setAccount={setAccount} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Homepage);
