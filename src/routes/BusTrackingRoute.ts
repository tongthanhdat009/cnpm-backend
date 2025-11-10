import { Router } from "express";
import BusTrackingController from "../controllers/BusTrackingController";
import { getWebSocketStats } from "../websocket";

const router = Router();

// POST /api/v1/bus-tracking/update-location - Cập nhật vị trí xe buýt
router.post("/update-location", (req, res) => 
    BusTrackingController.updateBusLocation(req, res)
);

// GET /api/v1/bus-tracking/bus/:id - Lấy vị trí xe buýt hiện tại
router.get("/bus/:id", (req, res) => 
    BusTrackingController.getBusLocation(req, res)
);

// GET /api/v1/bus-tracking/trip/:id - Lấy vị trí xe của chuyến đi
router.get("/trip/:id", (req, res) => 
    BusTrackingController.getActiveTripBusLocation(req, res)
);

// GET /api/v1/bus-tracking/student/:id/active-trips - Lấy chuyến đi đang hoạt động của học sinh
router.get("/student/:id/active-trips", (req, res) => 
    BusTrackingController.getActiveTripsForStudent(req, res)
);

// GET /api/v1/bus-tracking/ws-stats - Monitoring WebSocket stats
router.get("/ws-stats", (req, res) => {
    try {
        const stats = getWebSocketStats();
        res.json({
            success: true,
            message: "WebSocket statistics",
            data: stats
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error getting WebSocket stats",
            error: error.message
        });
    }
});

export default router;
