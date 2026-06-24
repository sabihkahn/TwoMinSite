import express, { Application, Request, Response } from "express";
import logger from "./utils/logger";
import "dotenv/config";
import { DBconnection } from "./db/db";
import userRoutes from "./routes/userRoutes";
import cookieparser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import websiteRoutes from "./routes/GenrateWebsiteRoutes";
import dashbordroutes from "./routes/DashboardRoutes";
import cors, { CorsOptions } from "cors";
import sendemailroute from "./routes/sendemail";

DBconnection();

const app: Application = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 120,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

const corsOptions: CorsOptions = {
  origin: [
   process.env.FRONTEND_URL!,
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(limiter);
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieparser());
app.use(cors(corsOptions));

app.use("/auth/user", userRoutes);
app.use("/web", websiteRoutes);
app.use("/data", dashbordroutes);
app.use("/mail", sendemailroute);

app.get("/", (req: Request, res: Response) => {
  try {
    logger.info("successfully get ");
    res.status(200).send({ message: "all set project init" });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: "something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
