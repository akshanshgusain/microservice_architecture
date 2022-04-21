import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  // Send back a header to tell the client to dump all the cookie information.
  req.session = null;

  res.send({});
});

export { router as signoutRouter };
