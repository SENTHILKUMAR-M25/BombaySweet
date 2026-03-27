const express = require("express");
const router = express.Router();

// CHECK SESSION
router.get("/me", (req, res) => {
  if (req.session.admin) {
    return res.json({ role: "admin", user: req.session.admin });
  }

  if (req.session.user) {
    return res.json({ role: "user", user: req.session.user });
  }

  res.status(401).json({ msg: "Not logged in" });
});

// LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("session-id");
    res.json({ msg: "Logged out" });
  });
});

module.exports = router;