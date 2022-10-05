import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Error al cerrar sesión" });
    }
    res.status(200).send({ message: "Sesión cerrada" });
  });
});

export default router;
