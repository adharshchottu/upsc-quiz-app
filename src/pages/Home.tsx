import React from "react";
import { Box, Button, Center, Flex, Heading, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return <Box m={3} minHeight={"50vh"}><Center><Heading>Select a Quiz</Heading></Center>
    <Stack direction='column' m={5}>
      <Wrap spacing={4} m={5}>
        <Link to={"/economics"}>
          <WrapItem>
            <Button colorScheme='gray'>Economics</Button>
          </WrapItem>
        </Link>
        <Link to={"/articles"}>
          <WrapItem>
            <Button colorScheme='red'>Articles</Button>
          </WrapItem>
        </Link>
        <Link to={"/geography"}>
          <WrapItem>
            <Button colorScheme='yellow'>Geogrpahy</Button>
          </WrapItem>
        </Link>
        <Link to={"/questions"}>
          <WrapItem>
            <Button colorScheme='orange'>Practice Questions</Button>
          </WrapItem>
        </Link>
        {/*  <Link to={"/environment"}>
          <WrapItem>
            <Button colorScheme='green'>Environment</Button>
          </WrapItem>
        </Link> */}
        {/* <WrapItem>
          <Button colorScheme='teal'>Teal</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme='blue'>Blue</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme='cyan'>Cyan</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme='purple'>Purple</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme='pink'>Pink</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme='linkedin'>Linkedin</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme='facebook'>Facebook</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme='messenger'>Messenger</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme='whatsapp'>Whatsapp</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme='twitter'>Twitter</Button>
        </WrapItem>
        <WrapItem>
          <Button colorScheme='telegram'>Telegram</Button>
        </WrapItem> */}
      </Wrap>
    </Stack>
    <Flex mt={32} justifyContent={"center"}>
      <Link to={"/questions"}>
        <Button colorScheme='facebook'>Add Questions to question bank</Button>
      </Link>
    </Flex>
  </Box >;
};

export default Home;