import React, { useEffect, useState } from "react";
import { Spinner, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { getEntities } from "../../services/entityService";
import TagList from "../tag/TagList";

export default function EntityTable() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getEntities().then(
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
            <Th>Part of</Th>
            <Th>Tags</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.note}</Td>
              <Td>{item.part_of ? item.part_of.name : "Nothing"}</Td>
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
