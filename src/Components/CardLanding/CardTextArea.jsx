import { Avatar, Box, Button, Flex, Textarea, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const CardTextArea = ({ getDataTweet }) => {
  const idUser = useSelector((state) => state.user);

  const [tweetArea, setTweetArea] = useState("");

  const handleTweet = async () => {
    try {
      await axios.post("http://localhost:3000/tweet/add-tweet", {
        tweet: tweetArea,
        userId: idUser.id,
      });
      setTweetArea("");
      alert("Succes tweet");
    } catch (error) {
      console.log(error);
    } finally {
      getDataTweet();
    }
  };
  return (
    <Box my="4" p="4" shadow="base">
      <Flex gap="8" alignItems="center">
        <Avatar size="lg" name={idUser.username} />
        <Textarea
          onChange={(e) => setTweetArea(e.target.value)}
          placeholder="Apa yang kamu pikirkan?"
          maxLength={150}
          value={tweetArea}
          isDisabled={idUser.id ? false : true}
        />
      </Flex>
      <Flex justifyContent="end" mt={2}>
        <Text>{tweetArea.length}/150</Text>
      </Flex>

      <Flex justifyContent="end" mt={2}>
        <Button
          onClick={handleTweet}
          colorScheme="green"
          isDisabled={idUser.id ? false : true}
        >
          Share
        </Button>
      </Flex>
    </Box>
  );
};

export default CardTextArea;
