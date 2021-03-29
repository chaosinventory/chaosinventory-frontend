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
import { useHistory } from "react-router";
import { authenticationService } from "../services/authenticationService";

function logout(history) {
  authenticationService.logout();
  history.push("/login");
}

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
        <Box>
          <Text>Navbar</Text>
          <Button
            onClick={() => {
              logout(history);
            }}
          >
            Logout
          </Button>
        </Box>

        <Box>{props.children}</Box>
        <Footer />
      </Flex>
    </>
  );
}
