import { NextSeo } from "next-seo";
import { useEffect } from "react";
import Page from "../components/styled/Page";
import useCart from "../hooks/useCart";

const Success = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Page>
      <NextSeo title="Sucessfull" description="Payment successful page" />
      <h2>Payment Successfull!</h2>
      <p>Thank you for your purchase!</p>
    </Page>
  );
};

export default Success;
