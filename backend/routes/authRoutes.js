import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const router = express.Router()


router.post("/register", async (req, res) => {
  let { email, password, username } = req.body;
  email = email.trim().toLowerCase();

  try {
    const existingUser = await prisma.authentication.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.authentication.create({
      data: {
        email,
        username,
        password: hashedPassword,
      }
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post('/login', async (req, res) => {
  let { email, password } = req.body;
  email = email.trim().toLowerCase();  // Trim and lowercase the email

  console.log("Login attempt with email:", email);

  try {
    // Check if the email exists in the database
    const user = await prisma.authentication.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },  // Attach user ID to the token payload
      process.env.JWT_KEY,  // Use JWT secret from .env
      { expiresIn: '3h' }  // Expiration time of the token
    );

    return res.status(200).json({ token });
  } catch (err) {
    console.error("Error during login:", err);  // Log error for debugging
    return res.status(500).json({ error: err.message });
  }
});




const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header

    if (!token) {
      return res.status(403).json({ message: "Authorization token required" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;  // Attach user ID to the request object

    next();  // Pass the request to the next middleware
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
router.get('/home', verifyToken, async (req, res) => {
  try {
    // Retrieve the user data from the database using the user ID from the token
    const user = await prisma.authentication.findUnique({
      where: { id: req.userId }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});
router.get('/profile', verifyToken, async (req, res) => {
  try {
    // Retrieve the user data from the database using the user ID from the token
    const user = await prisma.authentication.findUnique({
      where: { id: req.userId }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

router.patch('/image', verifyToken, async (req, res) => {
  try {
    // Validate input
    if (!req.body.profileImage) {
      return res.status(400).json({ error: "Image URL required" });
    }

    // Update profile image
    const updatedUser = await prisma.authentication.update({
      where: { id: req.userId },
      data: {
        profileImage: req.body.profileImage
      },
      select: {
        profileImage: true
      }
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ error: "Failed to update profile" });
  }
});



export default router;
