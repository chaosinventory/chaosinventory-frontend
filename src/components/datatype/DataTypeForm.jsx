import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  patchDatatype,
  postDatatype,
  putDatatype,
} from "../../services/datatypeService";
import PropTypes from "prop-types";
import DataUpdateContext from "../../context/DataUpdateContext";

function DataTypeForm({ type, id, data }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();
  const { lastUpdate, setLastUpdate } = useContext(DataUpdateContext);
  let onSubmit;

  if (type === "edit") {
    onSubmit = (data) => {
      patchDatatype(id, data).then(
        (data) => {
          setLastUpdate(Date.now());
          toast({
            title: "Created",
            description: `The datatype ${data.name} with the id ${data.id} has been updated`,
            status: "success",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
        },
        (err) => {
          toast({
            title: "Error",
            description: err.message,
            status: "error",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
        }
      );
    };
  } else {
    onSubmit = (data) => {
      postDatatype(data).then(
        (data) => {
          setLastUpdate(Date.now());
          toast({
            title: "Created",
            description: `The datatype ${data.name} with the id ${data.id} has been created`,
            status: "success",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
        },
        (err) => {
          toast({
            title: "Error",
            description: err.message,
            status: "error",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
        }
      );
    };
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          defaultValue={type === "edit" ? data.name : null}
          name="name"
          placeholder="Name"
          {...register("name", { required: "Name is required!" })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel htmlFor="note">Note</FormLabel>
        <Textarea
          defaultValue={type === "edit" ? data.note : null}
          name="note"
          placeholder="Note"
          {...register("note")}
        />
      </FormControl>

      <Button mt={4} isLoading={isSubmitting} colorScheme="green" type="submit">
        Submit
      </Button>
    </form>
  );
}

DataTypeForm.propTypes = {
  type: PropTypes.oneOf(["create", "edit"]),
  id: PropTypes.number,
  data: PropTypes.object,
};

export default DataTypeForm;
