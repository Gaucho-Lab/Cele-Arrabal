import express from "express";
import mercadopago from "mercadopago";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN_TEST,
  sandbox: true, // Enable sandbox mode
});

app.post("/api/checkout", async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: "Producto de prueba",
          unit_price: 1000,
          quantity: 1,
        },
      ],
      back_urls: {
        success: "http://localhost:5173/success",
        failure: "http://localhost:5173/failure",
        pending: "http://localhost:5173/pending",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la preferencia" });
  }
});

app.listen(5000, () => console.log("Servidor corriendo en http://localhost:5000"));
