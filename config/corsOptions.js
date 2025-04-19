import allowedOrigin from "./allowedOrigins.js";

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed cors"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
