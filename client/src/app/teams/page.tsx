"use client";

import { useGetTeamsQuery } from "@/state/api";
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
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  {
    field: "productOwner",
    headerName: "Product Owner",
    width: 150,
    renderCell: ({ row: { productOwner } }) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          {!productOwner ? (
            "Unassigned"
          ) : (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${productOwner?.profilePictureUrl}`}
              alt={productOwner?.username}
              width={100}
              height={50}
              className="h-full rounded-full object-cover"
            />
          )}
        </div>
      </div>
    ),
  },
  {
    field: "projectManager",
    headerName: "Project Manager",
    width: 150,
    renderCell: ({ row: { projectManager } }) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          {!projectManager ? (
            "Unassigned"
          ) : (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${projectManager?.profilePictureUrl}`}
              alt={projectManager?.username}
              width={100}
              height={50}
              className="h-full rounded-full object-cover"
            />
          )}
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

const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !teams) return <div>Error fetching teams</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div className="h-[650px] w-full">
        <DataGrid
          rows={teams || []}
          columns={columns}
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

export default Teams;
