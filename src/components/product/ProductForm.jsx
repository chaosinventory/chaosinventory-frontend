import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
  FormControl,
  Input,
  Select,
  Button,
  Textarea,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getProducts, postProduct } from "../../services/productService";

export default function ProductForm() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    postProduct(data);
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
