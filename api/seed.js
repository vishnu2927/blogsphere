import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/user.model.js';
import Post from './src/models/post.model.js';

dotenv.config();

const dummyPosts = [
  {
    title: 'The Rise of Quantum Computing in 2026',
    content: '<p>Quantum computing is no longer a sci-fi dream. In 2026, companies are leveraging quantum processors to simulate chemical reactions, optimize financial portfolios, and encrypt ultra-secure networks. This guide explores how quantum bits (qubits) operate and their current industry applications.</p>',
    category: 'tech',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: '5 Essential Morning Routines for Mental Clarity',
    content: '<p>Mental wellness starts the moment you wake up. Implementing a mindful morning routine can reduce anxiety and boost focus. Learn about the benefits of light hydration, simple stretching, digital detoxes, journaling, and focused breathwork to start your day with purpose.</p>',
    category: 'health',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'The Evolution of High-Intensity Interval Training',
    content: '<p>High-Intensity Interval Training (HIIT) has evolved from athletic track preparation into one of the world\'s most popular fitness protocols. Discover the science behind EPOC (Excess Post-exercise Oxygen Consumption) and how a 20-minute workout can optimize cardiovascular endurance.</p>',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Understanding the Impact of Sleep Cycles on Longevity',
    content: '<p>Sleep is the ultimate biological restorative process. During deep sleep and REM phases, our brains flush metabolic waste and consolidate memory. This article covers practical tips to improve sleep hygiene, align with your circadian rhythm, and choose the right sleep environment.</p>',
    category: 'health',
    image: 'https://images.unsplash.com/photo-1511295742364-92767fc06297?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'How Data Analytics is Transforming Modern Soccer',
    content: '<p>Modern soccer is played as much on spreadsheets as it is on grass. Coaches use heatmaps, expected goals (xG), and spatial telemetry metrics to select lineups and plan tactics. Examine how real-time GPS tracking devices on player jerseys dictate game strategy.</p>',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop',
  },
];

const seed = async () => {
  try {
    const mongoUri = process.env.MONGO || 'mongodb://127.0.0.1:27017/blogsphere';
    console.log('Connecting to MongoDB at:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Find or create a dummy Admin user to assign posts to
    let admin = await User.findOne({ isAdmin: true });
    if (!admin) {
      console.log('No admin user found. Creating a dummy admin user...');
      admin = new User({
        username: 'adminuser',
        email: 'admin@blogsphere.com',
        password: 'password123',
        isAdmin: true,
        profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      });
      await admin.save();
      console.log('Admin user created (username: adminuser, email: admin@blogsphere.com, password: password123)');
    }

    // Insert dummy posts
    for (const post of dummyPosts) {
      const slug = post.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');

      // Check if post already exists
      const existing = await Post.findOne({ slug });
      if (existing) {
        console.log(`Post with slug "${slug}" already exists, skipping.`);
        continue;
      }

      const newPost = new Post({
        ...post,
        slug,
        userId: admin._id.toString(),
      });

      await newPost.save();
      console.log(`Saved post: "${post.title}"`);
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seed();
