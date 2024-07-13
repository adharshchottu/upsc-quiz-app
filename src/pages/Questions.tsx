import { Button, Flex, Heading, IconButton, Spinner, Text, useToast } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
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

const Questions: React.FC = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<questionInterface[]>([])
    const toast = useToast()
    const { user } = useContext(AuthContext);

    const FetchQuestions = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "questions"));
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
                    return <Flex justifyContent={"space-between"} alignItems={"center"} key={question.id} gap={"2"}>
                        <Flex direction={"column"}>
                            <Text color={"grey.800"} fontSize={["sm", null, "md", "xl"]} fontWeight={"bold"}>
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
    </>
}

export default Questions;