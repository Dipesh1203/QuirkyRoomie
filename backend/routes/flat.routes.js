const express = require("express");
const router = express.Router();
const FlatGroup = require("../models/flat_group");
const {
  createFlatGroup,
  updateFlat,
  deleteFlat,
  getAllFlatGroup,
} = require("../controller/flat");
const { authorize } = require("../utils/middleware");

router.post("/", authorize, createFlatGroup);
router.get("/", getAllFlatGroup);
router.put("/:id", authorize, updateFlat);
router.delete("/:id", authorize, deleteFlat);

module.exports = router;
