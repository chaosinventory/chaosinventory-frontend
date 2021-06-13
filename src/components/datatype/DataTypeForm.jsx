import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import {
  patchDatatype,
  postDatatype,
  putDatatype,
} from "../../services/datatypeService";
import PropTypes from "prop-types";

function DataTypeForm({ type, id, data }) {
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  let onSubmit;

  if (type === "edit") {
    onSubmit = (data) => {
      console.log(data);
      patchDatatype(id, data);
    };
  } else {
    onSubmit = (data) => {
      postDatatype(data).then(
        (data) => {
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
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          defaultValue={type === "edit" ? data.name : null}
          name="name"
          placeholder="name"
          {...register("name")}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="note">Note</FormLabel>
        <Textarea
          defaultValue={type === "edit" ? data.note : null}
          name="note"
          placeholder="note"
          {...register("note")}
        />
      </FormControl>

      <Button type="submit">Submit</Button>
    </form>
  );
}

DataTypeForm.propTypes = {
  type: PropTypes.oneOf(["create", "edit"]),
  id: PropTypes.number,
  data: PropTypes.object,
};

export default DataTypeForm;
