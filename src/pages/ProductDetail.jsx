import React, { useCallback } from "react";
import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useParams } from "react-router-dom";
import { popularProducts } from "../data";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  height: 90vh;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 26px;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 200;
  font-size: 40px;
  padding-top: 30px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 15px;
  background-color: #9f2747;
  color: white;
  cursor: pointer;
  font-weight: 500;
  // &:hover{
  //     background-color: #f8f4f4;
  // }
`;

const ProductDetail = ({ cartCount }) => {
  const steps = ["cart", "Shipping address", "Payment details"];
  const { _id } = useParams();
  const [productInfo, setProductInfo] = useState({});
  const [currentQty, setCurrentQty] = useState(1);
  const dispatch = useDispatch();

  const productByid = () => {
    fetch(`http://localhost:4000/api/products/?productId=${_id}`)
      .then((res) => res.json())
      .then((itemDetail) => {
        console.log("itemmmm", itemDetail);
        setProductInfo(itemDetail[0]);
      })
      .catch((error) => {
        console.log("ERRRRRRRRRRRR@@@", error);
      });
  };
  useEffect(() => {
    productByid();
  }, [_id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...productInfo, currentQty }));
  };

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={`${"http://localhost:4000/"}${productInfo?.image}`} />
        </ImgContainer>
        <InfoContainer>
          <Title>{productInfo.title}</Title>
          <Typography variant="p" component="p">
            {productInfo.details}
          </Typography>
          <Price> ₹{productInfo.price}</Price>
          <FilterContainer>
            <Filter>
              <Title>Quantity - </Title>
              <Title>{productInfo.qty}</Title>
            </Filter>
            <Filter></Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                onClick={() => {
                  if (currentQty > 1) {
                    setCurrentQty(currentQty - 1);
                  }
                }}
              />
              <Amount>{currentQty}</Amount>
              <Add
                onClick={() => {
                  if (currentQty < productInfo.qty) {
                    setCurrentQty(currentQty + 1);
                  }
                }}
              />
            </AmountContainer>
          </AddContainer>
          <Button onClick={handleAddToCart}> ADD TO BAG</Button>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default ProductDetail;
