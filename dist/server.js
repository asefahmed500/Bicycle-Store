"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./middleware/middleware");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const db_1 = __importDefault(require("./config/db"));
// Import the connectDB function
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
// Connect to the database
(0, db_1.default)();
// Middleware Setup
(0, middleware_1.setupMiddleware)(app);
// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Bicycle Store API!');
});
// Routes should be defined before the route not found handler
app.use('/products', productRoutes_1.default);
app.use('/orders', orderRoutes_1.default);
// 404 Handler (for undefined routes) should be at the bottom
app.use(middleware_1.routeNotFoundHandler);
// Error Handling Middleware should be at the bottom
app.use(middleware_1.errorHandler);
// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=server.js.map