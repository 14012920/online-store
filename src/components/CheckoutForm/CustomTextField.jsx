import React from "react";
import { TextField, Grid } from "@material-ui/core";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
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
function FormInput({ value, label, onChange }) {
  return (
    <Grid item xs={6} sm={6}>
      <Input
        type="email"
        name={label}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.value)}
      />
    </Grid>
  );
}

export default FormInput;
