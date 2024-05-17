import React, { useEffect, useState } from "react";
import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import { DataSet } from "../data/dataset";
import Quiz from "../components/Quiz";
import { AllowedCountries, AllowedStates, AllowedUts, StateObject } from "../data/states";
import { River } from "../data/geography/rivers";

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

const RiverQuizGenerator = (riversData: Map<string, River> | null) => {
    // select one and ask question on any property
    let questionSet = [];
    if (riversData) {
        for (let i = 0; i < 100; i++) {
            // get random pair from map
            const getRandomPairFromMap = (map: Map<string, River>) => {
                const entries = Array.from(map.entries()); // Get all entries as an array
                const randomIndex = Math.floor(Math.random() * entries.length);
                return entries[randomIndex]; // Return as an object
            }

            // get random object property
            const getRandomProperty = (obj: any) => {
                const propertyNames = Object.keys(obj);
                const randomIndex = Math.floor(Math.random() * propertyNames.length);
                const randomPropertyName = propertyNames[randomIndex];
                return { key: randomPropertyName, value: obj[randomPropertyName] };
            };

            let questionRiverData = getRandomPairFromMap(riversData);
            let [river, details] = questionRiverData;
            let { key, value } = getRandomProperty(details)

            // if value is array add questionOptions. else 
            if (Array.isArray(value)) {
                // if the key is tributaires create a different question
                let question = key == 'tributaries' ? `Which among the following is a ${key} of the river ${river}?` : `Which among the following is a ${key} in which the river ${river} flows?`;
                let answerValues = value;
                let answerValue = answerValues[Math.floor(Math.random() * answerValues.length)]; // select one from the correct values 
                const valueEntries = Array.from(riversData.values()); // value entries in the map
                // all values of the selected property
                const selectedValues = valueEntries.map((e: any) => {
                    const propertyValue = e[key];
                    return propertyValue;
                }).reduce((reduced, current) => {
                    if (current) {
                        reduced = [...reduced, ...current]
                    }
                    return reduced;
                }, [])
                // filter out the answer value and fetch 3 random value from it
                const filteredNonAnswers = selectedValues.filter((e: any) => {
                    return e != answerValue && e && !(answerValues.includes(e))
                })

                // if non answers are less than 3, skip it
                if (filteredNonAnswers.length >= 3) {
                    const randomItems = new Set();
                    for (let j = 0; j < 10; j++) {
                        const randomIndex = Math.floor(Math.random() * filteredNonAnswers.length);
                        if (randomItems.size < 3) {
                            randomItems.add(filteredNonAnswers[randomIndex]);
                        }
                    }
                    if (randomItems.size == 3) {
                        let wrongOptions = [...Array.from(randomItems), answerValue];
                        const options = wrongOptions.sort(() => Math.random() - 0.5);
                        const answer = options.indexOf(answerValue);
                        questionSet.push({ question, options, answer });
                    }
                }
            } else {
                let question = `What is the ${key} of the river ${river}?`;
                let answerValue = value;
                const valueEntries = Array.from(riversData.values()); // value entries in the map
                // all values of the selected property
                const selectedValues = valueEntries.map((e: any) => {
                    const propertyValue = e[key];
                    return propertyValue;
                })
                // filter out the answer value and fetch 3 random value from it
                const filteredNonAnswers = selectedValues.filter((e: any) => {
                    return e != value && e
                })

                // if non answers are less than 3, skip it
                if (filteredNonAnswers.length >= 3) {
                    const randomItems = new Set();
                    for (let j = 0; j < 10; j++) {
                        const randomIndex = Math.floor(Math.random() * filteredNonAnswers.length);
                        if (randomItems.size < 3) {
                            randomItems.add(filteredNonAnswers[randomIndex]);
                        }
                    }
                    if (randomItems.size == 3) {
                        let wrongOptions = [...Array.from(randomItems), answerValue];
                        const options = wrongOptions.sort(() => Math.random() - 0.5);
                        const answer = options.indexOf(answerValue);
                        questionSet.push({ question, options, answer });
                    }
                }
            }
        }
    }
    return questionSet;
}

const Geography: React.FC = () => {
    const [districtsData, setDistrictsData] = useState<Map<string, string[]> | null>(null)
    const [utData, setUtData] = useState<Map<string, string[]> | null>(null)
    const [statesData, setStatesData] = useState<Map<AllowedStates | AllowedCountries | AllowedUts, StateObject> | null>(null)
    const [riversData, setRiversData] = useState<Map<string, River> | null>(null)
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
        import('../data/geography/rivers')
            .then((d) => {
                setRiversData(d.default);
            })
            .catch((error) => console.error(error));
    }, [])

    useEffect(() => {
        const newQuizDataset = DistrictQuizGenerator(districtsData, utData)
        newQuizDataset && setDistrictsQuizData(newQuizDataset);
        const neighboursQuizSet = StatesQuizGenerator(statesData)
        newQuizDataset && neighboursQuizSet && setDistrictsQuizData([...neighboursQuizSet, ...newQuizDataset])
        const riversQuizDataSet = RiverQuizGenerator(riversData)
        newQuizDataset && neighboursQuizSet && riversQuizDataSet && setDistrictsQuizData([...neighboursQuizSet, ...newQuizDataset, ...riversQuizDataSet])
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