import express from "express";
import cors from "cors";
import tuyenDuongRoutes from "./routes/TuyenDuongRoute";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tuyen-duong", tuyenDuongRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚍 Server chạy tại http://localhost:${PORT}`);
});
