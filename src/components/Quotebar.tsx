import { Box, Center, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { quotes } from "./quotes";

export default function Quotebar() {
    const [quotes, setQuotes] = useState<quotes[] | null>(null);
    const [quote,setQuote] = useState<quotes | null>(null);
    useEffect(() => {
        import('./quotes')
            .then((d) => {
                setQuotes(d.quotes);
            })
            .catch((error) => console.error(error));
    }, [])

    useEffect(() => {
        const random = quotes ? Math.floor(Math.random() * quotes.length) : 0;
        const randomQuote = quotes && quotes[random];
        setQuote(randomQuote);
    },[quotes])

    return <>
        <Center>
            <Box marginBlock={4}>
                {
                    quote && (
                        <Heading as='h2' size='lg' p={5} textAlign="center">
                            <i>
                                “{quote.quote}”
                            </i>
                            <br />
                            ~ {quote.quoter}
                        </Heading>
                    )
                }
            </Box>
        </Center>
    </>
}