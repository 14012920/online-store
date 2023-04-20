import React, { useCallback } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
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
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
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
  justify-content: flex-start;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 2;
`;

const Product = styled.div`
  display: flex;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  width: 90%;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 3;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
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

const PriceDetail = styled.div``;

const ProductAmountContainer = styled.div`
  display: flex;
  width: 100px;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 20px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
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
const Cart = ({
  cartProducts,
  cartCount,
  onUpdateCartQty,
  onRemoveFromCart,
}) => {
  const steps = ["Bag", "Shipping", "Payment"];
  const Razorpay = useRazorpay();
  const cart = useSelector((state) => state.cart);
  const handleUpdateCartQty = (lineItemId, newQuantity) =>
    onUpdateCartQty(lineItemId, newQuantity);
  const handleRemoveFromCart = (lineItemId, qty) =>
    onRemoveFromCart(lineItemId, qty);

  const createOrder = async () => {
    const data = await fetch("http://localhost:4000/api/payment/razorpay", {
      method: "POST",
      body: JSON.stringify({ amount: 499 }),
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
            <Stepper alternativeLabel activeStep={1}>
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
                        <PriceDetail>
                          <ProductAmountContainer>
                            <IconButton
                              onClick={() =>
                                handleRemoveFromCart(item?.id, item?.quantity)
                              }
                            >
                              <RemoveIcon />
                            </IconButton>
                            <ProductAmount>{item?.currentQty}</ProductAmount>
                            <IconButton
                              onClick={() =>
                                handleUpdateCartQty(
                                  item?.id,
                                  item?.quantity + 1
                                )
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          </ProductAmountContainer>
                        </PriceDetail>
                      </Details>
                    </ProductDetail>
                  </Product>
                  {/* <Hr /> */}
                </>
              ))}
            {cart && cart?.cartProducts?.length < 1 && (
              <Title>YOUR BAG IS EMPTY PLEASE ADD SOME ITEMS</Title>
            )}
          </Info>

          <Summary>
            <SummaryTitle>Order Details</SummaryTitle>
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
            <Link to={"/checkout"}>
              <Button>CHECKOUT NOW</Button>
            </Link>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
