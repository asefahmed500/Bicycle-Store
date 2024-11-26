"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
router.post('/', orderController_1.createOrder); // Create an order
router.get('/', orderController_1.getAllOrders); // Get all orders
router.get('/:id', orderController_1.getOrderById); // Get order by ID
router.put('/:id', orderController_1.updateOrder); // Update order by ID
router.delete('/:id', orderController_1.deleteOrder); // Delete order by ID
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map