import { useState } from "react";
import { NextSeo } from "next-seo";
import Page from "../components/styled/Page";
import useCart from "../hooks/useCart";
import styled from "styled-components";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Item = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 1rem;
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
  border: 1px solid #fff;
`;

const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Checkout = () => {
  const { cart, total } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);

  const processPayment = async () => {
    const url = "/.netlify/functions/charge-card";
    const newCart = cart.map(({ id, qty }) => ({
      id,
      qty,
    }));

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const { data } = await axios.post(url, { newCart });
    console.log(data);
    console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <Page>
      <NextSeo title="Checkout" description="SoopaShop checkout page" />
      <h2>Checkout</h2>
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
          <Button onClick={() => setIsCheckout(true)}>Process Payment</Button>
          {isCheckout && (
            <ConfirmContainer>
              <p>
                Disclaimer! £5 will be charged for every item unit and you will not
                receive the item itself! These are just fictional products for
                the purpose of the app however the money will be a donation and
                much appreciated! Thank you :).
              </p>
              <ButtonContainer>
                <Button onClick={processPayment}>Confirm</Button>
                <Button onClick={() => setIsCheckout(false)}>Cancel</Button>
              </ButtonContainer>
            </ConfirmContainer>
          )}
        </>
      ) : (
        <p>You do not appear to have any items in your cart!</p>
      )}
    </Page>
  );
};

export default Checkout;
