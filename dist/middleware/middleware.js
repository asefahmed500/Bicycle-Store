"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.routeNotFoundHandler = exports.setupMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const setupMiddleware = (app) => {
    // Enable CORS
    app.use((0, cors_1.default)());
    // Serve static files from the 'public' directory
    app.use(express_1.default.static('public'));
    // Parse JSON request bodies
    app.use(express_1.default.json());
    // Parse URL-encoded request bodies
    app.use(express_1.default.urlencoded({ extended: true }));
    // A simple logger middleware (Optional)
    app.use((req, res, next) => {
        console.log(`[${req.method}] ${req.url}`);
        next();
    });
};
exports.setupMiddleware = setupMiddleware;
// 404 Handler for Undefined Routes
const routeNotFoundHandler = (req, res) => {
    res.status(404).json({
        message: 'Route not found',
        success: false,
    });
};
exports.routeNotFoundHandler = routeNotFoundHandler;
// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        success: false,
        error: err.message,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=middleware.js.map