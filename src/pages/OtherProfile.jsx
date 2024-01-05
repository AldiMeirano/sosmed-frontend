import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../utils/Url";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../Components/Layout";
import { formatDistance } from "date-fns";
const OtherProfile = () => {
  const params = useParams();
  const idUser = useSelector((state) => state.user.id);
  const navigate = useNavigate();

  const [tweet, setTweet] = useState([]);

  const [dataUser, setDataUser] = useState([]);

  const handleTweet = async () => {
    try {
      const res = await axios.get(baseUrl + `/tweet/profile/${params.id}`);
      setTweet(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDataUser = async () => {
    try {
      const res = await axios.get(baseUrl + `/users/${params.id}`);
      setDataUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleDataUser();
    handleTweet();
  }, []);
  useEffect(() => {
    if (params.id == idUser) {
      navigate("/profile");
    }
  }, [navigate, params.id, idUser]);

  return (
    <Layout>
      {" "}
      <Box w="full">
        <Image
          w="full"
          h="220px"
          src="https://images.unsplash.com/photo-1583813365826-eb578f8bd5a3?q=80&w=1509&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Box gap="4" px="4">
          <Avatar name="admin" size="lg" mt="-10" />
          <Flex justifyContent="space-between">
            <Flex flexDir="column">
              <Text fontWeight="bold" fontSize="xx-large">
                @{dataUser.username}
              </Text>
              <Text fontSize="18px">@{dataUser.email}</Text>
            </Flex>
          </Flex>
        </Box>
        {tweet.map((i) => {
          return (
            <Box px={4} shadow="sm" h="150px" mt={5}>
              <Flex
                gap={4}
                alignItems="center"
                mb={4}
                justifyContent="space-between"
              >
                <Flex gap={4} alignItems="center">
                  <Avatar />

                  <Text fontSize="18px" fontWeight="bold">
                    @{i.users.username}
                  </Text>
                  <Text>
                    {formatDistance(new Date(i.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </Text>
                </Flex>
              </Flex>
              <Text>{i.tweet}</Text>
            </Box>
          );
        })}
        ;
      </Box>
    </Layout>
  );
};

export default OtherProfile;
