luxe-loom-backend/
├── src/
│   ├── config/             # Database connection, Cloudinary/AWS config
│   ├── controllers/        # Logic for each resource
│   │   ├── adminController.js
│   │   ├── orderController.js
│   │   ├── userController.js
│   │   └── productController.js
│   ├── middlewares/        # Auth and Validation
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/             # Database Schemas
│   │   ├── User.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── Client.js
│   ├── routes/             # API Endpoints
│   │   ├── adminRoutes.js
│   │   ├── orderRoutes.js
│   │   └── userRoutes.js
│   ├── services/           # Reusable business logic (Email, Payments)
│   │   ├── orderService.js
│   │   └── uploadService.js
│   ├── utils/              # Helper functions (Formatters, Error handlers)
│   └── app.js              # Express app entry point
├── uploads/                # Temporary local storage for images
├── .env                    # Secrets (JWT_SECRET, DB_URL)
└── package.json