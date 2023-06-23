import React, { useEffect, useState } from "react";
import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import { DataSet } from "../data/dataset";
import Quiz from "../components/Quiz";
import { AllowedCountries, AllowedStates, AllowedUts, StateObject } from "../data/states";

const DistrictQuizGenerator = (districtsData?: Map<string, string[]> | null, utData?: Map<string, string[]> | null) => {
    if (districtsData && utData) {
        const newQuestionGenerator = (pairSet: [string, string][]) => {
            let i = 0;
            const pairData = pairSet.sort(() => Math.random() - 0.5);
            const quizData: DataSet[] = [];
            while (i < 300) {
                const questionPair = pairData[i]
                const isOdd = i % 2 === 0;
                const question = isOdd ? `Select a district in ${questionPair[0]}` : `${questionPair[1]} is in which state`;
                const optionsPair = pairData.slice((i)).sort(() => Math.random() - 0.5).filter(d => d[0] != questionPair[0]).slice(0, 3)
                const unSortedOptions = isOdd ? [...optionsPair.map(d => d[1]), questionPair[1]] : [...optionsPair.map(d => d[0]), questionPair[0]];
                const unSortedOrderedOptionsPair = !isOdd ? [] : [...optionsPair, questionPair];
                const rand = Math.random();
                const options = unSortedOptions.sort(() => rand - 0.5)
                const orderedOptionsPair = unSortedOrderedOptionsPair.sort(() => rand - 0.5)
                const answer = isOdd ? options.indexOf(questionPair[1]) : options.indexOf(questionPair[0]);
                if (options.length === new Set(options).size) {
                    quizData.push({ question, answer, options, detailedAnswer: orderedOptionsPair })
                }
                i++;
            }
            return quizData
        }

        const newUTQuestionGenerator = (pairSet: [string, string][]) => {
            let i = 0;
            const pairData = pairSet.sort(() => Math.random() - 0.5);
            const quizData: DataSet[] = [];
            while (i < 52) {
                const questionPair = pairData[i]
                const isOdd = i % 2 === 0;
                const question = isOdd ? `Select a place in ${questionPair[0]}` : `${questionPair[1]} is in which Union Territory`;
                const optionsPair = pairData.slice((i)).sort(() => Math.random() - 0.5).filter(d => d[0] != questionPair[0]).slice(0, 3)
                const unSortedOptions = isOdd ? [...optionsPair.map(d => d[1]), questionPair[1]] : [...optionsPair.map(d => d[0]), questionPair[0]];
                const unSortedOrderedOptionsPair = !isOdd ? [] : [...optionsPair, questionPair];
                const rand = Math.random();
                const options = unSortedOptions.sort(() => rand - 0.5)
                const orderedOptionsPair = unSortedOrderedOptionsPair.sort(() => rand - 0.5)
                const answer = isOdd ? options.indexOf(questionPair[1]) : options.indexOf(questionPair[0]);
                if (options.length === new Set(options).size) {
                    quizData.push({ question, answer, options, detailedAnswer: orderedOptionsPair })
                }
                i++;
            }
            return quizData
        }

        // districts
        const districtsPair: Array<[string, string]> = [];
        districtsData.forEach((districts, ut) => {
            districts.forEach((district) => {
                const utDistrict: [string, string] = [ut, district];
                districtsPair.push(utDistrict);
            });
        });
        

        // union territories
        const UTdistricts: Array<[string, string]> = [];
        utData.forEach((districts, ut) => {
            districts.forEach((district) => {
                const utDistrict: [string, string] = [ut, district];
                UTdistricts.push(utDistrict);
            });
        });

        const UTquizDataset = newUTQuestionGenerator(UTdistricts);
        const DistrictquizDataset = newQuestionGenerator(districtsPair);
        const quizDataset = [...UTquizDataset, ...DistrictquizDataset].sort(() => Math.random() - 0.5)
        return quizDataset

    }
}

const StatesQuizGenerator = (statesData: Map<AllowedStates | AllowedCountries | AllowedUts, StateObject> | null) => {
    // each states has a states array, ut array, sea array, countries array
    // 1) states neighbouring - yes and no  - 8 question in total.
    if (statesData) {
        const statesArray: Array<AllowedStates | AllowedCountries | AllowedUts> = Array.from(statesData.keys()).sort(() => Math.random() - 0.5).slice(0, 28);
        const allNeighbours = () => {
            const allValues: string[] = [];
            statesData.forEach((stateObj) => {
                const { states = [], sea = [], ut = [], countries = [] } = stateObj;
                allValues.push(...states, ...sea, ...ut, ...countries);
            });
            const uniqueValues = Array.from(new Set(allValues));
            return uniqueValues;
        }
        const getItemsByState = (state: AllowedStates | AllowedCountries | AllowedUts): string[] => {
            const stateObj = statesData.get(state);
            if (!stateObj) {
                return [];
            }

            const stateValues: string[] = [
                ...(stateObj.states || []),
                ...(stateObj.sea || []),
                ...(stateObj.ut || []),
                ...(stateObj.countries || []),
            ];

            return stateValues;
        }

        const generateStateItems = (map: Map<string, StateObject>, states: Array<AllowedStates | AllowedCountries | AllowedUts>): DataSet[] => {
            const output = [];
            let i = 0;
            do {
                let state = states[i];
                const stateObj = map.get(state);
                const isOdd = i % 2 === 0;
                if (stateObj) {

                    const stateItems: string[] = getItemsByState(state).filter((item) => item != state);
                    const notHasItems: string[] = allNeighbours().sort(() => Math.random() - 0.5).filter((item) => item != state).filter((item) => !stateItems.includes(item));

                    const falseOptions = isOdd ? notHasItems.slice(0, 3) : stateItems.slice(0, 3);
                    const actualAnswer = !isOdd ? notHasItems[0] : stateItems[0];
                    falseOptions.push(actualAnswer);
                    const options = falseOptions.sort(() => Math.random() - 0.5);
                    const question = isOdd ? `Select one which does share border with ${state}` : `Select one which does not share border with ${state}`;
                    const answer = options.indexOf(actualAnswer);
                    options.length == 4 && output.push({ question, answer, options })
                }
                i++;
            }
            while (output.length < 21)
            return output;
        }

        const stateItems = generateStateItems(statesData, statesArray);
        return stateItems
    }
    // 2) generate a list of neighbours (may be some 4-5 random) and generate 4 options for neighbours list.

}

const Geography: React.FC = () => {
    const [districtsData, setDistrictsData] = useState<Map<string, string[]> | null>(null)
    const [utData, setUtData] = useState<Map<string, string[]> | null>(null)
    const [statesData, setStatesData] = useState<Map<AllowedStates | AllowedCountries | AllowedUts, StateObject> | null>(null)
    const [districtsQuizData, setDistrictsQuizData] = useState<DataSet[] | null>(null)

    useEffect(() => {
        import('../data/districts')
            .then((d) => {
                setDistrictsData(d.districtsMap);
            })
            .catch((error) => console.error(error));
        import('../data/districts')
            .then((d) => {
                setUtData(d.UTdistrictsMap);
            })
            .catch((error) => console.error(error));
        import('../data/states')
            .then((d) => {
                setStatesData(d.default);
            })
            .catch((error) => console.error(error));
    }, [])

    useEffect(() => {
        const newQuizDataset = DistrictQuizGenerator(districtsData, utData)
        newQuizDataset && setDistrictsQuizData(newQuizDataset);
        const neighboursQuizSet = StatesQuizGenerator(statesData)
        newQuizDataset && neighboursQuizSet && setDistrictsQuizData([...neighboursQuizSet, ...newQuizDataset])
    }, [districtsData, statesData])
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