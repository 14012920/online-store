import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Title = styled.h1`
    color:#9F2747;
    margin-bottom: 30px;
     margin-top: 30px;
    text-align:center;
    font-weight:400
`;
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
const Products = ({ products }) => {
  return (
    <>
       <Title>{'NEW ARRIVALS'}</Title>
    <Carousel
      autoPlay={false}
        swipeable={false}
        draggable={false}
        responsive={responsive}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
       itemClass="carousel-item-padding-40-px"
    >
     
 {products.map((item) => ( 
          <Product item={item} key={item.id} /> 
      ))}
    
     
         </Carousel>
   </>
       
  );
};

export default Products;
