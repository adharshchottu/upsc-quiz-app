import { Box, Flex, Spacer, Text, Button, HStack } from "@chakra-ui/react"
import { Link } from 'react-router-dom'

const Daysleft = () => {

    // days left
    const oneDay = 24 * 60 * 60 * 1000;
    const today: any = new Date();
    const examDate: any = new Date(2023, 4, 27);
    const examDays = Math.round((examDate - today) / oneDay);
    const examName = "prelims";


    return <>
        {
            examDays > 0
                ?
                <HStack whiteSpace="nowrap">
                    <Text fontSize={['md', '3xl']} color="green" >You have </Text>
                    <Text fontSize={['2xl', '5xl']} color="red" fontWeight="bold">{examDays}</Text>
                    <Text fontSize={['md', '3xl']} color="green"  > day{examDays > 1 ? `s` : ``} left till {examName}</Text>
                </HStack>
                :
                <Text fontSize={['lg', '4xl']} color="red">Your days are over</Text>
        }

    </>


}

const Navbar = () => {
    return <Flex m={3}>
        <Box w='70%'>
            <Daysleft />
        </Box>
        <Spacer />
        <Flex w='25%' alignItems={"center"} justifyContent={"flex-end"}>
            <Link to="/"><Button colorScheme='blue' size={['sm', 'md']}>Home</Button></Link>
        </Flex>
    </Flex>

}

export default Navbar