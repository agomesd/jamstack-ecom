import styled from "styled-components";
import { FiX } from "react-icons/fi";
import useCart from "../hooks/useCart";
import { useRouter } from "next/router";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background: #fff;
  width: 300px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
  transition: transform 0.2s ease-in;
`;

const CloseIcon = styled(FiX)`
  font-size: 3rem;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 1rem 2rem;
`;

const XContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  border-bottom: 1px solid #efefef;
`;

const Item = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 0.25rem;
`;

const List = styled.ul`
  padding: 0;
`;

const Total = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Button = styled.button`
  background: #f11866;
  font-size: 2rem;
  color: inherit;
  outline: none;
  border: none;
  width: 100%;
  padding: 1rem;
  color: #fff;
  cursor: pointer;
`;

const Cart = () => {
  const { cart, toggleCart, isOpen, total } = useCart();
  const router = useRouter();

  const handleClick = () => {
    toggleCart();
  };

  const navigateToCheckout = () => {
    router.push("/checkout");
    toggleCart();
  };

  return (
    <Container isOpen={isOpen}>
      <XContainer>
        <CloseIcon onClick={handleClick} />
      </XContainer>
      <Content>
        <Title>Cart</Title>
        {cart.length > 0 ? (
          <>
            <List>
              {cart.map((item) => {
                return (
                  <Item key={item.id}>
                    <span>
                      {item.qty} x {item.name}
                    </span>
                    <span>£{item.price / 100}</span>
                  </Item>
                );
              })}
            </List>
            <Total>
              <span>Total</span>
              <span>£{total / 100}</span>
            </Total>
            <Button onClick={navigateToCheckout}>Check Out</Button>
          </>
        ) : (
          <p>Cart is empty.</p>
        )}
      </Content>
    </Container>
  );
};

export default Cart;