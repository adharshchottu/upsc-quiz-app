import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, Radio, RadioGroup, Stack, Textarea, useToast } from "@chakra-ui/react"
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
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
    const [explanation, setExplanation] = useState("")
    const [answerIndex, setAnswerIndex] = useState("")
    const [options, setOptions] = useState<optionsInterface>({ optionOne: "", optionTwo: "", optionThree: "", optionFour: "" })
    const [questionOptions, setQuestionOptions] = useState<string[]>([])

    let handleQuestionChange = (e: any) => {
        let inputValue = e.target.value
        setQuestion(inputValue)
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
            explanation,
            answer: answerIndex,
            options,
            questionOptions,
            user
        }
        console.log(questionObject);

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


    return <>
        <Heading textAlign={"center"} color={"teal"}>{title} question</Heading>

        <Box mx={56}>
            <FormControl p={3}>
                <FormLabel>Question</FormLabel>
                <Textarea value={question} onChange={handleQuestionChange} />
            </FormControl>


            <Box textAlign={"end"}>
                <Button colorScheme="pink" onClick={addItem}>Add Question Option</Button>
            </Box>
            <ol>
                {questionOptions.map((item, index) => {
                    return <li key={index}>
                        <Input
                            value={item}
                            onChange={(e) => updateItemName(index, e.target.value)}
                            placeholder="Enter option name"
                        />
                        <Button colorScheme="red" onClick={() => deleteItem(index)}>Delete</Button>
                    </li>
                }
                )}
            </ol>

            <FormControl p={3}>
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