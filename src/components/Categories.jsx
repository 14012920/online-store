import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  margin: 20px;
  justify-content:space-around ;
  align-items:center;
  ${mobile({ padding: "0px", flexDirection:"column" })}

`;
const Title = styled.h1`
    color:#9F2747;
    margin-bottom: 35px;
     margin-top: 35px;
    text-align:center;
    font-weight:400;
`;

const Categories = () => {
  return (
    <>
      <Title>{'SHOP BY BRAND'}</Title>
       <Container>
       
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
    </>
   
  );
};

export default Categories;
