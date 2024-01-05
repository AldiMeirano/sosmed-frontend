import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useStatStyles,
} from "@chakra-ui/react";
import axios from "axios";
import { formatDistance } from "date-fns";
import { AiOutlineEllipsis } from "react-icons/ai";
import { GrLike } from "react-icons/gr";
import { CgComment } from "react-icons/cg";
import { FaShare } from "react-icons/fa";
import { baseUrl } from "../../utils/Url";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const CardTweet = ({ data, getDataTweet }) => {
  console.log(data);
  const user = useSelector((state) => state.user);
  const [getTweet, setGetTweet] = useState(data.tweet);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log("ini ada", getTweet);
  const handleEdit = async () => {
    try {
      if (confirm("Apakah anda yakin mau merubah tweet") == true) {
        await axios.patch(baseUrl + `/tweet/${data.id}`, {
          tweet: getTweet,
        });
        onClose();
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    } finally {
      getDataTweet();
    }
  };

  const handleDelete = async () => {
    try {
      if (confirm("Apakah anda yakin hapus tweet?") === true) {
        await axios.delete(baseUrl + `/tweet/${data.id}`);
        onClose;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    } finally {
      getDataTweet();
    }
  };

  const date = formatDistance(new Date(data.createdAt), new Date(), {
    addSuffix: true,
  });

  return (
    <Box p={4} shadow="base" h="150px">
      <Flex gap={4} alignItems="center" mb={4} justifyContent="space-between">
        <Flex gap={4} alignItems="center">
          <Link to={`/profile/${data.users.id}`}>
            <Avatar name={data.users.username} />
          </Link>
          <Text fontSize="18px" fontWeight="bold">
            @{data.users.username}
          </Text>
          <Text>{date}</Text>
        </Flex>
        {user.id === data.userId ? (
          <Menu>
            <MenuButton color="black">
              <AiOutlineEllipsis />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onOpen}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </MenuList>
          </Menu>
        ) : null}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                onChange={(e) => setGetTweet(e.target.value)}
                value={getTweet}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={handleEdit}>
                Tweet
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Text>{data.tweet}</Text>
      <Flex justifyContent="center" gap={20}>
        <Text cursor="pointer">
          <GrLike />
        </Text>
        <Text cursor="pointer">
          <CgComment />
        </Text>
        <Text cursor="pointer">
          <FaShare />
        </Text>
      </Flex>
    </Box>
  );
};

export default CardTweet;
