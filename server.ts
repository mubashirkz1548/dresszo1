import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("dresszo.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image_url TEXT,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    address TEXT NOT NULL,
    total_amount REAL NOT NULL,
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    price REAL,
    FOREIGN KEY(order_id) REFERENCES orders(id)
  );

  -- Initial Data
  -- Categories: New In, Ready To Wear, Unstitched, West, Modest Wear, Festive, Sale
  INSERT INTO products (name, description, price, image_url, category) 
  SELECT 'Embroidered Lawn Suit', '3-piece unstitched lawn suit with embroidered front and silk dupatta.', 8990, 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800', 'Unstitched'
  WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Embroidered Lawn Suit');

  INSERT INTO products (name, description, price, image_url, category) 
  SELECT 'Floral Printed Kurta', 'Ready to wear digital printed lawn kurta with lace detailing.', 4500, 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=800', 'Ready To Wear'
  WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Floral Printed Kurta');

  INSERT INTO products (name, description, price, image_url, category) 
  SELECT 'Solid Silk Tunic', 'Elegant solid silk tunic with a modern silhouette.', 12500, 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800', 'West'
  WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Solid Silk Tunic');

  INSERT INTO products (name, description, price, image_url, category) 
  SELECT 'Embellished Festive Abaya', 'Modest wear abaya with intricate hand-embellished sleeves.', 18000, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800', 'Modest Wear'
  WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Embellished Festive Abaya');

  INSERT INTO products (name, description, price, image_url, category) 
  SELECT 'Zari Work Chiffon Saree', 'Exquisite zari work on pure chiffon for festive occasions.', 35000, 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=800', 'Festive'
  WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Zari Work Chiffon Saree');

  INSERT INTO products (name, description, price, image_url, category) 
  SELECT 'Printed Cambric Shirt', 'Daily wear printed cambric shirt from our new collection.', 3200, 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800', 'New In'
  WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Printed Cambric Shirt');

  INSERT INTO products (name, description, price, image_url, category) 
  SELECT 'Lace Detailed Trousers', 'Cotton silk trousers with delicate lace finishing.', 2500, 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800', 'Ready To Wear'
  WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Lace Detailed Trousers');

  INSERT INTO products (name, description, price, image_url, category) 
  SELECT 'Block Printed Dupatta', 'Pure cotton block printed dupatta in vibrant colors.', 1800, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800', 'Unstitched'
  WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Block Printed Dupatta');
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products ORDER BY created_at DESC").all();
    res.json(products);
  });

  app.post("/api/products", (req, res) => {
    const { name, description, price, image_url, category } = req.body;
    const result = db.prepare(
      "INSERT INTO products (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)"
    ).run(name, description, price, image_url, category);
    res.json({ id: result.lastInsertRowid });
  });

  app.delete("/api/products/:id", (req, res) => {
    db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
    res.sendStatus(204);
  });

  app.post("/api/orders", (req, res) => {
    const { customer_name, customer_email, customer_phone, address, total_amount, payment_method, items } = req.body;
    
    const insertOrder = db.transaction((orderData, orderItems) => {
      const result = db.prepare(`
        INSERT INTO orders (customer_name, customer_email, customer_phone, address, total_amount, payment_method)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        orderData.customer_name,
        orderData.customer_email,
        orderData.customer_phone,
        orderData.address,
        orderData.total_amount,
        orderData.payment_method
      );

      const orderId = result.lastInsertRowid;

      const insertItem = db.prepare(`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
      `);

      for (const item of orderItems) {
        insertItem.run(orderId, item.id, item.quantity, item.price);
      }

      return orderId;
    });

    try {
      const orderId = insertOrder(
        { customer_name, customer_email, customer_phone, address, total_amount, payment_method },
        items
      );
      res.json({ success: true, orderId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to place order" });
    }
  });

  app.get("/api/orders", (req, res) => {
    const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
    res.json(orders);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
