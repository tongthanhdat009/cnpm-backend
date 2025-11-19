"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BusTrackingController_1 = __importDefault(require("../controllers/BusTrackingController"));
const websocket_1 = require("../websocket");
const router = (0, express_1.Router)();
// POST /api/v1/bus-tracking/update-location - Cập nhật vị trí xe buýt
router.post("/update-location", (req, res) => BusTrackingController_1.default.updateBusLocation(req, res));
// GET /api/v1/bus-tracking/bus/:id - Lấy vị trí xe buýt hiện tại
router.get("/bus/:id", (req, res) => BusTrackingController_1.default.getBusLocation(req, res));
// GET /api/v1/bus-tracking/trip/:id - Lấy vị trí xe của chuyến đi
router.get("/trip/:id", (req, res) => BusTrackingController_1.default.getActiveTripBusLocation(req, res));
// GET /api/v1/bus-tracking/student/:id/active-trips - Lấy chuyến đi đang hoạt động của học sinh
router.get("/student/:id/active-trips", (req, res) => BusTrackingController_1.default.getActiveTripsForStudent(req, res));
// GET /api/v1/bus-tracking/ws-stats - Monitoring WebSocket stats
router.get("/ws-stats", (req, res) => {
    try {
        const stats = (0, websocket_1.getWebSocketStats)();
        res.json({
            success: true,
            message: "WebSocket statistics",
            data: stats
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting WebSocket stats",
            error: error.message
        });
    }
});
exports.default = router;
//# sourceMappingURL=BusTrackingRoute.js.map