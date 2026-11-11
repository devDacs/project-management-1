import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { useGetTasksByProjectIdQuery } from "@/state/api";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import Image from "next/image";
import Button from "@/components/Button";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const statusColors = (status: string) => {
  if (status === "To Do") return "bg-blue-100 text-blue-800";
  if (status === "Work In Progress") return "bg-green-100 text-green-800";
  if (status === "Under Review") return "bg-orange-100 text-orange-800";
  return "bg-gray-100 text-gray-800";
};

const priorityColors = (priority: string) => {
  if (priority === "Urgent") return "bg-red-100 text-red-800";
  if (priority === "High") return "bg-yellow-100 text-yellow-800";
  if (priority === "Medium") return "bg-green-100 text-green-800";
  if (priority === "Low") return "bg-blue-100 text-blue-800";
  return "bg-gray-100 text-gray-800";
};

export const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: ({ value }) => (
      <span
        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColors(value)}`}
      >
        {value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
    renderCell: ({ value }) => (
      <span
        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${priorityColors(value)}`}
      >
        {value}
      </span>
    ),
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
    renderCell: ({ value }) => format(new Date(value), "P"),
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
    renderCell: ({ value }) => format(new Date(value), "P"),
  },
  {
    field: "author",
    headerName: "Author",
    width: 100,
    renderCell: ({ value }) =>
      !value ? (
        "Unknown"
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-9 w-9">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${value.profilePictureUrl!}`}
              alt={value.username}
              width={100}
              height={50}
              className="h-full rounded-full object-cover"
            />
          </div>
        </div>
      ),
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 100,
    renderCell: ({ value }) =>
      !value ? (
        "Unassigned"
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-9 w-9">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${value.profilePictureUrl!}`}
              alt={value.username}
              width={100}
              height={50}
              className="h-full rounded-full object-cover"
            />
          </div>
        </div>
      ),
  },
  // {
  //   field: "author",
  //   headerName: "Author",
  //   width: 150,
  //   renderCell: ({ value: { username } }) => username || "Unknown",
  // },
  // {
  //   field: "assignee",
  //   headerName: "Assignee",
  //   width: 150,
  //   renderCell: ({ value }) => value?.username || "Unassigned",
  // },
];

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksByProjectIdQuery({ projectId: Number(id) });

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          isSmallText
          buttonComponent={
            <Button
              label="Add New Task"
              onClick={() => setIsModalNewTaskOpen(true)}
            />
          }
        />
      </div>

      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
};

export default TableView;
