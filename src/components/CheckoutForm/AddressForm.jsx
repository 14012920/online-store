import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FormInput from "./CustomTextField";

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;
const AddressForm = ({}) => {
  const [shippingCountries, setShippingCountries] = useState({});
  const [shippingCountry, setShippingCountry] = useState("india");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>

      <Grid container spacing={3}>
        <FormInput required name="firstName" label="First name" />
        <FormInput required name="lastName" label="Last name" />
        <FormInput required name="address1" label="Address line 1" />
        <FormInput required name="email" label="Email" />
        <FormInput required name="city" label="City" />
        <FormInput required name="zip" label="Zip / Postal code" />
        <Grid item xs={12} sm={6}>
          <InputLabel>Shipping Country</InputLabel>
          <InputLabel>{"INDIA"}</InputLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Shipping Subdivision</InputLabel>
          {/* <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Shipping Options</InputLabel>
          {/* <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select> */}
        </Grid>
      </Grid>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button component={Link} variant="outlined" to="/cart">
          Back to Cart
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </div>
    </>
  );
};

export default AddressForm;
