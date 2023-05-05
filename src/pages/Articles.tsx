import React, { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Center, Divider, Heading, Radio, RadioGroup, Spinner, Stack, StackDivider, Text } from "@chakra-ui/react";
import { DataSet, Articles } from "../data/dataset";

type handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => void;
type HandleOptionChange = (option: string) => void;
type articlesDataGenerator = {
    question: string;
    answer: string;
    options: string[];
    randomString: string;
}

const articlesDataGenerator = (articlesDataSet: Articles[] | null, articlesHighlightDataSet: Articles[] | null) => {
    if (articlesDataSet && articlesHighlightDataSet) {
        // select which data to use - full article or highlighted article
        const dataSet = (Math.floor(Math.random() * 20) + 1) % 2 === 0 ? articlesDataSet : articlesHighlightDataSet;
        // select which method - article number as question or answer
        const numberMethod = (Math.floor(Math.random() * 20) + 1) % 2 === 0 ? true : false;
        // generate four unique index for aricles from the data set
        function generateUniqueRandomIntegers(num: number) {
            let nums: number[] = [];
            while (nums.length < 4) {
                let rand = Math.floor(Math.random() * num);
                if (!nums.includes(rand)) {
                    nums.push(rand);
                }
            }
            return nums;
        }
        function shuffleArray(arr: string[]) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }
        const generateRandomString = (length: number) => {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        const randomString = generateRandomString(6);

        const articlesIndexArray = generateUniqueRandomIntegers(dataSet.length);
        const selectedArticlesObject = articlesIndexArray.map(d => dataSet[d]);
        const question = numberMethod ? `Article ${selectedArticlesObject[0].articleNo}` : selectedArticlesObject[0].article;
        const unHashedAnswer = !numberMethod ? `Article ${selectedArticlesObject[0].articleNo}` : selectedArticlesObject[0].article.replace(/\n\s*/g, '');
        const answer = `${unHashedAnswer}-${randomString}`;
        const unshuffledOptions = numberMethod ? selectedArticlesObject.map(d => d.article) : selectedArticlesObject.map(d => d.articleNo).map(d => `Article ${d}`);
        const options = shuffleArray(unshuffledOptions).map(d => d.replace(/\n\s*/g, '')).map(d => `${d}-${randomString}`);
        return { question, answer, options, randomString }
    }
    else {
        return null
    }
}

const Question = (question: DataSet["question"]) => {
    return (
        <Box>
            <Heading size='md'>
                <Text>{question}</Text>
            </Heading>
        </Box>
    )
}

const Options = (option: string, handleChange: handleChangeType, handleOptionChange: HandleOptionChange, randomString: string) => {
    const pattern = `-${randomString}`;
    const unHashedOption = option.replace(pattern, "")
    return <Box p={3} key={option} onClick={() => handleOptionChange(option)} className="optionsBox">
        <Radio size='lg' name='options' colorScheme='blue' value={option} onChange={handleChange}>
            <Text fontSize='sm'>
                {unHashedOption}
            </Text>
        </Radio>
    </Box>
}

const Articles: React.FC = () => {
    const [optionChecked, setOptionChecked] = useState(false);
    const [answerChecked, setAnswerChecked] = useState(false);
    const [rawArticleData, setRawArticleData] = useState<Articles[] | null>(null);
    const [rawArticleHighlightData, setRawArticleHighlightData] = useState<Articles[] | null>(null);
    const [quizData, setQuizData] = useState<articlesDataGenerator | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleChange: handleChangeType = (event) => {
        setOptionChecked(event.target.checked);
    };

    const handleOptionChange: HandleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const answer = quizData ? quizData.answer : 0;

    const handleCheckAnswer = () => {
        if (!answerChecked) {
            const selectedBox = document.querySelector(`input[name="options"][value="${selectedOption}"]`)?.parentElement;
            if (selectedOption == answer) {
                (selectedBox?.parentNode as HTMLElement).style.backgroundColor = "var(--chakra-colors-green-400)";
            } else {
                (selectedBox?.parentNode as HTMLElement).style.backgroundColor = "var(--chakra-colors-red-400)";
            }
            const answerBox = document.querySelector(`input[name="options"][value="${answer}"]`)?.parentElement;
            (answerBox?.parentNode as HTMLElement).style.backgroundColor = "var(--chakra-colors-green-400)";
            setAnswerChecked(true);
        }
    };

    const nextQuestion = () => {
        setAnswerChecked(false);
        setOptionChecked(false);
        setSelectedOption(null);
        setQuizData(articlesDataGenerator(rawArticleData, rawArticleHighlightData));
        document.querySelectorAll(".optionsBox").forEach((d) => (d as HTMLElement).style.backgroundColor = "");
    }

    useEffect(() => {
        import('../data/articles')
            .then((d) => {
                setRawArticleData(d.default);
            })
            .catch((error) => console.error(error));
        import('../data/articlesHighlight')
            .then((d) => {
                setRawArticleHighlightData(d.default);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        setQuizData(articlesDataGenerator(rawArticleData, rawArticleHighlightData))
        console.log("use effected")
    }, [rawArticleData, rawArticleHighlightData])

    return <Box>
        <Center>
            <Heading>Articles Quiz</Heading>
        </Center>
        {
            !quizData &&
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
            quizData && (
                <Card m={5}>
                    <CardHeader>
                        {quizData && Question(quizData.question)}
                    </CardHeader>

                    <CardBody>
                        <RadioGroup defaultValue=''>
                            <Stack divider={<StackDivider />} spacing='4'>
                                {
                                    quizData && quizData.options.map((d) => Options(d, handleChange, handleOptionChange, quizData.randomString))
                                }
                            </Stack>
                        </RadioGroup>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <ButtonGroup spacing='2'>
                            {!answerChecked && (<Button variant='solid' colorScheme='blue' isDisabled={!optionChecked} onClick={handleCheckAnswer}>
                                Check Answer
                            </Button>)
                            }
                            <Button variant='ghost' colorScheme='blue' onClick={nextQuestion}>
                                Next
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            )
        }
    </Box>;
};

export default Articles;