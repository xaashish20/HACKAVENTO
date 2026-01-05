
import React from 'react';
import { Book, Department } from './types';

export const CATEGORIES = [
  { name: Department.ComputerEngineering, icon: <i className="fas fa-code"></i>, color: "text-blue-400" },
  { name: Department.InformationTechnology, icon: <i className="fas fa-network-wired"></i>, color: "text-indigo-400" },
  { name: Department.ElectronicsInstrumentation, icon: <i className="fas fa-microchip"></i>, color: "text-emerald-400" },
  { name: Department.ElectronicsTelecomm, icon: <i className="fas fa-satellite-dish"></i>, color: "text-rose-400" },
  { name: Department.MechanicalEngineering, icon: <i className="fas fa-cog"></i>, color: "text-orange-400" },
  { name: Department.CivilEngineering, icon: <i className="fas fa-city"></i>, color: "text-purple-400" },
];

export const MOCK_BOOKS: Book[] = [
  {
    id: "1",
    title: "Data Structures and Algorithms",
    author: "Narasimha Karumanchi",
    isbn: "978-8192107592",
    category: "Software",
    department: Department.ComputerEngineering,
    description: "Essential guide for coding interviews and fundamental computer science concepts.",
    year: 2021,
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "#",
    isFeatured: true,
    resourceType: 'Book'
  },
  {
    id: "s1",
    title: "Implementation of Web3 in Campus Elections",
    author: "Aarav Sharma (BE 2024)",
    isbn: "IET-STU-001",
    category: "Blockchain",
    department: Department.InformationTechnology,
    description: "A research paper detailing the design of a decentralized voting system specifically for IET student council elections.",
    year: 2024,
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "#",
    isFeatured: true,
    isStudentAuthored: true,
    resourceType: 'Research Paper'
  },
  {
    id: "2",
    title: "Operating System Concepts",
    author: "Silberschatz",
    isbn: "978-1118063330",
    category: "Systems",
    department: Department.InformationTechnology,
    description: "The definitive text on operating system architectures and management.",
    year: 2018,
    coverImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "#",
    isFeatured: true,
    resourceType: 'Book'
  },
  {
    id: "s2",
    title: "Modern Mechanical Dampers: A Comparative Analysis",
    author: "Ishita Verma (BE 2023)",
    isbn: "IET-STU-002",
    category: "Mechanical",
    department: Department.MechanicalEngineering,
    description: "Final year project report on the efficiency of fluid versus friction based damping systems in seismic regions.",
    year: 2023,
    coverImage: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "#",
    isFeatured: false,
    isStudentAuthored: true,
    resourceType: 'Project Report'
  },
  {
    id: "3",
    title: "Microelectronic Circuits",
    author: "Sedra & Smith",
    isbn: "978-0190853464",
    category: "Electronics",
    department: Department.ElectronicsInstrumentation,
    description: "Standard reference for analog and digital circuit design.",
    year: 2019,
    coverImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "#",
    isFeatured: false,
    resourceType: 'Book'
  },
  {
    id: "s3",
    title: "5G Telemetry in Smart Cities",
    author: "Vikram Rajawat (BE 2025)",
    isbn: "IET-STU-003",
    category: "Telecom",
    department: Department.ElectronicsTelecomm,
    description: "An article exploring the deployment challenges of 5G infrastructure in tier-2 Indian cities like Indore.",
    year: 2024,
    coverImage: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "#",
    isFeatured: true,
    isStudentAuthored: true,
    resourceType: 'Article'
  },
  {
    id: "4",
    title: "Digital Communication",
    author: "Simon Haykin",
    isbn: "978-0471178699",
    category: "Communication",
    department: Department.ElectronicsTelecomm,
    description: "Foundational principles of digital signal processing and communication systems.",
    year: 2020,
    coverImage: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "#",
    isFeatured: true,
    resourceType: 'Book'
  },
  {
    id: "5",
    title: "Thermodynamics: An Engineering Approach",
    author: "Yunus Cengel",
    isbn: "978-1259822674",
    category: "Thermal",
    department: Department.MechanicalEngineering,
    description: "Comprehensive study of energy, entropy, and the laws of thermodynamics.",
    year: 2019,
    coverImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "#",
    isFeatured: false,
    resourceType: 'Book'
  },
  {
    id: "6",
    title: "RCC Design",
    author: "B.C. Punmia",
    isbn: "978-8170080971",
    category: "Structural",
    department: Department.CivilEngineering,
    description: "Standard manual for reinforced concrete cement structure design and analysis.",
    year: 2022,
    coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "#",
    isFeatured: true,
    resourceType: 'Book'
  }
];
