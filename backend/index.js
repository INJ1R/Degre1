import express from "express";
import jsonServer from "json-server";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import cors from "cors";
import path from "path";
import "dotenv/config";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const usersRouter = jsonServer.router("database/users.json");
const productsRouter = jsonServer.router("database/db.json");
const ordersRouter = jsonServer.router("database/orders.json");

const saltRounds = 10;
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiLimiter);
app.use("/images", express.static(path.join(__dirname, "products")));

const handleError = (res, status, message) => {
  return res.status(status).json({ error: message });
};

app.post("/register", async (req, res) => {
  try {
    const { mail, password, ...rest } = req.body;
    if (!mail || !password)
      return handleError(res, 400, "Email and password are required");

    const existingUser = usersRouter.db.get("users").find({ mail }).value();
    if (existingUser) return handleError(res, 400, "User already exists");

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = { id: Date.now(), mail, password: hashedPassword, ...rest };
    usersRouter.db.get("users").push(newUser).write();

    res.status(201).json({ id: newUser.id, mail: newUser.mail });
  } catch (error) {
    handleError(res, 500, "Registration failed");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { mail, password } = req.body;
    if (!mail || !password)
      return handleError(res, 400, "Email and password are required");

    const user = usersRouter.db.get("users").find({ mail }).value();
    if (!user) return handleError(res, 401, "Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return handleError(res, 401, "Invalid credentials");

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    handleError(res, 500, "Login failed");
  }
});

app.post("/create-order", (req, res) => {
  try {
    const order = req.body;
    if (
      !order.items ||
      !order.paymentMethod ||
      !order.address ||
      !order.phone ||
      !order.name
    ) {
      return handleError(res, 400, "Missing required fields");
    }

    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...order,
    };

    ordersRouter.db.get("orders").push(newOrder).write();
    res.status(201).json(newOrder);
  } catch (error) {
    handleError(res, 500, "Failed to create order");
  }
});

const productRoutes = [
  "knittedProducts",
  "ceramics",
  "jewelry",
  "decor",
  "textiles",
  "soap",
  "woodenProducts",
];

productRoutes.forEach((route) => {
  app.get(`/${route}`, (req, res) => {
    try {
      const products = productsRouter.db.get(route).value();
      if (!products) return handleError(res, 404, `No ${route} found`);

      const productsWithImageUrls = products.map((product) => ({
        ...product,
        image: `${process.env.SERVER_URL}/images/${product.img}`,
      }));

      res.json(productsWithImageUrls);
    } catch (error) {
      handleError(res, 500, `Failed to fetch ${route}`);
    }
  });
});

app.use(usersRouter);
app.use(productsRouter);
app.use(ordersRouter);

app.use((req, res) => {
  handleError(res, 404, "Endpoint not found");
});

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  const productsDir = path.join(__dirname, "products");
  const databaseDir = path.join(__dirname, "database");

  if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir);
    productRoutes.forEach((route) => {
      fs.mkdirSync(path.join(productsDir, route));
    });
  }

  if (!fs.existsSync(databaseDir)) {
    fs.mkdirSync(databaseDir);
    if (!fs.existsSync(path.join(databaseDir, "orders.json"))) {
      fs.writeFileSync(
        path.join(databaseDir, "orders.json"),
        JSON.stringify({ orders: [] })
      );
    }
  }

  console.log(`Server is running on port ${PORT}`);
});