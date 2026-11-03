import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

/* ROUTE IMPORTS */
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";

/* CONFIGURATION */
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

/* MIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  }),
);

app.use(morgan("common"));

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

/* ROUTES */
app.get("/", (req, res) => {
  res.send("This is home route");
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

/* START SERVER */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
