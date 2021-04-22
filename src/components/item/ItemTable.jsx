import React, { useEffect, useState } from "react";
import { getItems } from "../../services/itemService";
import {
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Spinner,
  Tr,
  Th,
  Td,
  HStack,
} from "@chakra-ui/react";
import InventoryTag from "../tag/InventoryTag";
import LocationLabel from "../location/LocationLabel";
import ProductLabel from "../product/ProductLabel";

export default function ItemTable() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems().then(
      (data) => {
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
            <Th>Typ</Th>
            <Th>Amount</Th>
            <Th>Location</Th>
            <Th>Belongs to</Th>
            <Th>Tags</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>
                <ProductLabel id={item.product} />
              </Td>
              <Td>{item.amount}</Td>
              <Td>
                {item.actual_location != null ? (
                  <LocationLabel id={item.actual_location} />
                ) : (
                  <>...</>
                )}
              </Td>
              <Td>{item.actual_item != null ? <>?</> : <>...</>}</Td>
              <Td>
                <HStack spacing={4}>
                  {item.tags.map((id) => (
                    <InventoryTag key={id} id={id} />
                  ))}
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }
}
