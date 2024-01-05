import { Container } from "@chakra-ui/react";
import SideBar from "./SideBar/SideBar";

const Layout = ({ children }) => {
  return (
    <Container maxW="7xl" display="flex">
      <SideBar />
      {children}
    </Container>
  );
};

export default Layout;
