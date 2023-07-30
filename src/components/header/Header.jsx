import React from "react";
import {HeaderStyles} from "./HeaderStyles";
import enstagramlogo from "../../assets/enstagramlogo.png";

const Header = () => {
  return (
    <HeaderStyles>
      <div className="header-container">
        <img src={enstagramlogo} className="app-logo" alt="app-logo" />
      </div>
    </HeaderStyles>
  );
};

export default Header;
