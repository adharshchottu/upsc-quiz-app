import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase-app";
import { useNavigate } from "react-router-dom";
import { Button, Center, Flex, Heading } from "@chakra-ui/react";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const loginWithgoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => {
                navigate("/questions")
            }).catch((error) => {
                console.log(error)
            });
    }

    return <>
        <Flex direction={"column"} align={"center"} m={"20"} gap={6}>
            <Heading as='h3' size='lg'>
                Log in to Prelims Question Portal
            </Heading>
            <Center>

            <Button colorScheme='green' onClick={loginWithgoogle}>Login in with Google</Button>
            </Center>
        </Flex>
    </>
};

export default Login;