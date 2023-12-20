import JLogger from "@/utils/logger";

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => JLogger("Connected to DB"))
  .catch((err: any) => JLogger(err));
