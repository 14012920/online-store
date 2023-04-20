import React, { useState, useEffect } from "react";
import Announcement from "../components/Announcement";
import MainMenu from "../components/MainMenu";
import Categories from "../components/Categories";
import Footer from "../components/Footer";

import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import Login from "./Login";
import Register from "./Register";
import styled from "styled-components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { logOut } from "../redux/userSlice";
import { resetCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
const Container = styled.div`
  background-color: #fcf5f5;
`;
const Home = ({
  products,
  loginStatus,
  setStatus,
  setIsShowProfileMenu,
  setSignupStatus,
  signupStatus,
  handleClose,
  open,
  isShowProfileMenu,
  openRegisterModal,
  onOpenModal,
}) => {
  const dispatch = useDispatch();

  const onCloseModal = (type) => {
    console.log("TYPE", type);
    if (type === "LOGIN") {
      setStatus(false);
    } else {
      setSignupStatus(false);
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(resetCart());
    setIsShowProfileMenu(null);
  };
  return (
    <Container>
      <Menu
        id="basic-menu"
        anchorEl={isShowProfileMenu}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose(null)}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <MainMenu />

      <Slider />
      <Products products={products} />
      <Categories />
      <Newsletter />
      <Footer />
      <Login
        status={loginStatus}
        onCloseModal={() => onCloseModal("LOGIN")}
        openRegisterModal={openRegisterModal}
      />
      <Register
        status={signupStatus}
        onCloseModal={() => onCloseModal("SIGNUP")}
        onOpenModal={onOpenModal}
      />
    </Container>
  );
};

export default Home;
