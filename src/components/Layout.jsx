import React from "react";
import {
  Box,
  Flex,
  Square,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useHistory } from "react-router";

export default function Layout(props) {
  let history = useHistory();

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"space-between"}
        flexDirection={"column"}
      >
        <Navbar />
        <Box>{props.children}</Box>
        <Footer />
      </Flex>
    </>
  );
}
