import React, { useCallback } from "react";
import styled from "styled-components";
import Announcement from "../../../components/Announcement";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { mobile } from "../../../responsive";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useRazorpay from "react-razorpay";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stack from "@mui/material/Stack";
import Check from "@mui/icons-material/Check";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddressForm from "../AddressForm";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
const Container = styled.div``;

const Wrapper = styled.div`
  margin: 20px;
  display: flex;
  flex: 0.6;
  flex-direction: column;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  margin-left: 30px;
  margin-right: 30px;
  align-items: center;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  margin-left: 10px;
`;

const Product = styled.div`
  display: flex;
  width: 100%;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 4;
  display: flex;
`;

const Image = styled.img`
  width: 100px;
  height: 80px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 17px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: lightgray;
  border: none;
  height: 1px;
  width: 90%;
  align-self: center;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  font-size: 15px;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  padding: 15px;
  width: 100%;
  background-color: #9f2747;
  color: white;
  cursor: pointer;
  font-weight: 500;
  // &:hover{
  //     background-color: #f8f4f4;
  // }
`;

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: "rgb(233,64,87)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));
const Checkout = ({
  cartProducts,
  cartCount,
  onUpdateCartQty,
  onRemoveFromCart,
}) => {
  const steps = ["Bag", "Shipping", "Payment"];
  const Razorpay = useRazorpay();
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const address = {
    name: "pardeep Soni",
    hno: "1620vA",
    area: "Azad nagar",
    pincode: 125001,
    city: "hisar",
    state: "Haryana",
    mobile: 9939393933,
  };

  const saveOrder = (order_id) => {
    fetch("http://localhost:4000/api/order/saveOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: order_id,
        userId: user?._id,
        amount: 199,
        products: cart?.cartProducts,
        address: address,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        console.log("RES", res);
        if (res?.status === 200) {
          alert("Order placed Successfully", JSON.stringify(res?.data));
        }
      })
      .catch((error) => console.log(error));
  };
  const createOrder = async () => {
    const data = await fetch("http://localhost:4000/api/payment/razorpay", {
      method: "POST",
      body: JSON.stringify({
        amount: 499,
      }),
    })
      .then((t) => t.json())
      .catch((error) => console.log(error));
    return data;
  };
  const handlePayment = useCallback(async () => {
    const order = await createOrder();
    console.log("myorder", order);
    const options = {
      key: "rzp_test_U1odAZx2aIXLbD",
      amount: 499,
      currency: "INR",
      name: "GroomY",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: (res) => {
        console.log(res);
        if (res?.razorpay_order_id) {
          saveOrder(res?.razorpay_order_id);
        }
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <ShoppingBagIcon />,
      2: <EditLocationAltIcon />,
      3: <CurrencyRupeeIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>

        <Top>
          <Stack
            sx={{
              width: "50%",
              justifyContent: "center",
              flex: 0.5,
              alignSelf: "center",
            }}
            spacing={2}
          >
            <Stepper alternativeLabel activeStep={2}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
        </Top>
        <Bottom>
          <Info>
            <AddressForm />
            {/* <AddressForm /> */}
          </Info>

          <Summary>
            <SummaryTitle>Order Details</SummaryTitle>
            {cart &&
              cart?.cartProducts.map((item) => (
                <>
                  <Product>
                    <ProductDetail>
                      <Image
                        src={`${"http://localhost:4000/"}${item?.image}`}
                      />
                      <Details>
                        <ProductName>{item?.title}</ProductName>
                        <ProductPrice> {item?.price}</ProductPrice>
                        {/* <ProductColor color="gray" />
                  <ProductSize>
                    <b>Size:</b> M
                  </ProductSize> */}
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductName>{"Qty."}</ProductName>
                      <ProductAmountContainer>
                        <ProductAmount>{item?.currentQty}</ProductAmount>
                      </ProductAmountContainer>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </>
              ))}
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{cart && cart?.total}</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Discount</SummaryItemText>
              <SummaryItemPrice> ₹0 </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText> Have coupon?</SummaryItemText>
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue="Enter coupon code"
                size="small"
                variant="standard"
              />
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice> ₹{cart && cart?.total}</SummaryItemPrice>
            </SummaryItem>
            {/* <Link to={"/checkout"}> */}
            <Button onClick={handlePayment}>Pay Now</Button>
            {/* </Link> */}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Checkout;
