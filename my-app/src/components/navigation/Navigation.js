import {
  Navigationbar,
  Nav,
  SideMenu,
  BurgerNav,
  StyledMenuIcon,
  MenuIconContainer,
  BurgerNavLinks,
  CloseMenu,
} from "./elements/Navigation.elements";
import NavItems from "./NavItems";
import { useState } from "react";
import { StyledLink } from "./elements/LinkItems.elements";
import axios from "axios";

function Navigation() {
  const [showBurgerNav, setShowBurgerNav] = useState(false);
  const [burgerButton, setBurgerButton] = useState(true);
  const token = window.sessionStorage.token;
  const showLinks = () => {
    setShowBurgerNav(!showBurgerNav);
    setBurgerButton(!burgerButton);
  };

  const handleDelete = () => {
    axios
      .post(
        "/removeAccount",
        { data: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
    window.sessionStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Navigationbar>
      {window.sessionStorage.token ? (
        <>
          <Nav>
            <NavItems />
          </Nav>
          <BurgerNav>
            <BurgerNavLinks>
              {showBurgerNav && (
                <NavItems
                  eventHandler={() => setShowBurgerNav(!showBurgerNav)}
                />
              )}
            </BurgerNavLinks>
            <MenuIconContainer>
              {burgerButton ? (
                <StyledMenuIcon onClick={showLinks} />
              ) : (
                <CloseMenu onClick={showLinks} />
              )}
            </MenuIconContainer>
          </BurgerNav>
        </>
      ) : (
        ""
      )}
      <SideMenu>
        {window.sessionStorage.token ? (
          <>
            <StyledLink
              to="#"
              onClick={() => {
                if (sessionStorage.token) {
                  window.sessionStorage.removeItem("token");
                  window.location.href = "/login";
                  alert("You have been logged out");
                }
              }}
            >
              <p>Logout</p>
            </StyledLink>
            <StyledLink to="#" onClick={handleDelete}>
              <p>Delete account</p>
            </StyledLink>
          </>
        ) : (
          <>
            <StyledLink to="/register">
              <p>Create account</p>
            </StyledLink>
            <StyledLink to="/login">
              <p>Login</p>
            </StyledLink>
          </>
        )}
      </SideMenu>
    </Navigationbar>
  );
}

export default Navigation;
