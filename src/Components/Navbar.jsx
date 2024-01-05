import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../redux/slices/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("rano_tweet");
    dispatch(logoutAction());
    navigate("/login");
  };
  const user = useSelector((state) => state.user);
  return (
    <>
      <Box shadow="md" bg="white.200">
        <Container
          maxW="7xl"
          py="4"
          display="flex"
          justifyContent="space-between"
        >
          <Text
            fontSize="26px"
            fontWeight="bold"
            color="green"
            onClick={() => navigate("/")}
            cursor="pointer"
          >
            RanoX
          </Text>
          {user.id ? (
            <Menu>
              <MenuButton colorScheme="teal" variant="outline">
                @{user.username}
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <ButtonGroup spacing="6">
              <Button colorScheme="green" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button
                variant="outline"
                colorScheme="green"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </ButtonGroup>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
