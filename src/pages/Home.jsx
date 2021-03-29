import React from "react";
import { Heading } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { getDataAuth, postDataAuth } from "../services/apiService";
import { getTags } from "../services/tagService";

export default function Home() {
  getTags().then((data) => {
    console.log(data);
  });

  return (
    <Layout>
      <Heading fontSize={"4xl"}>Welcome to Chaosinventory</Heading>
    </Layout>
  );
}
