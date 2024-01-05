import { Grid, GridItem } from "@chakra-ui/react";
import Layout from "../Components/Layout";
import CardTextArea from "../Components/CardLanding/CardTextArea";
import WhoFollow from "../Components/CardLanding/CardWhoToFollow";
import CardTweet from "../Components/CardLanding/CardTweet";
import axios from "axios";
import { baseUrl } from "../utils/Url";
import { useEffect, useState } from "react";

const Landing = () => {
  const [tweet, setTweet] = useState([]);
  console.log(tweet);
  const getDataTweet = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/tweet");

      setTweet(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataTweet();
  }, []);
  return (
    <Layout>
      <Grid w="full" templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem colSpan={4} w="100%" h="10">
          <CardTextArea getDataTweet={getDataTweet} />
          {tweet.map((tweet) => {
            return (
              <CardTweet
                key={tweet.id}
                data={tweet}
                getDataTweet={getDataTweet}
              />
            );
          })}
        </GridItem>
        <GridItem colSpan={1} w="100%" h="10">
          <WhoFollow />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Landing;
