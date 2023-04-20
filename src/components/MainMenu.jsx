import styled from "styled-components";
import Stack from '@mui/material/Stack';
const Container = styled.div`
  height: 30px;
  background-color: #ffff;
  display: flex;
  align-items: center;
  justify-content: center;
  
  height:60px;
`;
const Item = styled.text`
font-weight:bold;
cursor:pointer;
font-size:16px;
color: #383032;
text-transform: uppercase

`

const MainMenu = () => {
    return <Container>
       <Stack direction="row" spacing={10}>
        <Item>Shop All</Item>
        <Item>Skin Care</Item>
            <Item>Hair</Item>
            <Item>Makeup</Item>
      </Stack>
  </Container>;
};

export default MainMenu;