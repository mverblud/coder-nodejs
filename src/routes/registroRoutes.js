import { Router } from "express";
import passport from "passport";

import "../passport/local.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(500).json({ message: "error en registro" });
});

router.post(
  "/",
  // autenticar con passport y enviar respuestas al client
  passport.authenticate("register", {
    failureRedirect: "/api/registro",
  }),
  (req, res) => {
    res.status(201).json({
      message: "Usuario registrado con éxito",
      id: req.user._id,
      email: req.user.email,
    });
  }
);

export default router;
