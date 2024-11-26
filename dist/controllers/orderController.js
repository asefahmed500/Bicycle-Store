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
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const product_1 = __importDefault(require("../models/product")); // Correct import for Product model
const order_1 = __importDefault(require("../models/order"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, product, quantity } = req.body;
        if (!email || !product || !quantity) {
            return res.status(400).json({
                message: 'Email, product, and quantity are required',
                success: false,
            });
        }
        const productData = yield product_1.default.findById(product);
        if (!productData || productData.quantity < quantity) {
            return res.status(400).json({
                message: 'Insufficient stock for the product',
                success: false,
            });
        }
        const totalPrice = productData.price * quantity;
        const order = yield order_1.default.create({
            email,
            product,
            quantity,
            totalPrice,
        });
        productData.quantity -= quantity;
        yield productData.save();
        res.status(201).json({
            message: 'Order created successfully',
            success: true,
            data: order,
        });
    }
    catch (error) { // Declare error as 'unknown'
        if (error instanceof Error) { // Check if error is an instance of Error
            console.error(error.message); // Log the error message
            res.status(400).json({
                message: 'Failed to create order',
                success: false,
                error: error.message, // Safely access error message
            });
        }
        else {
            console.error(error); // In case the error is not of type 'Error'
            res.status(400).json({
                message: 'Failed to create order',
                success: false,
                error: 'An unknown error occurred',
            });
        }
    }
});
exports.createOrder = createOrder;
// Get All Orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.find().populate('product');
        res.status(200).json({
            message: 'Orders retrieved successfully',
            success: true,
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve orders',
            success: false,
            error,
        });
    }
});
exports.getAllOrders = getAllOrders;
// Get Order by ID
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_1.default.findById(req.params.id).populate('product');
        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
                success: false,
            });
        }
        res.status(200).json({
            message: 'Order retrieved successfully',
            success: true,
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve order',
            success: false,
            error,
        });
    }
});
exports.getOrderById = getOrderById;
// Update Order
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
                success: false,
            });
        }
        res.status(200).json({
            message: 'Order updated successfully',
            success: true,
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to update order',
            success: false,
            error,
        });
    }
});
exports.updateOrder = updateOrder;
// Delete Order
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_1.default.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
                success: false,
            });
        }
        res.status(200).json({
            message: 'Order deleted successfully',
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to delete order',
            success: false,
            error,
        });
    }
});
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=orderController.js.map