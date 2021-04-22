import React, { useEffect, useState } from "react";
import { getTag } from "../../services/tagService";
import { Tag } from "@chakra-ui/react";

export default function InventoryTag(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getTag(props.id).then(
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
    return <>{error.message}</>;
  } else if (!isLoaded) {
    return <>...</>;
  } else {
    return <Tag>{data.name}</Tag>;
  }
}
