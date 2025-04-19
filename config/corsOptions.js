// import allowedOrigin from "./allowedOrigins.js";

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed cors"));
//     }
//   },
//   optionsSuccessStatus: 200,
// };

// export default corsOptions;
const corsOptions = {
  origin: [
    "https://back-end-project.vercel.app", // Replace with your Vercel URL
    "http://localhost:3500",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
export default corsOptions;
