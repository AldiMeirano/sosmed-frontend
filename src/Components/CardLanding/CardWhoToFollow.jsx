import {
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  Stack,
  CardBody,
  Text,
  Avatar,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SlUserFollow } from "react-icons/sl";
import { baseUrl } from "../../utils/Url";
import { useSelector } from "react-redux";
const WhoFollow = () => {
  const idUser = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const getDataUsers = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/users");
      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataUsers();
  }, []);
  // const filteredUser = users.filter((user) => user.id !== idUser.id);
  // console.log("d", filteredUser);
  return (
    <>
      {idUser.id ? (
        <Flex py={4}>
          <Card bgColor="green.400">
            <CardHeader>
              <Heading size="md" color="white">
                Who to follow
              </Heading>
            </CardHeader>

            <CardBody>
              {users.map((i) => {
                return (
                  <Stack spacing="4" direction="row">
                    <Flex alignItems="center" gap="2">
                      <Avatar size="sm" name={i.username} my={2} />

                      <Heading fontSize="16px" color="white">
                        @{i.username}
                      </Heading>

                      <SlUserFollow />
                    </Flex>
                  </Stack>
                );
              })}
            </CardBody>
          </Card>
        </Flex>
      ) : null}
    </>
  );
};

export default WhoFollow;
