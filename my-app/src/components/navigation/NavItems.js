import { StyledLink } from "./elements/LinkItems.elements";

function NavItems(props) {
  return (
    <>
      <StyledLink to="/">
        <p onClick={props.eventHandler}>All reminders</p>
      </StyledLink>
      <StyledLink to="/important-reminder">
        <p onClick={props.eventHandler}>Important reminder</p>
      </StyledLink>
      <StyledLink to="/add-reminder">
        <p onClick={props.eventHandler}>Add reminder</p>
      </StyledLink>
    </>
  );
}

export default NavItems;
