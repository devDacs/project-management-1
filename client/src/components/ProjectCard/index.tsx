import { Project } from "@/state/api";
import React from "react";
import { format } from "date-fns";

type Props = {
  project: Project;
};

const ProjectCard = ({
  project: { name, description, startDate, endDate },
}: Props) => {
  const formattedStartDate = startDate ? format(new Date(startDate), "P") : "";
  const formattedEndDate = endDate ? format(new Date(endDate), "P") : "";

  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      <p>{name}</p>
      <p>{description || "No description provided"}</p>
      <span>
        {formattedStartDate} - {formattedEndDate}
      </span>
    </div>
  );
};

export default ProjectCard;
