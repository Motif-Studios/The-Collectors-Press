import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
// routes
import home from "./routes/home/index"; 
import account from "./routes/account/index";
import articles from "./routes/articles/index";
import auth from "./routes/auth/index";
import categories from "./routes/categories/index";
import dashboard from "./routes/dashboard/index";
import search from "./routes/search/index";
import subscription from "./routes/subscription/index";
import upload from "./routes/upload/index";

const app = express();
app.use(express.json());

const openApiOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "The Collectors Press API",
            version: "1.0.0",
            description: "Annotated Swagger APIs for The Collectors Press backend",
        },
        servers: [{ url: "http://localhost:5001" }],
    },
    apis: [
        path.join(__dirname, "routes/**/*.ts"),
        path.join(__dirname, "routes/**/*.js"),
    ],
};

const swaggerDocument = swaggerJSDoc(openApiOptions);

// cors setup
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

const PORT = 5001;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/home", home);
app.use("/account", account);
app.use("/articles", articles);
app.use("/auth", auth);
app.use("/categories", categories);
app.use("/dashboard", dashboard);
app.use("/search", search);
app.use("/subscription", subscription);
app.use("/upload", upload);

app.get("/", (req, res) =>{
    res.status(200).json({ message:"API RUNNING" });
})

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// }) 

export default app;