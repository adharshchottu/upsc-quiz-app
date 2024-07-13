import { Box, Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase-app";
import { customUserInfo } from "../auth/AuthContext";
import { optionsInterface } from "./Question";

export interface questionInterface {
    id: string;
    question: string;
    explanation: string;
    answer: string;
    options: optionsInterface;
    questionOptions: string[];
    user: customUserInfo;
}

const AddQuestion = () => {
    const navigate = useNavigate();
    return <>
        <Button onClick={() => {
            navigate("/question")
        }}>Add Question</Button>
    </>
}

const Questions: React.FC = () => {
    const [questions, setQuestions] = useState<questionInterface[]>([])
    const toast = useToast()

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
            <Heading textAlign={"center"} color={"teal"}>Questions</Heading>
            <AddQuestion />
        </Flex>
        <Flex direction={"column"} gap={4} mx={56} my={16}>
            {
                questions.map((question,index) => {
                    return <Box key={question.id}>
                        <Text color={"grey.800"} fontSize={"lg"} fontWeight={"bold"}>
                            {index+1}. {question.question}
                        </Text>
                        <Text color={"grey.400"} fontSize={"sm"} pl={4}>
                            {question.options.optionOne}
                        </Text>
                    </Box>
                })
            }
        </Flex>
    </>
}

export default Questions;