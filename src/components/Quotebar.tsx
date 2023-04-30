import { Box, Center, Heading } from "@chakra-ui/react";
import {quotes} from "./quotes.js"

export default function Quotebar() {
    const random = Math.floor(Math.random() * quotes.length);
    const quote = quotes[random]
    return <>
        <Center>
            <Box marginBlock={4}>
                <Heading as='h2' size='lg' p={5} textAlign="center">
                    <i>
                        “{quote.quote}”
                    </i>
                    <br />
                    ~ {quote.quoter}
                </Heading>
            </Box>
        </Center>
    </>
}