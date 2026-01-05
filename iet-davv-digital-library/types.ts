
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  coverImage: string;
  year: number;
  pdfUrl: string;
  isFeatured?: boolean;
  department: Department;
  isStudentAuthored?: boolean; // New field for campus creations
  resourceType?: 'Book' | 'Article' | 'Research Paper' | 'Project Report'; // Categorize content
}

export enum Department {
  ComputerEngineering = "Computer Engineering",
  InformationTechnology = "Information Technology",
  ElectronicsInstrumentation = "Electronics & Instrumentation",
  ElectronicsTelecomm = "Electronics & Telecomm",
  MechanicalEngineering = "Mechanical Engineering",
  CivilEngineering = "Civil Engineering"
}

export interface IssuedBook {
  bookId: string;
  issueDate: string; // ISO string
  dueDate: string;   // ISO string
  status: 'reading' | 'overdue' | 'pending';
  progress: number;  // 0-100
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  enrollmentNo: string;
  issuedBooks: IssuedBook[];
  savedBooks: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
