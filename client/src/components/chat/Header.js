import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../redux/auth/actions";
import { connect } from "react-redux";

const Header = ({ logout }) => {
  return (
    <div className='chat-header'>
      <h1>
        <i className='fas fa-code'></i> DevConnector
      </h1>
      <div className='btns'>
        <Link to='/rooms' className='btn'>
          Leave Room
        </Link>
        <button onClick={() => logout()} className='btn'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default connect(null, { logout })(Header);
