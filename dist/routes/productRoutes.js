"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
router.post('/', productController_1.createProduct); // Create a bicycle
router.get('/', productController_1.getAllProducts); // Get all bicycles
router.get('/:id', productController_1.getProductById); // Get bicycle by ID
router.put('/:id', productController_1.updateProduct); // Update bicycle by ID
router.delete('/:id', productController_1.deleteProduct); // Delete bicycle by ID
exports.default = router;
//# sourceMappingURL=productRoutes.js.map