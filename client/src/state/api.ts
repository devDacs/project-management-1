import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export interface User {
  id?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: string;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: string;
  uploadedById: number;
}

export interface SearchResults {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
}

export interface Team {
  teamId: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: number;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await fetchAuthSession();
      const { accessToken } = session.tokens ?? {};

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
      transformResponse: (response: { success: boolean; data: Project[] }) =>
        response.data,
    }),
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
    getTasksByProjectId: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks/project/${projectId}`,
      transformResponse: (response: { success: boolean; data: Task[] }) =>
        response.data,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatusById: build.mutation<
      Task,
      { taskId: number; status: string }
    >({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),
    search: build.query<SearchResults, string>({
      query: (query) => `search?query=${query}`,
      transformResponse: (response: {
        success: boolean;
        data: SearchResults;
      }) => response.data,
    }),
    getUsers: build.query<User[], void>({
      query: () => "users",
      transformResponse: (response: { success: boolean; data: User[] }) =>
        response.data,
      providesTags: ["Users"],
    }),
    getTeams: build.query<Team[], void>({
      query: () => "teams",
      transformResponse: (response: { success: boolean; data: Team[] }) =>
        response.data,
      providesTags: ["Teams"],
    }),
    getTasksByUserId: build.query<Task[], number>({
      query: (userId) => `tasks/user/${userId}`,
      transformResponse: (response: { success: boolean; data: Task[] }) =>
        response.data,
      providesTags: (result, error, userId) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks", id }))
          : [{ type: "Tasks", id: userId }],
    }),
    getAuthUser: build.query({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const user = await getCurrentUser();
          const session = await fetchAuthSession();

          if (!session) {
            throw new Error("No session found");
          }

          const { userSub } = session;

          const userDetailsResponse = await fetchWithBQ(`users/${userSub}`);

          if (userDetailsResponse.error) {
            return { error: userDetailsResponse.error };
          }

          const userDetails = (
            userDetailsResponse.data as {
              success: boolean;
              data: User;
            }
          ).data;

          return { data: { user, userSub, userDetails } };
        } catch (error: any) {
          return { error: error.message || "Could not fetch user data" };
        }
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksByProjectIdQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusByIdMutation,
  useSearchQuery,
  useGetUsersQuery,
  useGetTeamsQuery,
  useGetTasksByUserIdQuery,
  useGetAuthUserQuery,
} = api;
