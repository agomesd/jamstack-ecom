import { Normalize } from "styled-normalize";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import CartProvider from "../context/Cart";
import Cart from "../components/Cart";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap");
  background: linear-gradient(to right, #ee0979, #ff6a00);
  font-family: "Oswald", sans-serif;
  color: #444;
  min-height: 100vh;
`;

const Page = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
`;

const MyApp = ({ Component, pageProps }) => {
  return (
    <CartProvider>
      <Container>
        <Normalize />
        <Navbar />
        <Page>
          <Component {...pageProps} />
        </Page>
        <ToastContainer
          position={"bottom-right"}
          autoClose={2000}
          pauseOnHover={false}
        />
        <Cart />
      </Container>
    </CartProvider>
  );
};

export default MyApp;
