// store/jobsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommendedJobs: [
  {
    id: 1,
    clientId: 10,
    clientName: "Innovatech Corp.",
    title: "Full Stack Developer Needed for SaaS Platform",
    description:
      "We're looking for an experienced full-stack developer to help build our new SaaS platform. Must have experience with React, Node.js, and PostgreSQL.",
    skills: ["React", "Node.js", "PostgreSQL"],
    posted: "2 hours ago",
    location: "Remote",
    salary: "$5,000 - $8,000",
  },
  {
    id: 2,
    clientId: 12,
    clientName: "NextGen Solutions",
    title: "Frontend Developer for E-Commerce App",
    description:
      "Need a frontend developer with React and TailwindCSS experience to build modern e-commerce features.",
    skills: ["React", "TailwindCSS", "JavaScript"],
    posted: "5 hours ago",
    location: "Remote",
    salary: "$3,000 - $5,000",
  },
  {
    id: 3,
    clientId: 15,
    clientName: "BrightWave Media",
    title: "UI/UX Designer for Mobile App",
    description:
      "We need a creative UI/UX designer to design a sleek mobile app interface with user-friendly workflows.",
    skills: ["Figma", "Adobe XD", "UX Research"],
    posted: "1 day ago",
    location: "Hybrid - Dubai",
    salary: "$2,000 - $4,500",
  },
  {
    id: 4,
    clientId: 18,
    clientName: "FinCore Systems",
    title: "Backend Engineer for Finance Platform",
    description:
      "Hiring a backend engineer with strong experience in Node.js, MongoDB, and Redis to scale financial APIs.",
    skills: ["Node.js", "MongoDB", "Redis"],
    posted: "6 hours ago",
    location: "Remote",
    salary: "$4,000 - $7,500",
  },
  {
    id: 5,
    clientId: 20,
    clientName: "PixelCraft Studio",
    title: "Logo & Brand Identity Designer",
    description:
      "Seeking a graphic designer to create a full brand identity package including a modern logo and style guide.",
    skills: ["Photoshop", "Illustrator", "Branding"],
    posted: "3 days ago",
    location: "On-site - London",
    salary: "$800 - $1,500",
  },
  {
    id: 6,
    clientId: 22,
    clientName: "CodeBridge Technologies",
    title: "React Native Developer for Mobile App",
    description:
      "Looking for a React Native developer to build a cross-platform delivery application.",
    skills: ["React Native", "Redux", "JavaScript"],
    posted: "4 hours ago",
    location: "Remote",
    salary: "$3,500 - $6,000",
  },
  {
    id: 7,
    clientId: 25,
    clientName: "AlphaStream Analytics",
    title: "Data Scientist for ML Model Development",
    description:
      "Need a data scientist with expertise in Python, TensorFlow, and NLP to build predictive models.",
    skills: ["Python", "TensorFlow", "NLP"],
    posted: "2 days ago",
    location: "Remote",
    salary: "$6,000 - $9,000",
  },
  {
    id: 8,
    clientId: 28,
    clientName: "SkyNet Pvt Ltd.",
    title: "DevOps Engineer",
    description:
      "Hiring DevOps engineer with AWS, Docker, and CI/CD experience to automate deployments.",
    skills: ["AWS", "Docker", "CI/CD"],
    posted: "3 hours ago",
    location: "Remote",
    salary: "$5,000 - $7,000",
  },
  {
    id: 9,
    clientId: 30,
    clientName: "CryptoHub Labs",
    title: "Blockchain Developer",
    description:
      "Seeking a blockchain developer specializing in smart contract development and Web3 integrations.",
    skills: ["Solidity", "Web3.js", "Ethereum"],
    posted: "1 day ago",
    location: "Remote",
    salary: "$7,000 - $12,000",
  },
  {
    id: 10,
    clientId: 33,
    clientName: "EduSmart LMS",
    title: "LMS Platform Web Developer",
    description:
      "Need a web developer to revamp our LMS dashboard using React and modern UI patterns.",
    skills: ["React", "TailwindCSS", "REST APIs"],
    posted: "12 hours ago",
    location: "Hybrid - Singapore",
    salary: "$3,500 - $5,500",
  },
  {
    id: 11,
    clientId: 35,
    clientName: "Meditech Solutions",
    title: "Backend Developer for Healthcare API",
    description:
      "Require backend developer to build secure healthcare APIs with Node.js and PostgreSQL.",
    skills: ["Node.js", "PostgreSQL", "API Security"],
    posted: "6 hours ago",
    location: "Remote",
    salary: "$6,000 - $9,500",
  },
  {
    id: 12,
    clientId: 38,
    clientName: "QuantumSoft",
    title: "Full Stack MERN Developer",
    description:
      "Hiring MERN stack developer to build enterprise dashboard applications.",
    skills: ["MongoDB", "Express", "React", "Node.js"],
    posted: "8 hours ago",
    location: "Remote",
    salary: "$4,000 - $7,000",
  },
  {
    id: 13,
    clientId: 39,
    clientName: "BrightFuture Academy",
    title: "Educational Video Editor",
    description:
      "Looking for a video editor to create animated educational content with effects and transitions.",
    skills: ["Adobe Premiere", "After Effects", "Animation"],
    posted: "2 days ago",
    location: "Pakistan (Remote)",
    salary: "$600 - $1,200",
  },
  {
    id: 14,
    clientId: 41,
    clientName: "RoboAI Labs",
    title: "Machine Learning Engineer",
    description:
      "Seeking ML engineer to build computer vision pipelines and optimize inference performance.",
    skills: ["Python", "OpenCV", "PyTorch"],
    posted: "10 hours ago",
    location: "Remote",
    salary: "$8,000 - $14,000",
  },
  {
    id: 15,
    clientId: 44,
    clientName: "NovaCommerce",
    title: "Shopify Store Designer",
    description:
      "Need a Shopify expert to redesign our store and boost conversions.",
    skills: ["Shopify", "Liquid", "CSS"],
    posted: "4 days ago",
    location: "USA (Remote)",
    salary: "$1,500 - $3,000",
  },
  {
    id: 16,
    clientId: 47,
    clientName: "CloudPeak Hosting",
    title: "Server Administrator",
    description:
      "Hiring server admin for Linux management, optimization, and server-level security.",
    skills: ["Linux", "NGINX", "cPanel"],
    posted: "18 hours ago",
    location: "On-site - Germany",
    salary: "$4,000 - $6,000",
  },
  {
    id: 17,
    clientId: 48,
    clientName: "SkyFly Drones",
    title: "Drone Footage Video Editor",
    description:
      "Looking for editor to produce cinematic drone videos with special effects.",
    skills: ["Premiere Pro", "Color Grading", "Cinematics"],
    posted: "3 days ago",
    location: "Remote",
    salary: "$700 - $1,400",
  },
  {
    id: 18,
    clientId: 51,
    clientName: "MetaBuild Construction",
    title: "3D Model Designer",
    description:
      "Require 3D designer for architectural project visualization.",
    skills: ["Blender", "SketchUp", "AutoCAD"],
    posted: "4 hours ago",
    location: "On-site - UAE",
    salary: "$2,000 - $3,500",
  },
  {
    id: 19,
    clientId: 53,
    clientName: "TravelGo",
    title: "Mobile App UI Designer",
    description:
      "Looking for a UI designer to design screens for our travel booking app.",
    skills: ["Figma", "Prototyping", "Visual Design"],
    posted: "1 day ago",
    location: "Remote",
    salary: "$1,500 - $2,800",
  },
  {
    id: 20,
    clientId: 55,
    clientName: "GreenTech Energy",
    title: "IoT Engineer",
    description:
      "Seeking IoT engineer to work on sensor networks and energy monitoring hardware.",
    skills: ["IoT", "Embedded C", "Microcontrollers"],
    posted: "7 hours ago",
    location: "Hybrid - Canada",
    salary: "$5,500 - $9,000",
  }
]
,
valueByCategory: {  
    Development: 45,
    Design: 25,
    Marketing: 15,  
    Writing: 10,
    Other: 5
  },
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addJob: (state, action) => {
      state.recommendedJobs.push(action.payload);
    },
    updateJob: (state, action) => {
      const { id, updatedJob } = action.payload;
      const index = state.recommendedJobs.findIndex(job => job.id === id);
      if (index !== -1) {
        state.recommendedJobs[index] = { ...state.recommendedJobs[index], ...updatedJob };
      }
    },
    removeJob: (state, action) => {
      const id = action.payload;
      state.recommendedJobs = state.recommendedJobs.filter(job => job.id !== id);
    },
  },
});

export const { addJob, updateJob, removeJob } = jobsSlice.actions;
export default jobsSlice.reducer;
