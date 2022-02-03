import styled from "styled-components";
import { IoMenu, IoClose } from "react-icons/io5";

export const Navigationbar = styled.div`
  height: 60px;
  background-color: rgb(40, 40, 43);
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-around;
`;

export const Nav = styled.nav`
  display: flex;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const SideMenu = styled.div`
  display: flex;
`;

export const StyledMenuIcon = styled(IoMenu)`
  color: white;
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

export const CloseMenu = styled(IoClose)`
  color: white;
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

export const MenuIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const BurgerNav = styled.div`
  display: none;
  @media screen and (max-width: 700px) {
    display: flex;
  }
`;

export const BurgerNavLinks = styled.div`
  z-index: 9;
  background-color: rgb(40, 40, 43);
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
`;
