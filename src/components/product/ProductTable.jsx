import React, { useEffect, useState } from "react";
import { Spinner, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import TagList from "../tag/TagList";
import { getProducts } from "../../services/productService";

export default function ProductTable() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getProducts().then(
      (data) => {
        console.log(data);
        setIsLoaded(true);
        setItems(data);
      },
      (err) => {
        setIsLoaded(true);
        setError(err);
      }
    );
  }, []);

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  } else if (!isLoaded) {
    return <Spinner />;
  } else {
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Note</Th>
            <Th>Tags</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.note}</Td>
              <Td>
                <TagList data={item.tags} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }
}
