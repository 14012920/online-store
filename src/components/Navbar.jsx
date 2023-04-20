import React, { useState } from "react";
import { Badge, Typography, Box } from "@material-ui/core";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import CloseIcon from "@mui/icons-material/Close";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import APPLogo from "../assets/logo.png";
const Container = styled.div`
  height: 60px;
  background-color: #ffff;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const CloseButtonWrapper = styled.div`
  padding-top: 20px;
  padding-left: 20px;
`;

const MenuButtonWrapper = styled.div`
  margin-right: 10px;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.img`
  height: 50px;
  width: 100px;
  resize-mode: contain;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItems = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: #2f2f2f;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = ({
  onOpenModal,
  toggleDrawer,
  isOpenSideDrawer,
  handleClick,
  handleClose,
  isShowProfileMenu,
}) => {
  const { cartCount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  console.log("user", user);
  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <MenuButtonWrapper>
              <IconButton onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            </MenuButtonWrapper>

            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Logo src={APPLogo} />
            </Link>
          </Left>
          <Center>
            {/* <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
          </Center>
          <Right>
            {user ? (
              <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                {user?.name}
              </Typography>
            ) : null}
            <MenuItems onClick={onOpenModal}>
              <AccountCircleRoundedIcon />
            </MenuItems>

            <Link to={"/cart"}>
              <MenuItems>
                <ShoppingBagOutlinedIcon />
                {cartCount > 0 && (
                  <Badge badgeContent={cartCount.toString()} color="error" />
                )}
              </MenuItems>
            </Link>
          </Right>
        </Wrapper>
      </Container>
      <SwipeableDrawer
        anchor={"left"}
        open={isOpenSideDrawer}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <div
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <Box sx={{ width: "350px", height: "100vh" }}>
            <CloseButtonWrapper>
              <IconButton onClick={toggleDrawer}>
                <CloseIcon />
              </IconButton>
            </CloseButtonWrapper>

            <Box
              sx={{
                width: "300px",
                height: "100px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography>Hi {user?.name} !!</Typography>
              <Button variant="text" color="info">
                Logout
              </Button>
            </Box>
            <Divider />

            <List width="100%" sx={{ width: "100%" }}>
              {["My Orders", "Contact Us", "Offers"].map((text, index) => (
                <>
                  <ListItem button key={text}>
                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                    <ListItemText primary={text} />
                  </ListItem>
                </>
              ))}
            </List>
          </Box>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default Navbar;
