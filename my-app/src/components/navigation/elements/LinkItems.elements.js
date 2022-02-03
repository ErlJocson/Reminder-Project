import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0 10px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  position: relative;
  p {
    &:after {
      content: "";
      height: 2px;
      background-color: white;
      position: absolute;
      left: 0;
      bottom: 10px;
      right: 0;
      opacity: 0;
      transform: scaleX(0);
      transform-origin: left right;
      transition: all 500ms;
    }
  }
  &:hover {
    p:after {
      opacity: 1;
      transform: scaleX(1);
    }
  }
`;
