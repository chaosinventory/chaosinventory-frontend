import React, { useEffect, useState, useMemo } from "react";
import { Spinner, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { deleteTag, getTags } from "../../services/tagService";
import { useContext } from "react";
import DataUpdateContext from "../../context/DataUpdateContext";
import { DeleteButton, EditButton } from "../button/Button";
import { useTable } from "react-table";

export default function TagTable() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const { lastUpdate, setLastUpdate } = useContext(DataUpdateContext);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ cell: { value } }) => <>#{value}</>,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Parent",
        accessor: "parent",
        Cell: ({ cell: { value } }) => (
          <>{value ? `${value.name} (#${value.id})` : "..."}</>
        ),
      },
      {
        Header: "Options",
        Cell: ({ cell }) => (
          <>
            <DeleteButton
              onClick={() => {
                deleteTag(cell.row.values.id);
                setLastUpdate(Date.now());
              }}
            />
          </>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    getTags().then(
      (data) => {
        setIsLoaded(true);
        setItems(data);
      },
      (err) => {
        setIsLoaded(true);
        setError(err);
      }
    );
  }, [lastUpdate]);

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
    return <TagTableContainer data={items} columns={columns} />;
  }
}

function TagTableContainer({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <Table variant="simple" size="sm" {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
