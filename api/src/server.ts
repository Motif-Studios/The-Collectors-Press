import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// routes
import home from "./routes/home/index"; 
import account from "./routes/account/index";
import articles from "./routes/articles/index";
import auth from "./routes/auth/index";
import categories from "./routes/categories/index";
import dashboard from "./routes/dashboard/index";
import search from "./routes/search/index";
import subscription from "./routes/subscription/index";

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load("../api/swagger/swagger.yaml");
const PORT = 5001;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/home", home);
app.use("/account", account);
app.use("/articles", articles);
app.use("/auth", auth);
app.use("/categories", categories);
app.use("/dashboard", dashboard);
app.use("/search", search);
app.use("subscription", subscription);

app.get("/", (req, res) =>{
    res.status(200).json({ message:"API RUNNING" });
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}) 