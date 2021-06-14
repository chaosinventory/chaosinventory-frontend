import React, { useEffect, useState } from "react";
import { Spinner, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { getTags } from "../../services/tagService";

export default function TagTable() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getTags().then(
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
      <Table width="100%">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Parent</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              {item.parent ? <Td>{item.parent.name}</Td> : <Td>...</Td>}
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }
}
