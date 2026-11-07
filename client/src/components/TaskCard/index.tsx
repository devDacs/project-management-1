import { Task } from "@/state/api";
import React from "react";
import { format } from "date-fns";
import Image from "next/image";

type Props = {
  task: Task;
};

const TaskCard = ({
  task: {
    attachments,
    id,
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    author,
    assignee,
  },
}: Props) => {
  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {attachments && attachments.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          <div className="flex flex-wrap">
            <Image
              src={`/${attachments[0].fileURL}`}
              alt={`/${attachments[0].fileName}`}
              width={400}
              height={200}
              className="h-auto w-full rounded-t-md"
            />
          </div>
        </div>
      )}

      <p>
        <strong>ID:</strong> {id}
      </p>

      <p>
        <strong>Title:</strong> {title}
      </p>

      <p>
        <strong>Description:</strong> {description || "No description provided"}
      </p>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <p>
        <strong>Priority:</strong> {priority}
      </p>

      <p>
        <strong>Tags:</strong> {tags || "No tags"}
      </p>

      <p>
        <strong>Start Date:</strong>{" "}
        {startDate ? format(new Date(startDate), "P") : ""}
      </p>

      <p>
        <strong>Due Date:</strong>{" "}
        {dueDate ? format(new Date(dueDate), "P") : ""}
      </p>

      <p>
        <strong>Author:</strong> {author ? author.username : "Unknown"}
      </p>

      <p>
        <strong>Assignee:</strong> {assignee ? assignee.username : "Unassigned"}
      </p>
    </div>
  );
};

export default TaskCard;
