import React, { useEffect, useState } from "react";
import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import Quiz from "../components/Quiz";
import { DataSet } from "../data/dataset";

const Economics: React.FC = () => {
  const [data, setData] = useState<DataSet[] | null>(null);

  useEffect(() => {
    import('../data/economics')
      .then((d) => {
        setData(d.default);
      })
      .catch((error) => console.error(error));
  }, []);

  return <Box>
    <Center>
      <Heading>Economics Quiz</Heading>
    </Center>
    {
      !data &&
      (<center>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
          m={6}
        />
      </center>)
    }
    {
      data && <Quiz data={data} />
    }
  </Box>;
};

export default Economics;