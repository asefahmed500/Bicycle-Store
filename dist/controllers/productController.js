"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
// Create a Bicycle
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.create(req.body);
        res.status(201).json({
            message: 'Bicycle created successfully',
            success: true,
            data: products,
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Failed to create bicycle',
            success: false,
            error,
        });
    }
});
exports.createProduct = createProduct;
// Get All Bicycles
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find();
        res.status(200).json({
            message: 'Bicycles retrieved successfully',
            success: true,
            data: products,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve bicycles',
            success: false,
            error,
        });
    }
});
exports.getAllProducts = getAllProducts;
// Get Bicycle by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.findById(req.params.id);
        if (!products) {
            return res.status(404).json({
                message: 'Bicycle not found',
                success: false,
            });
        }
        res.status(200).json({
            message: 'Bicycle retrieved successfully',
            success: true,
            data: products,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve bicycle',
            success: false,
            error,
        });
    }
});
exports.getProductById = getProductById;
// Update Bicycle
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!products) {
            return res.status(404).json({
                message: 'Bicycle not found',
                success: false,
            });
        }
        res.status(200).json({
            message: 'Bicycle updated successfully',
            success: true,
            data: products,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to update bicycle',
            success: false,
            error,
        });
    }
});
exports.updateProduct = updateProduct;
// Delete Bicycle
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.findByIdAndDelete(req.params.id);
        if (!products) {
            return res.status(404).json({
                message: 'Bicycle not found',
                success: false,
            });
        }
        res.status(200).json({
            message: 'Bicycle deleted successfully',
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to delete bicycle',
            success: false,
            error,
        });
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map