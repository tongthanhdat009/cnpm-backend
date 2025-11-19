"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaiXeController = void 0;
const TaiXeService_1 = __importDefault(require("../services/TaiXeService"));
// Normalize import shape once at module level
const taiXeServiceInstance = (TaiXeService_1.default && TaiXeService_1.default.default) || TaiXeService_1.default;
// Debug: inspect resolved service shape
console.log('resolved taiXeServiceInstance =>', typeof taiXeServiceInstance, Object.keys(taiXeServiceInstance || {}));
class TaiXeController {
    constructor() {
        this.service = taiXeServiceInstance;
    }
    async getAll(req, res) {
        const result = await this.service.getAllTaiXe();
        if (result.success)
            return res.status(200).json(result);
        return res.status(500).json(result);
    }
    async getById(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ success: false, message: 'Thiếu tham số id' });
        const idNumber = parseInt(id, 10);
        if (Number.isNaN(idNumber))
            return res.status(400).json({ success: false, message: 'id không hợp lệ' });
        const result = await this.service.getTaiXeById(idNumber);
        if (result.success)
            return res.status(200).json(result);
        return res.status(404).json(result);
    }
    async create(req, res) {
        const payload = req.body;
        const result = await this.service.createTaiXe(payload);
        if (result.success)
            return res.status(201).json(result);
        // conflict or validation errors are surfaced from service
        return res.status(400).json(result);
    }
    async update(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ success: false, message: 'Thiếu tham số id' });
        const idNumber = parseInt(id, 10);
        if (Number.isNaN(idNumber))
            return res.status(400).json({ success: false, message: 'id không hợp lệ' });
        try {
            console.debug('[TaiXeController] update incoming:', { id: idNumber, body: req.body });
            const result = await this.service.updateTaiXe(idNumber, req.body);
            console.debug('[TaiXeController] update result:', result);
            if (result.success)
                return res.status(200).json(result);
            // For known failures, propagate 400 with details
            return res.status(400).json(result);
        }
        catch (err) {
            console.error('[TaiXeController] update unexpected error:', err?.message ?? err);
            return res.status(500).json({ success: false, message: 'Lỗi server khi cập nhật tài xế', error: err?.message });
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ success: false, message: 'Thiếu tham số id' });
        const idNumber = parseInt(id, 10);
        if (Number.isNaN(idNumber))
            return res.status(400).json({ success: false, message: 'id không hợp lệ' });
        try {
            console.debug('[TaiXeController] delete incoming id =>', idNumber);
            // Accept optional replacement id via query param or body
            const replaceWithRaw = req.query.replace_with ?? req.body?.replace_with;
            const replaceWithId = replaceWithRaw ? parseInt(String(replaceWithRaw), 10) : undefined;
            if (replaceWithRaw && Number.isNaN(replaceWithId)) {
                return res.status(400).json({ success: false, message: 'replace_with không hợp lệ' });
            }
            const result = await this.service.deleteTaiXe(idNumber, replaceWithId);
            console.debug('[TaiXeController] delete result =>', result);
            if (result.success)
                return res.status(200).json(result);
            // If HAS_TRIPS, return 409 Conflict to indicate required action
            if (result.code === 'HAS_TRIPS' || result.code === 'REPLACE_CONFLICT')
                return res.status(409).json(result);
            return res.status(400).json(result);
        }
        catch (err) {
            console.error('[TaiXeController] delete unexpected error:', err?.message ?? err);
            return res.status(500).json({ success: false, message: 'Lỗi server khi xóa tài xế', error: err?.message });
        }
    }
}
exports.TaiXeController = TaiXeController;
exports.default = new TaiXeController();
//# sourceMappingURL=TaiXeController.js.map