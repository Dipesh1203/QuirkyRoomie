const express = require("express");
const router = express.Router();
const FlatGroup = require("../models/flat_group");

const createFlatGroup = async (req, res) => {
  try {
    const { name, users } = req.body;

    // Check if the flat group already exists
    const exist = await FlatGroup.findOne({ name });

    if (exist) {
      if (!exist.users.includes(users)) {
        exist.users.push(users);
      }

      const update = await FlatGroup.findByIdAndUpdate(
        exist._id,
        { users: exist.users },
        { new: true }
      );

      return res.status(200).json(update);
    }

    const newFlatGroup = new FlatGroup({ name, users: [users] });
    await newFlatGroup.save();
    res.status(201).json(newFlatGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllFlatGroup = async (req, res) => {
  try {
    const flatGroups = await FlatGroup.find().populate(
      "users",
      "username email"
    );
    res.status(200).json(flatGroups);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateFlat = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedGroup = await FlatGroup.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!updatedGroup)
      return res.status(404).json({ message: "Group not found" });

    res.json(updatedGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFlat = async (req, res) => {
  try {
    const deletedGroup = await FlatGroup.findByIdAndDelete(req.params.id);
    if (!deletedGroup)
      return res.status(404).json({ message: "Group not found" });

    res.json({ message: "Flat group deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createFlatGroup, updateFlat, deleteFlat, getAllFlatGroup };
