import React, { useState } from 'react';
import styled from "styled-components";
import { mobile } from "../responsive";
import { Modal } from 'react-responsive-modal';
import PhoneInput from 'react-phone-number-input/input'
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
 width:300px;
  padding: 10px;
  align-items:center;
  justify-content:center;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const LinkInner = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  margin-top:10px
`;

const Register = ({status,onCloseModal,onOpenModal}) => {
  const [value, setValue] = useState(null)
  return (
    <Modal open={status} onClose={onCloseModal} center>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="Your Name*" />
          {/* <PhoneInput
      // style={...}
      defaultCountry="IN"
      value={value}
      onChange={setValue} /> */}

          <Input placeholder="email" />
          <Input placeholder="password" />
          <Input placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
           <LinkInner onClick={onOpenModal}>HAVE ACCOUNT? LOGIN</LinkInner>
        </Form>
      </Wrapper>
    </Modal>
  );
};

export default Register;
