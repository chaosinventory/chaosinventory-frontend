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
import { postEntity } from "../../services/entityService";
import { getProducts } from "../../services/productService";

export default function EntityForm() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    postEntity(data);
  };

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
          <FormLabel htmlFor="part_of">Part of</FormLabel>
          <Select
            placeholder="Select option"
            name="part_of"
            {...register("part_of", { valueAsNumber: true })}
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
