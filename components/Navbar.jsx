import Link from "next/link";
import styled from "styled-components";
import UnstyledLink from './styled/UnstyledLink';
import { FiShoppingCart } from 'react-icons/fi'
import useCart from '../hooks/useCart';

const Nav = styled.nav`
  background: white;
  padding: 2rem;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  font-size: 2rem;
`;

const Logo = styled.a`
  color: #f11866;
  font-weight: 700;
  cursor: pointer;
`

const ShoppingCartIcon = styled(FiShoppingCart)`
  margin-right: 1rem;
  cursor: pointer;
`

const Navbar = () => {
  const { toggleCart } = useCart()
  const handleClick = () => {
    toggleCart();
  }


  return (
    <Nav>
      <NavContainer>
        <Link href="/">
          <Logo>SoopaShop</Logo>
        </Link>
        <ShoppingCartIcon onClick={handleClick}/>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
