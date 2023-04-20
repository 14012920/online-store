import {
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
const Info = styled.div`
  opacity: 1;
  width: 100%;
  display: flex;
  align-items: center;
  height:30%;
  flex-direction:column;
  justify-content:space-evenly;
  
 
`;

const Container = styled.div`
  margin: 10px;
  width: 280px;
  max-width:280px;
  height: 380px;
  max-height:380px;
  display: flex;
  flex-direction:column;
  align-items: center;
  cursor: pointer;
  background-color: white;
`;

const Image = styled.img`
  height: 65%;
  max-height:65%;
  width:100%
`;
const Title = styled.p`
  font-size: 16px;
  color:black;
  font-weight: 500;
  letter-spacing: 3px;
  text-align:center;
  padding-left:8px;
  padding-right:8px;
`;
const Desc = styled.p`
  font-size: 16px;
  color:black;
  font-weight: 600;
  letter-spacing:1px;
`;
const MRP =  styled.p`
  font-size: 16px;
  color:#737574;
  font-weight: 400;
  letter-spacing: 0.5px;
  padding-right:2px;
`;
const OFF =  styled.p`
  font-size: 16px;
  color:#3cc781;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-left:10px;
`;
const PriceWrapper =styled.div`
    display: flex; 
    flex-direction:row;
     align-items: center;
  justify-content: center;
`;

const Product = ({ item }) => {
    return (
    
      <Link to={`/product/${item._id}`} style={{ textDecoration: 'none' }}>
        <Container>
          {item?<Image src={`${'http://localhost:4000/'}${item?.image}`} />: <Skeleton variant="rectangular" width={280} height={300} />}
          <Info>
            <Title>
             {item?.title}
            </Title>
            <PriceWrapper>
              <MRP>
                MRP:
              </MRP>
              <Desc>
                 ₹{item?.price}
              </Desc>
              <OFF>
                15% Off
              </OFF>
            </PriceWrapper>
            <Rating name="read-only" value={item.ratings} readOnly size="small" />
          </Info>
         
        </Container>
      </Link>
    );
  
};

export default Product;
