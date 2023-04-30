import React from "react";
import { Box, Center, Heading } from "@chakra-ui/react";
import Quiz from "../components/Quiz";
import economicsDataSet from "../data/economics";

const Economics: React.FC = () => {
  return <Box>
    <Center>
      <Heading>Economics Quiz</Heading>
    </Center>
    <Quiz data={economicsDataSet} />
  </Box>;
};

export default Economics;