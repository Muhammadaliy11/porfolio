const mongoose = require('mongoose');
const Project = require('./models/Project');

const MONGO_URI = 'mongodb://holiqovmali_db_user:gf5hTJJ42m52lDpG@ac-taphlbb-shard-00-00.stpksiw.mongodb.net:27017,ac-taphlbb-shard-00-01.stpksiw.mongodb.net:27017,ac-taphlbb-shard-00-02.stpksiw.mongodb.net:27017/portfolio_db?ssl=true&replicaSet=atlas-wf11w5-shard-0&authSource=admin&retryWrites=true&w=majority';

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
    longDescription: 'A complete e-commerce platform built with React, Node.js, and MongoDB. Features include product management, cart, checkout with Stripe integration, order tracking, and a comprehensive admin dashboard.',
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
    longDescription: 'A Trello-inspired task management application with real-time updates. Supports multiple boards, drag-and-drop cards, team collaboration, and deadline tracking.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    category: 'fullstack',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    status: 'completed',
    order: 3,
  },
  {
    title: 'Portfolio Website',
    description: 'Modern full-stack portfolio website built with React, TypeScript and Node.js.',
    longDescription: 'This very portfolio website — built with React, TypeScript, Redux Toolkit, TanStack Query, Framer Motion, and Node.js backend with MongoDB.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    technologies: ['React', 'TypeScript', 'Redux', 'Node.js', 'MongoDB', 'Framer Motion'],
    category: 'fullstack',
    githubUrl: 'https://github.com',
    liveUrl: '#',
    featured: true,
    status: 'completed',
    order: 4,
  },
  {
    title: 'Weather Forecast App',
    description: 'Beautiful weather app with 7-day forecast and location-based data.',
    longDescription: 'A visually stunning weather application that provides real-time weather data, 7-day forecasts, hourly breakdowns. Uses OpenWeather API with dynamic backgrounds.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
    technologies: ['React', 'TypeScript', 'OpenWeather API', 'Framer Motion'],
    category: 'frontend',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: false,
    status: 'completed',
    order: 5,
  },
  {
    title: 'REST API Backend',
    description: 'RESTful API with JWT authentication, CRUD operations and MongoDB.',
    longDescription: 'A robust REST API with JWT authentication, role-based access control, file uploads, pagination, and comprehensive error handling. Built with Express and MongoDB.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Mongoose'],
    category: 'backend',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: false,
    status: 'completed',
    order: 6,
  },
];

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected!');
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log(`✅ Database seeded! ${projects.length} projects inserted.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
