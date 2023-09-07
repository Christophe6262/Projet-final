require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

//config pour l'upload de fichiers
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// middlewares
const notFound = require("./middlewares/notFoundMiddleware.js");
const errorHandler = require("./middlewares/errorHandlerMiddleware.js");

// routers
const authRouter = require("./routes/authRoutes.js");
const parkingRouter = require("./routes/parkingRoutes.js");
const userRouter = require("./routes/userRoutes.js");

app.use(helmet());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/items", parkingRouter);
app.use("/api/v1/users", userRouter);

app.use(notFound);
app.use(errorHandler);

const port = 5000;
app.listen(port, () => console.log(`Server is listening on ${port}...`));
