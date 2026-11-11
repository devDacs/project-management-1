"use client";

import { useGetUsersQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import Header from "@/components/Header";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import Image from "next/image";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 150,
    renderCell: ({ value, row: { username } }) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${value}`}
            alt={username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !users) return <div>Error fetching users</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      <div className="h-[650px] w-full">
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.id} // Optional: using "id" instead of "userId"
          pagination
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </div>
    </div>
  );
};

export default Users;
