import {
    Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading,
    HStack, Input, Radio, RadioGroup, Stack, Textarea, useToast,
    Wrap,
    WrapItem
} from "@chakra-ui/react"
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { addDoc, collection, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase-app";
import { Preview, questionInterface } from "./Questions";

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
    const [selectedQuestion, setSelectedQuestion] = useState<questionInterface>()

    /**
     * questions suggestions
    */
    const [suggestion, setSuggestion] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const questionDictionary = ['consider the following statements regarding', 'which of the following statements', 'countries', 'initiative'];

    const handleQuestionChangeNew = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setQuestion(value);

        const lastWord = value?.split(' ')?.pop()?.toLowerCase();
        const matchingWord = lastWord && questionDictionary.find(word => word.startsWith(lastWord));

        if (matchingWord && lastWord.length > 0) {
            setSuggestion(matchingWord.slice(lastWord.length));
        } else {
            setSuggestion('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab' && suggestion) {
            e.preventDefault();
            setQuestion(prev => prev + suggestion);
            setSuggestion('');
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.setSelectionRange(question.length, question.length);
        }
    }, [question]);

    /**
     * question direction suggestions
     */
    const [questionDirectionSuggestion, setQuestionDirectionSuggestion] = useState('');
    const questionDirectionRef = useRef<HTMLTextAreaElement>(null);
    const questionDirectionDictionary = [
        'how many of the above statements are correct?',
        'which one of the following is correct in respect of the above statements?',
        'which of the statements given above is/are correct?',
    ];

    const handleQuestionDirectionChangeNew = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        const value = e.target.value;
        setQuestionDirection(value);

        const lastWord = value?.split(' ')?.pop()?.toLowerCase();
        const matchingWord = lastWord && questionDirectionDictionary.find(word => word.startsWith(lastWord));

        if (matchingWord && lastWord.length > 0) {
            setQuestionDirectionSuggestion(matchingWord.slice(lastWord.length));
        } else {
            setQuestionDirectionSuggestion('');
        }

        const lowercaseValue = value.toLowerCase();
        const matchingSentence = questionDirectionDictionary.find(sentence =>
            sentence.toLowerCase().startsWith(lowercaseValue) && sentence.toLowerCase() !== lowercaseValue
        );

        if (matchingSentence) {
            setQuestionDirectionSuggestion(matchingSentence.slice(value.length));
        } else {
            setQuestionDirectionSuggestion('');
        }
    };

    const handleQuestionDirectionKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab' && questionDirectionSuggestion) {
            e.preventDefault();
            setQuestionDirection(prev => prev + questionDirectionSuggestion);
            setQuestionDirectionSuggestion('');
        }
    };

    useEffect(() => {
        if (questionDirectionRef.current) {
            questionDirectionRef.current.setSelectionRange(questionDirection.length, questionDirection.length);
        }
    }, [questionDirection]);

    /**
     * suggest options
     */
    const optionSuggestions: optionsInterface[] = [
        { optionOne: 'Only One', optionTwo: 'Only Two', optionThree: 'All three', optionFour: 'None' },
        { optionOne: '1 and 2 Only', optionTwo: '2 and 3 Only', optionThree: '1, 2 and 3', optionFour: '1 and 3 Only' },
        { optionOne: '1 Only', optionTwo: '2 Only', optionThree: 'Both 1 and 2', optionFour: 'Neither 1 Nor 2' },
        { optionOne: 'Both statement-1 and statement-2 are correct and statement-2 is the correct explanation of statement-1', 
            optionTwo: 'Both statement-1 and statement-2 are correct and statement-2 is not the correct explanation of statement-1', 
            optionThree: 'Statement-1 is correct but statement-2 is incorrect', 
            optionFour: 'Statement-1 is incorrect but statement-2 is correct' },
        { optionOne: '', optionTwo: '', optionThree: '', optionFour: '' },
    ];

    const handleOptionChange = (index: number) => {
        setOptions(optionSuggestions[index])
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
            user,
            lastUpdated: serverTimestamp()
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
                console.log(error);

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

    const previewQuestion = () => {
        if (user) {
            const questionObject = {
                id: "",
                question,
                questionDirection,
                explanation,
                answer: answerIndex,
                options,
                questionOptions,
                user
            }
            setSelectedQuestion(questionObject)
        }
    }

    useEffect(() => {
        FetchQuestion();
    }, [questionId])


    return <>
        <Heading textAlign={"center"} color={"teal"}>{title} question</Heading>

        <Box mx={[6, 16, 28, 36, 56]} my={[4, 6, 10, 16]}>

            <FormControl p={3} position="relative">
                <FormLabel>Question</FormLabel>
                <Box position="relative">
                    <Textarea
                        ref={textareaRef}
                        value={question}
                        onChange={handleQuestionChangeNew}
                        onKeyDown={handleKeyDown}
                        pr={4}
                        resize="vertical"
                    />
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        pointerEvents="none"
                        pl={4}
                        pt={2}
                        pr={4}
                        overflowWrap="break-word"
                        whiteSpace="pre-wrap"
                        color="gray.400"
                    >
                        {question}
                        <Box as="span" color="gray.300">
                            {suggestion}
                        </Box>
                    </Box>
                </Box>
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

            <FormControl p={3} position="relative">
                <FormLabel>Question Direction</FormLabel>
                <Box position="relative">
                    <Textarea
                        ref={questionDirectionRef}
                        value={questionDirection}
                        onChange={handleQuestionDirectionChangeNew}
                        onKeyDown={handleQuestionDirectionKeyDown}
                        pr={4}
                        resize="vertical"
                    />
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        pointerEvents="none"
                        pl={4}
                        pt={2}
                        pr={4}
                        overflowWrap="break-word"
                        whiteSpace="pre-wrap"
                        color="gray.400"
                    >
                        {questionDirection}
                        <Box as="span" color="gray.300">
                            {questionDirectionSuggestion}
                        </Box>
                    </Box>
                </Box>
            </FormControl>

            <Stack direction='column'>
                <Wrap spacing={4}>
                    <WrapItem>
                        <Button colorScheme='gray' onClick={() => handleOptionChange(0)}>Only One</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button colorScheme='gray' onClick={() => handleOptionChange(1)}>1 and 2 Only</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button colorScheme='gray' onClick={() => handleOptionChange(2)}>1 Only</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button colorScheme='gray' onClick={() => handleOptionChange(3)}>Statement 1</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button colorScheme='gray' variant='outline' onClick={() => handleOptionChange(4)}>Clear</Button>
                    </WrapItem>
                </Wrap>
            </Stack>

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
            <Button mx={2} onClick={previewQuestion}>Preview</Button>
        </Box>

        <Preview selectedQuestion={selectedQuestion} setSelectedQuestion={setSelectedQuestion} />
    </>
}

export default Question