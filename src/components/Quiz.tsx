import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Heading, ListItem, OrderedList, Radio, RadioGroup, Stack, StackDivider, Text } from "@chakra-ui/react";
import { DataSet } from "../data/dataset";
import { useState } from "react";
import Quizgenerator from "../quiz/Quizgenerator";

type handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => void;
type HandleOptionChange = (option: string) => void;
type Props = {
    data: DataSet[];
    showQN?: boolean;
};


const Question = (question: DataSet["question"], index: number, options?: DataSet["options"], questionDirection?: DataSet["questionDirection"], showQN?: boolean) => {
    return (
        <Box>
            <Heading size='md'>
                <Text>{showQN && `Q(${index + 1})`} {question}</Text>
            </Heading>
            {
                options && <OrderedList p={3}>
                    {options.map(d => <ListItem key={d}>{d}</ListItem>)}
                </OrderedList>
            }
            {
                questionDirection && <Heading size='md'>
                    <Text>{questionDirection}</Text>
                </Heading>
            }

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

const Quiz: React.FC<Props> = ({ data, showQN }) => {
    const [optionChecked, setOptionChecked] = useState(false);
    const [answerChecked, setAnswerChecked] = useState(false);
    const [quizData, setQuizData] = useState(Quizgenerator(data, 0));
    const [quizCount, setQuizCount] = useState(1);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleChange: handleChangeType = (event) => {
        setOptionChecked(event.target.checked);
    };

    const handleOptionChange: HandleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const answer = quizData.options[quizData.answer];

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
        setQuizData(Quizgenerator(data, quizCount));
        setQuizCount(count => count + 1);
        document.querySelectorAll(".optionsBox").forEach((d) => (d as HTMLElement).style.backgroundColor = "");
    }

    return <Card m={5} key={quizCount}>
        <CardHeader>
            {Question(quizData.question, quizData.index, quizData.questionOptions, quizData.questionDirection, showQN)}
        </CardHeader>

        <CardBody>
            <RadioGroup defaultValue=''>
                <Stack divider={<StackDivider />} spacing='4'>
                    {
                        quizData.options.map((d) => Options(d, handleChange, handleOptionChange, quizData.randomString))
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
}

export default Quiz