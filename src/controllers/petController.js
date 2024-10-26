const Pet = require('../models/Pet');

exports.listPets = async (req, res) => {
  try {
    const pets = await Pet.find({ userId: req.user.userId });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addPet = async (req, res) => {
  try {
    const pet = new Pet({
      ...req.body,
      userId: req.user.userId
    });
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.petId, userId: req.user.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findOneAndDelete({
      _id: req.params.petId,
      userId: req.user.userId
    });

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};