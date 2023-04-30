import React from "react";
import { Box, Link } from "@chakra-ui/react";

const Footer: React.FC = () => {
    return <Box as="footer" bottom="0" width="100%" textAlign="center" py="4" bgColor={"white"}>
        With 💚 from <Link href='https://github.com/adharshchottu' color='green.400' isExternal>adharshchottu</Link>
    </Box>;
};

export default Footer;