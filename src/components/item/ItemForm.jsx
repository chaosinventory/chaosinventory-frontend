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
import { getProducts } from "../../services/productService";

export default function ItemForm() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    getProducts().then(
      (d) => {
        setIsLoaded(true);
        setData(d);
      },
      (e) => {
        setIsLoaded(true);
        setError(e);
      }
    );
  }, []);

  if (error) {
    return <Alert status="error">{error.message}</Alert>;
  } else if (!isLoaded) {
    return <Spinner />;
  } else {
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
        <FormControl>
          <FormLabel htmlFor="amount">Amount</FormLabel>
          <NumberInput
            name="amount"
            {...register("amount")}
            defaultValue={1}
            min={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="product">Product</FormLabel>
          <Select
            placeholder="Select option"
            name="product"
            {...register("product")}
          >
            {data.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button type="submit">Submit</Button>
      </form>
    );
  }
}
