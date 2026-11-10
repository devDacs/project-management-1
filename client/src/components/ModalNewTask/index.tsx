import { formatISO } from "date-fns";
import React, { useState } from "react";
import Modal from "../Modal";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";

type Props = {
  id?: string | null;
  isOpen: boolean;
  onClose: () => void;
};

const inputStyles =
  "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

const selectStyles =
  "mb-4 block w-full rounded border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

const ModalNewTask = ({ id = null, isOpen, onClose }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = async () => {
    if (!title || !authorUserId || !(id || projectId)) {
      return;
    }

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedDueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    await createTask({
      title,
      description,
      status: Status[status as keyof typeof Status],
      priority: Priority[priority as keyof typeof Priority],
      tags,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
      projectId: id ? Number(id) : Number(projectId),
    });
  };

  const isFormValid = () => {
    return title && authorUserId && (id || projectId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            {Object.entries(Status).map(([key, value]) => (
              <option value={key}>{value}</option>
            ))}
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select Priority</option>
            {Object.entries(Priority).map(([key, value]) => (
              <option value={key}>{value}</option>
            ))}
          </select>
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        {!id && (
          <input
            type="text"
            className={inputStyles}
            placeholder="Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        )}
        <input
          type="text"
          className={inputStyles}
          placeholder="Author User ID"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Assigned User ID"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        <button
          type="submit"
          disabled={!isFormValid() || isLoading}
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
