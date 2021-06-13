import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { postDatatype } from "../../services/datatypeService";

export default function DataTypeForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    postDatatype(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input name="name" placeholder="name" {...register("name")} />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="name">Note</FormLabel>
        <Textarea name="note" placeholder="note" {...register("note")} />
      </FormControl>

      <Button type="submit">Submit</Button>
    </form>
  );
}
