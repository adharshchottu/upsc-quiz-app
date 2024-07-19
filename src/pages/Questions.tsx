import { Box, Button, Card, CardBody, Flex, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase-app";
import { AuthContext, customUserInfo } from "../auth/AuthContext";
import { optionsInterface } from "./Question";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export interface questionInterface {
    id: string;
    question: string;
    questionDirection: string;
    explanation: string;
    answer: string;
    options: optionsInterface;
    questionOptions: string[];
    user: customUserInfo;
}

export interface PreviewInterface {
    selectedQuestion: questionInterface | undefined;
    setSelectedQuestion: React.Dispatch<React.SetStateAction<questionInterface | undefined>>
}

const AddQuestion = () => {
    const navigate = useNavigate();
    return <>
        <Button
            onClick={() => {
                navigate("/question")
            }}
            size={["sm", null, "md", "lg"]}
        >Add Question</Button>
    </>
}

const Loading = () => {
    return <Flex justifyContent={"center"} alignItems={"center"} h={'lg'} direction={"column"}>
        <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
        />
        <Text mt={2}>Fetching questions for you.</Text>
    </Flex>
}

export const Preview: React.FC<PreviewInterface> = ({ selectedQuestion, setSelectedQuestion }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selected, setSelected] = useState(false)
    const [bg, setBg] = useState<string[]>([])

    const CheckAnswer = (selectedAnswer: string) => {
        let bgArray = Array.from({ length: 4 }).map((_, index) => {
            return index == Number(selectedQuestion?.answer) ? 'green.500' : ""
        }).map((option, index) => {
            return Number(selectedAnswer) == index ? (selectedAnswer == selectedQuestion?.answer ? 'green.500' : 'red.500') : option
        })
        setBg(bgArray)
        setSelected(true)
    }

    useEffect(() => {
        if (selectedQuestion) {
            onOpen();
        }
    }, [selectedQuestion, onOpen]);

    useEffect(() => {
        if (!isOpen) {
            setSelected(false);
            setBg([]);
            setSelectedQuestion(undefined);
        }
    }, [isOpen]);

    return <>
        <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>UPSC Practice Question</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack align={"left"}>
                        <Box>{selectedQuestion?.question}</Box>
                        <Box pl={8}>
                            <ol>
                                {selectedQuestion?.questionOptions.map((questionOption) => {
                                    return (<li key={questionOption}>{questionOption}</li>)
                                })}
                            </ol>
                        </Box>
                        <Box>{selectedQuestion?.questionDirection}</Box>
                        <Box onClick={() => CheckAnswer("0")} cursor={"pointer"}>
                            <Card bg={bg[0]}>
                                <CardBody>
                                    <Text color={"cyan.900"}>{selectedQuestion?.options.optionOne}</Text>
                                </CardBody>
                            </Card>
                        </Box>
                        <Box onClick={() => CheckAnswer("1")} cursor={"pointer"}>
                            <Card bg={bg[1]}>
                                <CardBody>
                                    <Text color={"cyan.900"}>{selectedQuestion?.options.optionTwo}</Text>
                                </CardBody>
                            </Card>
                        </Box>
                        <Box onClick={() => CheckAnswer("2")} cursor={"pointer"}>
                            <Card bg={bg[2]}>
                                <CardBody>
                                    <Text color={"cyan.900"}>{selectedQuestion?.options.optionThree}</Text>
                                </CardBody>
                            </Card>
                        </Box>
                        <Box onClick={() => CheckAnswer("3")} cursor={"pointer"}>
                            <Card bg={bg[3]}>
                                <CardBody>
                                    <Text color={"cyan.900"}>{selectedQuestion?.options.optionFour}</Text>
                                </CardBody>
                            </Card>
                        </Box>
                        {selected && <Box p={8}>
                            <Card bg="cyan.100">
                                <CardBody>
                                    <Text color={"cyan.900"}>{selectedQuestion?.explanation}</Text>
                                </CardBody>
                            </Card>
                        </Box>}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}

const Questions: React.FC = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<questionInterface[]>([])
    const [selectedQuestion, setSelectedQuestion] = useState<questionInterface>()
    const toast = useToast()
    const { user } = useContext(AuthContext);

    const FetchQuestions = async () => {
        try {
            const questionsQuery = query(
                collection(db, "questions"),
                orderBy("lastUpdated", "desc"),
                limit(50)
            );
            const querySnapshot = await getDocs(questionsQuery);
            const questionsData: any[] = [];

            querySnapshot.forEach((doc) => {
                questionsData.push({ id: doc.id, ...doc.data() });
            });
            setQuestions(questionsData);

        } catch (error) {
            toast({
                title: 'Error fetching questions',
                description: "Try again.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    useEffect(() => {
        FetchQuestions();
    }, [])
    return <>
        <Flex justifyContent={"space-evenly"}>
            <Heading textAlign={"center"} color={"teal"} fontSize={["xl", "2xl", "3xl", "4xl"]}>Questions</Heading>
            <AddQuestion />
        </Flex>
        {questions.length ? <Flex direction={"column"} gap={4} maxW={"container.lg"} mx={[4, 8, 12, 16, "auto"]} my={[8, null, 12, null]}>
            {
                questions.map((question, index) => {
                    return <Flex justifyContent={"space-between"} alignItems={"center"} key={question.id} gap={"2"} onClick={() => setSelectedQuestion(question)}>
                        <Flex direction={"column"}>
                            <Text color={"grey.800"} fontSize={["sm", null, "md", "xl"]} fontWeight={"bold"} cursor={"pointer"}>
                                {index + 1}. {question.question}
                            </Text>
                            <Text color={"grey.400"} fontSize={"xs"} pl={[2, null]} fontStyle={"italic"}>
                                {question.user.displayName}
                            </Text>
                        </Flex>
                        {
                            question.user.uid == user?.uid && <Flex gap={[3, null]}>
                                <IconButton
                                    size={["xs", null, "sm", "md"]}
                                    variant='outline'
                                    colorScheme='blue'
                                    aria-label='Edit Question'
                                    fontSize={['12px', null, null]}
                                    icon={<EditIcon />}
                                    onClick={() => navigate(`/question?id=${question.id}`)}
                                />
                                <IconButton
                                    size={["xs", null, "sm", "md"]}
                                    variant='outline'
                                    colorScheme='red'
                                    aria-label='Deleted Question'
                                    fontSize={['12px', null, null]}
                                    icon={<DeleteIcon />}
                                />
                            </Flex>
                        }
                    </Flex>
                })
            }
        </Flex> : <Loading />}
        <Preview selectedQuestion={selectedQuestion} setSelectedQuestion={setSelectedQuestion} />
    </>
}

export default Questions;