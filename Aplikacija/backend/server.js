const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/recipeLikes", require("./routes/recipeLikesRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/ingredients", require("./routes/ingredientRoutes"));
app.use("/api/recipes", require("./routes/recipeRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
