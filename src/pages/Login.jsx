/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "react-responsive-modal/styles.css";
import Box from "@mui/material/Box";
import { saveUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
const Wrapper = styled.div`
  width: 450px;
  margin: 10px;
  align-items: center;
  justify-content: center;
  height: 400px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;
const LinkInner = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const LoginButton = styled(Button)`
  height: 30px;
  width: 120px;
  align-items: center;
`;
const Input = styled.input`
  max-width: 100%;
  color: #2f2f2f;
  outline: 0;
  padding-bottom: 10px;
  padding-top: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 2px solid #a3a3a3;
  font-size: 14px;
  :focus {
    border-bottom: 2px solid #99ddcc;
  }
`;
const Login = ({ status, onCloseModal, openRegisterModal }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("S");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("test@gmail.com");
  const [mobile, setMobile] = useState("1234567890");
  const [name, setName] = useState("test1");
  const [password, setPassword] = useState("123456");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const login = () => {
    fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "S") {
          console.log("dattaa", res.data);
          dispatch(saveUser(res.data));
          onCloseModal();
        }
      })
      .catch((error) => {
        console.log("ERRRRRRRRRRRR@@@", error);
      });
  };

  const register = () => {
    fetch("http://localhost:4000/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        mobile: mobile,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("dattaa", data);
      })
      .catch((error) => {
        console.log("ERRRRRRRRRRRR@@@", error);
      });
  };
  return (
    <div>
      <Modal open={status} onClose={onCloseModal} center>
        <Wrapper>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="#2f2f2f"
            sx={{
              "&.Mui-selected": {
                outline: "none",
                background: "transparent",
              },
              "&:hover": {
                outline: "none",
                background: "transparent",
              },
            }}
            indicatorColor="#99ddcc"
            TabIndicatorProps={{
              style: { background: "#99ddcc", height: "2px", top: "35px" },
            }}
          >
            <Tab value="S" label="Sign in" />
            <Tab value="R" label="Register" />
          </Tabs>

          {value === "R" ? (
            <Box
              width={"90%"}
              flexDirection="column"
              display={"flex"}
              role="tabpanel"
              hidden={value === "S"}
            >
              <Input
                type="email"
                name="Enter your email id"
                placeholder="Enter your email id"
                value={email}
                onChange={(e) => setEmail(e.value)}
              />
              <Input
                type={"text"}
                name="Enter your mobile number"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.value)}
              />
              <Input
                type={"text"}
                name="Enter your name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.value)}
              />
              <Input
                type={"password"}
                name="Enter password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.value)}
              />
            </Box>
          ) : (
            <Box
              width={"90%"}
              flexDirection="column"
              display={"flex"}
              role="tabpanel"
              hidden={value === "S"}
            >
              <Input
                type="email"
                name="Enter your email id"
                placeholder="Enter your email id"
                value={email}
                onChange={(e) => setEmail(e.value)}
              />
              <Input
                type={"password"}
                name="Enter password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.value)}
              />
            </Box>
          )}
          {value == "S" ? (
            <Box marginTop={"10px"} justifyContent="center">
              <Button variant="contained" onClick={login}>
                {" "}
                Login
              </Button>
            </Box>
          ) : (
            <Box marginTop={"10px"} justifyContent="center">
              <Button variant="contained" onClick={register}>
                {" "}
                Register
              </Button>
            </Box>
          )}
        </Wrapper>
      </Modal>
    </div>
  );
};
export default Login;
