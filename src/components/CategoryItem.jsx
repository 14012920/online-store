import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display:flex;
  align-items: center;
`;

const Image = styled.img`
  width:120px;
  height:120px;
  object-fit: contain;
  

`;

// const Info = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;
// ;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
    </Container>
  );
};

export default CategoryItem;
