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
import Layout from "../Components/Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/Url";
import CardTweet from "../Components/CardLanding/CardTweet";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [tweet, setTweet] = useState([]);
  // console.log("1", tweet);
  const [tweetArea, setTweetArea] = useState("");

  const getTweetUser = async () => {
    try {
      const res = await axios.get(baseUrl + `/tweet/profile/${user.id}`);
      setTweet(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTweet = async () => {
    try {
      await axios.post("http://localhost:3000/tweet/add-tweet", {
        tweet: tweetArea,
        userId: user.id,
      });
      setTweetArea("");
      alert("Succes tweet");
    } catch (error) {
      console.log(error);
    } finally {
      getTweetUser();
    }
  };
  useEffect(() => {
    getTweetUser();
  }, []);
  return (
    <Layout>
      <Box w="full">
        <Image
          w="full"
          h="220px"
          src="https://images.unsplash.com/photo-1583813365826-eb578f8bd5a3?q=80&w=1509&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Box gap="4" px="4">
          <Avatar name={user.username} size="lg" mt="-10" />
          <Flex justifyContent="space-between">
            <Flex flexDir="column">
              <Text fontWeight="bold" fontSize="xx-large">
                @{user.username}
              </Text>
              <Text fontSize="18px">{user.email}</Text>
            </Flex>
            <Flex>
              <Button>Edit</Button>
            </Flex>
          </Flex>

          <Textarea
            onChange={(e) => setTweetArea(e.target.value)}
            maxLength={150}
            value={tweetArea}
            placeholder="Apa yang kamu pikirkan?"
          />
          <Flex justifyContent="end" my="4">
            <Button onClick={handleTweet} colorScheme="green">
              Share
            </Button>
          </Flex>
        </Box>
        <Box>
          {tweet.map((tweet) => {
            return (
              <CardTweet
                key={tweet.id}
                data={tweet}
                getDataTweet={getTweetUser}
              />
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
};

export default Profile;
