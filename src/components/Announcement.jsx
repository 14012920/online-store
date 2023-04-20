import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color:#2e3642;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container> 10% off on all Premium Grooming Products & Services for Men & Women</Container>;
};

export default Announcement;
