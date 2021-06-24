import { NextSeo } from "next-seo";
import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import styled from "styled-components";
import UnstyledLink from "../components/styled/UnstyledLink";
import useCart from "../hooks/useCart";

const Container = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.3);
  padding: 1rem 2rem;
  min-height: 200px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;

const Button = styled.button`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background-color: #444;
  padding: 0.5rem 1rem;
  border: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #f11866;
  }
`

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  margin: 0.5rem 0;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  };
`;

const Price = styled.p`
  margin: 0;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 2.5rem;
`;

const renderProduct = (product, addItemToCart) => {
  const handleClick = (e) => {
    e.stopPropagation();
    addItemToCart(product);
  };

  return (
    <Link href={product.slug} key={product.id}>
      <UnstyledLink>
        <Container>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <Button onClick={handleClick}>Add to Cart</Button>
          <Price>£{product.price / 100}</Price>
        </Container>
      </UnstyledLink>
    </Link>
  );
};

const HomePage = (props) => {
  const { cart, addItemToCart, removeItemFromCart } = useCart();
  return (
    <>
      <NextSeo
        title="SoopaShop"
        description="E-commerce website built by Alex Gomes"
      />
      <ProductsContainer>
        {props.products.map((product) => renderProduct(product, addItemToCart))}
      </ProductsContainer>
    </>
  );
};

export const getStaticProps = async () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);

  const products = filenames.map((filename) => {
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();

    const { data } = matter(fileContent);
    const slug = `/products/${filename.replace(".md", "")}`;
    const product = {
      ...data,
      slug,
    };

    return product;
  });

  return {
    props: {
      products,
    },
  };
};

export default HomePage;
