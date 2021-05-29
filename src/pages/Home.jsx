import React from "react";
import ItemView from "../components/item/ItemView";
import Layout from "../components/Layout";
import LocationView from "../components/location/LocationView";

export default function Home() {
  return (
    <Layout>
      <ItemView fetchData id="1" />
    </Layout>
  );
}
