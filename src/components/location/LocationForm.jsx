import {
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
import { getEntities } from "../../services/entityService";
import { getLocations } from "../../services/locationService";

export default function LocationForm() {
  const [error, setError] = useState(null);
  const [locationsIsLoaded, setLocationsIsLoaded] = useState(false);
  const [entitesIsLoaded, setEntitiesIsLoaded] = useState(false);
  const [locations, setLocations] = useState([]);
  const [entities, setEntities] = useState([]);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    getLocations().then(
      (d) => {
        setLocationsIsLoaded(true);
        setLocations(d);
      },
      (e) => {
        setLocationsIsLoaded(true);
        setError(e);
      }
    );
  }, []);

  useEffect(() => {
    getEntities().then(
      (d) => {
        setEntitiesIsLoaded(true);
        setEntities(d);
      },
      (e) => {
        setEntitiesIsLoaded(true);
        setError(e);
      }
    );
  }, []);

  if (error) {
    return <Alert status="error">{error.message}</Alert>;
  } else if (!locationsIsLoaded) {
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
          <FormLabel htmlFor="location">Location</FormLabel>
          <Select
            placeholder="Select option"
            name="location"
            {...register("location")}
          >
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="belongs_to">Belongs to</FormLabel>
          <Select
            placeholder="Select option"
            name="belongs_to"
            {...register("belongs_to")}
          >
            {entities.map((entity) => (
              <option key={entity.id} value={entity.id}>
                {entity.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button type="submit">Submit</Button>
      </form>
    );
  }
}
