// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Resume = require('../models/Resume'); // Assuming the model is in the models directory
const router = express.Router();
const resumeMock = require('../data/mockResume.json');

// Middleware to extract user ID from token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = user.id; // Attach user ID to the request object
    next();
  });
};

const withUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token || token === "null") {
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.userId = user.id; // Attach user ID to the request object
    next();
  });
}

// Route to create a new resume
router.post('/', authenticateToken, async (req, res) => {
  try {
    const resumeData = req.body;

    // Add the user ID from the token to the resume data
    resumeData.user = req.userId;

    const data = { ...resumeMock, ...resumeData };

    // Create a new resume
    const newResume = new Resume(data);
    await newResume.save();

    newResume.user = undefined;

    res.status(201).json({ message: 'Resume created successfully', resume: newResume });
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to get all resumes for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Find resumes belonging to the authenticated user
    const resumes = await Resume.find({ user: req.userId }).select('name title fullname updatedAt createdAt settings.template').sort({ updatedAt: -1 });

    res.status(200).json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/last-3', authenticateToken, async (req, res) => {
  try {
    // Find resumes belonging to the authenticated user
    const resumes = await Resume.find({ user: req.userId }).select('name title fullname updatedAt createdAt settings.template').sort({ updatedAt: -1 }).limit(3);

    res.status(200).json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ message: 'Server error', error });
  }


});
// Route to get all resumes for the authenticated user
router.get('/:id', withUser, async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  if (!id) return res.status(400).json({ message: 'Resume ID is required' });

  try {
    // Find resumes belonging to the authenticated user
    const resume = await Resume.findOne({ _id: id });

    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    res.status(200).json(resume);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/:id/duplicate', authenticateToken, async (req, res) => {

  try {
    const { id } = req.params;
    const resume = await Resume.findOne({ _id: id, user: req.userId });

    if (!resume) return res.status(404).json({ message: 'Resume not found or access denied' });


    const copy = { ...resume._doc };

    delete copy._id;
    delete copy.__v;
    delete copy.createdAt;
    delete copy.updatedAt;

    copy.name = `${copy.name} (copy)`;
    copy.user = req.userId;

    const newResume = new Resume({ ...copy });
    await newResume.save();

    res.status(201).json({ message: 'Resume duplicated successfully', resume: newResume });

  } catch (err) {
    console.error('Error duplicating resume:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }

});


// Route to update a resume
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Update the resume, ensuring it belongs to the authenticated user
    const updatedResume = await Resume.findOneAndUpdate(
      { _id: id, user: req.userId },
      updatedData,
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: 'Resume not found or access denied' });
    }

    res.status(200).json({ message: 'Resume updated successfully' });
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to delete a resume
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the resume, ensuring it belongs to the authenticated user
    const deletedResume = await Resume.findOneAndDelete({ _id: id, user: req.userId });

    if (!deletedResume) {
      return res.status(404).json({ message: 'Resume not found or access denied' });
    }

    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});



module.exports = router;
