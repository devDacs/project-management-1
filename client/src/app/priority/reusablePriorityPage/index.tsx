import { columns } from "@/app/projects/TableView";
import { useAppSelector } from "@/app/redux";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalNewTask from "@/components/ModalNewTask";
import TaskCard from "@/components/TaskCard";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import {
  Priority,
  Task,
  useGetAuthUserQuery,
  useGetTasksByUserIdQuery,
} from "@/state/api";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";

type Props = {
  priority: Priority;
};

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const { data: currentUser } = useGetAuthUserQuery({});
  const userId = currentUser?.userDetails?.id ?? null;

  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksByUserIdQuery(userId || 0, {
    skip: userId === null,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );

  if (isError || !tasks) return <div>Error fetching tasks</div>;

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name="Priority Page"
        buttonComponent={
          <Button
            label="Add Task"
            onClick={() => setIsModalNewTaskOpen(true)}
          />
        }
      />

      <div className="mb-4 flex justify-start">
        <button
          className={`rounded-l px-4 py-2 ${
            view === "list" ? "bg-gray-300" : "bg-white"
          }`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`rounded-r px-4 py-2 ${
            view === "table" ? "bg-gray-300" : "bg-white"
          }`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks &&
            filteredTasks.map((task: Task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;
