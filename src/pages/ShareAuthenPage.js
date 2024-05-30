import React, { Children } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: 600;
    font-size: 45px;
    margin-bottom: 60px;
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }
  .have-account {
    text-align: center;
    margin-bottom: 20px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }
`;

const ShareAuthenPage = ({ children }) => {
  return (
    <AuthenPageStyles>
      <div className="container">
        <NavLink to="/">
          <img srcSet="/logo.png 2x" alt="" className="logo" />
        </NavLink>
        <h1 className="heading">Monkey Blogging</h1>
        {children}
      </div>
    </AuthenPageStyles>
  );
};

export default ShareAuthenPage;
