import React, { useEffect, useState } from "react";
import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import { DataSet } from "../data/dataset";
import Quiz from "../components/Quiz";

const DistrictQuizGenerator = (districtsData: Map<string, string[]> | null) => {
    if (districtsData) {
        const questionGenerator = (pairSet: Set<string[]>) => {
            const statesArray = Array.from(districtsData.keys());
            const districtsArray = Array.from(districtsData.values()).flat();
            const quizData = Array.from(pairSet).map((d, i) => {
                const filteredStates = statesArray.filter(state => state !== d[1]).sort(() => Math.random() - 0.5).slice(0, 3);
                const filteredDistricts = districtsArray.filter(state => state !== d[0]).sort(() => Math.random() - 0.5).slice(0, 3);
                const isOdd = i % 2 === 0;
                const question = isOdd ? `Select a district in ${d[1]}` : `${d[0]} is in which state`;
                const unShuffledOptions = !isOdd ? filteredStates : filteredDistricts;
                unShuffledOptions[3] = isOdd ? d[0] : d[1]
                const options = unShuffledOptions.sort(() => Math.random() - 0.5)
                const answer = isOdd ? options.indexOf(d[0]) : options.indexOf(d[1])
                return { question, options, answer }
            })
            return quizData
        }

        // 1. generate a unique set of 100 districts
        // Create an empty set to store the pairs
        const pairsSet: Set<string[]> = new Set();

        // Loop until the set size is 5
        while (pairsSet.size < 100) {
            // Get a random state from the map keys
            const states = [...districtsData.keys()];
            const state = states[Math.floor(Math.random() * states.length)];

            // Get a random district from the map values
            const districts = districtsData.get(state);
            const district = districts && districts[Math.floor(Math.random() * districts.length)];

            // Add the pair to the set as a string
            pairsSet.add([`${district}`, `${state}`]);
        }

        const quizDataset = questionGenerator(pairsSet);
        return quizDataset

    }
    // 2. convert odd one into district question and even one into state question
}

const Geography: React.FC = () => {
    const [districtsData, setDistrictsData] = useState<Map<string, string[]> | null>(null)
    const [districtsQuizData, setDistrictsQuizData] = useState<DataSet[] | null>(null)

    useEffect(() => {
        import('../data/districts')
            .then((d) => {
                setDistrictsData(d.default);
            })
            .catch((error) => console.error(error));
    }, [])

    useEffect(() => {
        const newQuizDataset = DistrictQuizGenerator(districtsData)
        newQuizDataset && setDistrictsQuizData(newQuizDataset);
    }, [districtsData])
    return <Box>
        <Center>
            <Heading>Geography Quiz</Heading>
        </Center>
        {
            !districtsQuizData &&
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
            districtsQuizData &&
            <Quiz data={districtsQuizData} />
        }
    </Box>;
};

export default Geography;