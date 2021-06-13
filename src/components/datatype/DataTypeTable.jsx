import React, { useEffect, useState } from "react";
import {
  Spinner,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { deleteDatatype, getDatatypes } from "../../services/datatypeService";
import DataTypeForm from "./DataTypeForm";

export default function DataTypeTable() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  let [updateInc, setUpdateInc] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getDatatypes().then(
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
  }, [updateInc]);

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
      <>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Note</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.note}</Td>
                <Td>
                  <Button
                    onClick={() => {
                      setSelectedData(item);
                      onOpen();
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      deleteDatatype(item.id);
                      setUpdateInc(updateInc + 1);
                    }}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <DataTypeForm
                type="edit"
                id={selectedData.id}
                data={selectedData}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
}
