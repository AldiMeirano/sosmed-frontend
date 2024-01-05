import {
  Box,
  Flex,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import React from "react";
const itemSidebar = [
  { name: "Rumah", url: "/" },
  { name: "Notifikasi", url: "/notifikasi" },
  { name: "Pesan", url: "/profil" },
  { name: "Profile", url: "/profile" },
];
const SideBar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <Box p={5}>
        <Text
          fontSize="30px"
          ref={btnRef}
          color="green"
          onClick={onOpen}
          cursor="pointer"
          textAlign="center"
        >
          <GiHamburgerMenu />
        </Text>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              {" "}
              <Text
                fontSize="26px"
                fontWeight="bold"
                color="green"
                // onClick={() => navigate("/")}
                cursor="pointer"
              >
                RanoX
              </Text>
            </DrawerHeader>

            <DrawerBody bgColor="green.500">
              <Box h="full">
                {itemSidebar.map((item, index) => {
                  return (
                    <Flex
                      key={index}
                      py="4"
                      cursor="pointer"
                      onClick={() => navigate(item.url)}
                      mx={3}
                    >
                      <Text fontSize="26px" color="white">
                        {item.name}
                      </Text>
                    </Flex>
                  );
                })}
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;
