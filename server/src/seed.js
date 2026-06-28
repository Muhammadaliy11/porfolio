require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Project = require('./models/Project');

const projects = [
  {
    title: 'Calculator App',
    description: 'Modern and responsive calculator web application with clean UI and smooth animations.',
    longDescription: 'A fully functional calculator built with modern web technologies. Features a clean, responsive design with keyboard support, smooth button animations, and accurate mathematical operations. Deployed on Vercel.',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'frontend',
    githubUrl: 'https://github.com',
    liveUrl: 'https://canculator-six.vercel.app/',
    featured: true,
    status: 'completed',
    order: 1,
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
    longDescription: 'A complete e-commerce platform built with React, Node.js, and MongoDB. Features include product management, cart, checkout with Stripe integration, order tracking, and a comprehensive admin dashboard with analytics.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'Redux'],
    category: 'fullstack',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    status: 'completed',
    order: 2,
  },
  {
    title: 'Task Management App',
    description: 'Real-time collaborative task management with drag-and-drop boards.',
    longDescription: 'A Trello-inspired task management application with real-time updates using Socket.io. Supports multiple boards, drag-and-drop cards, team collaboration, deadline tracking, and activity logs.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    technologies: ['React', 'TypeScript', 'Socket.io', 'Node.js', 'PostgreSQL'],
    category: 'fullstack',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    status: 'completed',
    order: 3,
  },
  {
    title: 'AI Chat Interface',
    description: 'Modern chat UI with OpenAI GPT integration and conversation history.',
    longDescription: 'A sleek chat interface that integrates with OpenAI GPT API. Features include conversation history, multiple AI models, code highlighting, markdown support, and export functionality.',
    image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80',
    technologies: ['React', 'TypeScript', 'OpenAI API', 'Tailwind CSS', 'Zustand'],
    category: 'frontend',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: false,
    status: 'completed',
    order: 4,
  },
  {
    title: 'Portfolio Dashboard',
    description: 'Analytics dashboard for tracking portfolio performance with charts.',
    longDescription: 'An interactive analytics dashboard that displays portfolio metrics, project statistics, and skill progression. Built with React and D3.js for complex data visualizations.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Chart.js'],
    category: 'fullstack',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: false,
    status: 'completed',
    order: 5,
  },
  {
    title: 'Social Media API',
    description: 'RESTful API for a social media platform with auth and media upload.',
    longDescription: 'A robust REST API for a social media platform. Includes JWT authentication, file uploads to AWS S3, real-time notifications, post feeds with pagination, and comprehensive API documentation.',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'AWS S3', 'Redis'],
    category: 'backend',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: false,
    status: 'completed',
    order: 6,
  },
  {
    title: 'Weather Forecast App',
    description: 'Beautiful weather app with 7-day forecast and location-based data.',
    longDescription: 'A visually stunning weather application that provides real-time weather data, 7-day forecasts, hourly breakdowns, and weather maps. Uses OpenWeather API and features dynamic backgrounds based on weather conditions.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
    technologies: ['React', 'TypeScript', 'OpenWeather API', 'Framer Motion'],
    category: 'frontend',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: false,
    status: 'completed',
    order: 7,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
