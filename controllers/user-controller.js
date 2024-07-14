const customError = require("../utils/customError");
const tryCatch = require("../utils/tryCatch");
const prisma = require("../models");

module.exports.updateProfile = async (req, res) => {
  try {
    console.log('Received request to update profile');
    console.log('Request user:', req.user); // Log the user information
    console.log('Uploaded file:', req.file); // Log the uploaded file information

    if (!req.user) {
      console.error('No user information in request');
      return res.status(400).json({ error: 'User not authenticated' });
    }

    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imgUrl = `/uploads/${req.file.filename}`;
    console.log('Image URL:', imgUrl); // Log the image URL

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { ImgUrl: imgUrl },
    });
    console.log('Updated user:', updatedUser); // Log the updated user information

    res.json({ result: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to update profile' });
  }
};