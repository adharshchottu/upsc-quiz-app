import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, Radio, RadioGroup, Stack, Textarea, useToast } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-app";

export interface optionsInterface {
    optionOne: string;
    optionTwo: string;
    optionThree: string;
    optionFour: string;
}

const Question = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const toast = useToast()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const questionId = searchParams.get('id');
    const title = !questionId ? "Add new" : "Edit"
    const submitButton = !questionId ? "Create" : "Update"

    const [question, setQuestion] = useState("")
    const [questionDirection, setQuestionDirection] = useState("")
    const [explanation, setExplanation] = useState("")
    const [answerIndex, setAnswerIndex] = useState("")
    const [options, setOptions] = useState<optionsInterface>({ optionOne: "", optionTwo: "", optionThree: "", optionFour: "" })
    const [questionOptions, setQuestionOptions] = useState<string[]>([])

    let handleQuestionChange = (e: any) => {
        let inputValue = e.target.value
        setQuestion(inputValue)
    }

    let handleQuestionDirectionChange = (e: any) => {
        let inputValue = e.target.value
        setQuestionDirection(inputValue)
    }

    let handleExplanationChange = (e: any) => {
        let inputValue = e.target.value
        setExplanation(inputValue)
    }

    const addItem = () => {
        setQuestionOptions([...questionOptions, ""]);
    };

    const updateItemName = (id: number, value: string) => {
        const updatedItems = questionOptions.map((item, index) => {
            return index === id ? value : item
        }
        );
        setQuestionOptions(updatedItems);
    };

    const deleteItem = (id: number) => {
        const updatedItems = questionOptions.filter((_, index) => { return index !== id });
        setQuestionOptions(updatedItems);
    };

    const UpdateQuestion = () => {
        if (answerIndex == "") {
            toast({
                title: 'Answer not selected',
                description: "Select the correct answer.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }

        if (question == "") {
            toast({
                title: 'Empty question',
                description: "Question is empty.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }

        if (Object.values(options).some(value => value.trim() === '')) {
            toast({
                title: 'Empty option',
                description: "Options can't be empty.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }

        if (explanation.length > 200) {
            toast({
                title: 'Long explanation',
                description: "Try to keep explanation under 200 characters.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        const questionObject = {
            question,
            questionDirection,
            explanation,
            answer: answerIndex,
            options,
            questionOptions,
            user
        }

        const UpdateDatabase = async () => {
            try {
                if (questionId == "" || questionId == null) {
                    await addDoc(collection(db, "questions"), questionObject);
                    toast({
                        title: 'Question added',
                        description: "Question added succesfully.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                    navigate('/questions');
                    return
                } else {
                    await updateDoc(doc(db, "questions", questionId), questionObject);
                    toast({
                        title: 'Question updated',
                        description: "Question update succesfully.",
                        status: 'info',
                        duration: 3000,
                        isClosable: true,
                    })
                    navigate('/questions');
                    return
                }
            } catch (error) {
                toast({
                    title: 'Error adding question',
                    description: "Question update failed.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
                return
            }
        }
        UpdateDatabase();
    }

    const FetchQuestion = async () => {
        try {
            if (questionId) {
                const dbData = await getDoc(doc(db, "questions", questionId));
                const data = dbData.data();
                if (data) {
                    setQuestion(data.question)
                    setQuestionDirection(data.questionDirection)
                    setExplanation(data.explanation)
                    setOptions(data.options)
                    setAnswerIndex(data.answer)
                    setQuestionOptions(data.questionOptions)
                } else {
                    toast({
                        title: 'Error fetching question',
                        description: "Try again later.",
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    })
                    navigate('/questions');
                }
            }
        }
        catch (e) {
            toast({
                title: 'Error fetching question',
                description: "Try again later.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            navigate('/questions');
        }
    }

    useEffect(() => {
        FetchQuestion();
    }, [questionId])


    return <>
        <Heading textAlign={"center"} color={"teal"} bg={["red", "green", "blue", "yellow", "rosybrown"]}>{title} question</Heading>

        <Box mx={[6, 16, 28, 36, 56]} my={[4, 6, 10, 16]}>
            <FormControl p={3}>
                <FormLabel>Question</FormLabel>
                <Textarea value={question} onChange={handleQuestionChange} />
            </FormControl>


            <Box textAlign={"end"} my={6}>
                <Button colorScheme="pink" onClick={addItem}>Add Question Option</Button>
            </Box>
            <ol>
                {questionOptions.map((item, index) => {
                    return <li key={index}>
                        <HStack m={2}>
                            <Input
                                value={item}
                                onChange={(e) => updateItemName(index, e.target.value)}
                                placeholder="Enter option name"
                            />
                            <Button colorScheme="red" onClick={() => deleteItem(index)}>Delete</Button>
                        </HStack>
                    </li>
                }
                )}
            </ol>

            <FormControl p={3}>
                <FormLabel>Question Direction</FormLabel>
                <Textarea value={questionDirection} onChange={handleQuestionDirectionChange} />
            </FormControl>

            <FormControl p={3}>
                <FormLabel>Options</FormLabel>
                <RadioGroup colorScheme="green" value={answerIndex} onChange={setAnswerIndex}>
                    <Stack direction='column' gap={4}>
                        <Flex p={2} borderColor={answerIndex == "0" ? "green.400" : "none"} gap={4}>
                            <Radio value="0">A</Radio>
                            <Textarea value={options.optionOne}
                                onChange={(e) => {
                                    setOptions(prevData => { return { ...prevData, optionOne: e.target.value } })
                                }}
                            />
                        </Flex>
                        <Flex p={2} borderColor={answerIndex == "1" ? "green.400" : "none"} gap={4}>
                            <Radio value='1'>B</Radio>
                            <Textarea value={options.optionTwo}
                                onChange={(e) => {
                                    setOptions(prevData => { return { ...prevData, optionTwo: e.target.value } })
                                }}
                            />
                        </Flex>
                        <Flex p={2} borderColor={answerIndex == "2" ? "green.400" : "none"} gap={4}>
                            <Radio value='2'>C</Radio>
                            <Textarea value={options.optionThree}
                                onChange={(e) => {
                                    setOptions(prevData => { return { ...prevData, optionThree: e.target.value } })
                                }}
                            />
                        </Flex>
                        <Flex p={2} borderColor={answerIndex == "3" ? "green.400" : "none"} gap={4}>
                            <Radio value='3'>D</Radio>
                            <Textarea value={options.optionFour}
                                onChange={(e) => {
                                    setOptions(prevData => { return { ...prevData, optionFour: e.target.value } })
                                }}
                            />
                        </Flex>
                    </Stack>
                </RadioGroup>
            </FormControl>

            <FormControl p={3}>
                <FormLabel>Explanation</FormLabel>
                <Textarea value={explanation} onChange={handleExplanationChange} />
                <FormHelperText color={explanation.length > 200 ? "red.300" : ""}>Character count: {explanation.length}</FormHelperText>
            </FormControl>
        </Box>

        <Box textAlign={"center"}>
            <Button onClick={UpdateQuestion} colorScheme="green">{submitButton}</Button>
        </Box>
    </>
}

export default Question