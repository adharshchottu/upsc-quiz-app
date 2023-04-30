import React from "react";
import { Box, Center, Heading } from "@chakra-ui/react";
import Quiz from "../components/Quiz";
import historyDataSet from "../data/history";

const History: React.FC = () => {
  return <Box>
    <Center>
      <Heading>History Quiz</Heading>
    </Center>
    <Quiz data={historyDataSet} />
  </Box>;
};

export default History;