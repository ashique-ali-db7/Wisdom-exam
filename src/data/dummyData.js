export const dummyData = {
  students: [
    {
      id: 1,
      mobile: "9876543210",
      name: "Ahmed Khan",
      dob: "2012-05-15",
      class: "6th",
      fatherName: "Mohammad Khan",
      jilla: "Hyderabad",
      madrasaName: "Al-Huda Madrasa",
      place: "Old City",
      whatsappNumber: "9876543210"
    },
    {
      id: 2,
      mobile: "9876543210", 
      name: "Fatima Begum",
      dob: "2013-03-22",
      class: "5th",
      fatherName: "Abdul Rahman",
      jilla: "Hyderabad",
      madrasaName: "",
      place: "Mallepally",
      whatsappNumber: "9876543210"
    },
    {
      id: 3,
      mobile: "9123456789",
      name: "Ali Hassan",
      dob: "2011-12-10",
      class: "7th",
      fatherName: "Hassan Ahmed",
      jilla: "Mumbai",
      madrasaName: "Darul Uloom",
      place: "Bandra",
      whatsappNumber: "9123456789"
    },
    {
      id: 4,
      mobile: "9876543210",
      name: "Zara Sheikh",
      dob: "2012-08-30",
      class: "6th",
      fatherName: "Omar Sheikh",
      jilla: "Hyderabad",
      madrasaName: "Jamia Nizamia",
      place: "Charminar",
      whatsappNumber: "9876543210"
    },
    {
      id: 5,
      mobile: "9988776655",
      name: "Ibrahim Ahmed",
      dob: "2013-01-18",
      class: "5th",
      fatherName: "Ahmed Ali",
      jilla: "Delhi",
      madrasaName: "",
      place: "Jamia Nagar",
      whatsappNumber: "9988776655"
    }
  ],
  exams: [
    {
      id: 1,
      title: "Islamic Studies - Basic",
      class: "5th",
      duration: 60,
      totalQuestions: 10,
      status: "active",
      instructions: "Read each question carefully. You have 60 minutes to complete this exam. Make sure to attempt all questions before submitting.",
      helpdesk: ["9876543210", "9123456789"]
    },
    {
      id: 2,
      title: "Arabic Language - Level 1", 
      class: "6th",
      duration: 90,
      totalQuestions: 10,
      status: "active",
      instructions: "This exam tests your basic Arabic knowledge. Take your time and read each question carefully.",
      helpdesk: ["9876543210"]
    },
    {
      id: 3,
      title: "Quran Recitation - Basics",
      class: "5th",
      duration: 45,
      totalQuestions: 8,
      status: "active",
      instructions: "Listen carefully to audio clips and answer the questions about Quranic recitation.",
      helpdesk: ["9876543210", "9123456789"]
    },
    {
      id: 4,
      title: "Islamic History - Part 1",
      class: "7th",
      duration: 75,
      totalQuestions: 12,
      status: "active",
      instructions: "Test your knowledge of early Islamic history and important events.",
      helpdesk: ["9123456789"]
    },
    {
      id: 5,
      title: "Fiqh Fundamentals",
      class: "6th",
      duration: 80,
      totalQuestions: 15,
      status: "active",
      instructions: "Understanding basic Islamic jurisprudence and daily practice rules.",
      helpdesk: ["9876543210"]
    }
  ],
  questions: [
    // Islamic Studies - Basic (Exam ID: 1)
    {
      id: 1,
      examId: 1,
      type: "mcq",
      question: "What is the first pillar of Islam?",
      options: ["Salah (Prayer)", "Shahada (Faith)", "Hajj (Pilgrimage)", "Zakat (Charity)"],
      correctAnswer: 1,
      marks: 2,
      negativeMarks: 0,
         hasImage: true,
      hasAudio: false,
      imageUrl:"https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8="
    },
    {
      id: 2,
      examId: 1,
      type: "text",
      question: "Write the meaning of 'Bismillah' in English.",
      marks: 3,
      negativeMarks: 0,
      hasImage: false,
      hasAudio: false
    },
    {
      id: 3,
      examId: 1,
      type: "mcq",
      question: "How many times do Muslims pray in a day?",
      options: ["3 times", "4 times", "5 times", "6 times"],
      correctAnswer: 2,
      marks: 2,
      negativeMarks: 0,
      hasImage: true,
      hasAudio: false,
      imageUrl:"https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8="
    },
    {
      id: 4,
      examId: 1,
      type: "mcq",
      question: "What is the holy book of Islam?",
      options: ["Bible", "Torah", "Quran", "Vedas"],
      correctAnswer: 2,
      marks: 2,
      negativeMarks: 0,
      hasImage: false,
      hasAudio: false
    },
    {
      id: 5,
      examId: 1,
      type: "text",
      question: "Name the last prophet of Islam.",
      marks: 2,
      negativeMarks: 0,
      hasImage: false,
      hasAudio: false
    },
    {
      id: 6,
      examId: 1,
      type: "mcq",
      question: "In which city is the Kaaba located?",
      options: ["Medina", "Mecca", "Jerusalem", "Cairo"],
      correctAnswer: 1,
      marks: 2,
      negativeMarks: 0,
      hasImage: false,
      hasAudio: false
    },
    {
      id: 7,
      examId: 1,
      type: "mcq",
      question: "What is the Arabic word for charity?",
      options: ["Salah", "Sawm", "Zakat", "Hajj"],
      correctAnswer: 2,
      marks: 2,
      negativeMarks: 0,
      hasImage: false,
      hasAudio: false
    },
    {
      id: 8,
      examId: 1,
      type: "text",
      question: "What does 'Insha'Allah' mean?",
      marks: 2,
      negativeMarks: 0,
      hasImage: false,
      hasAudio: false
    },
    {
      id: 9,
      examId: 1,
      type: "mcq",
      question: "Which month do Muslims fast?",
      options: ["Shawwal", "Ramadan", "Muharram", "Rajab"],
      correctAnswer: 1,
      marks: 2,
      negativeMarks: 0,
      hasImage: false,
      hasAudio: false
    },
    {
      id: 10,
      examId: 1,
      type: "mcq",
      question: "What direction do Muslims face when praying?",
      options: ["North", "South", "East", "Qibla (toward Mecca)"],
      correctAnswer: 3,
      marks: 2,
      negativeMarks: 0,
      hasImage: false,
      hasAudio: false
    },

    // Arabic Language - Level 1 (Exam ID: 2)
    {
      id: 11,
      examId: 2,
      type: "mcq",
      question: "What does 'Assalamu Alaikum' mean?",
      options: ["Good morning", "Peace be upon you", "Good night", "Thank you"],
      correctAnswer: 1,
      marks: 2,
      negativeMarks: 0,
      hasImage: false,
      hasAudio: false
    },
    {
      id: 12,
      examId: 2,
      type: "text",
      question: "Write 'Allah' in Arabic script.",
      marks: 3,
      negativeMarks: 0,
      hasImage: false,
      hasAudio: false
    },
    {
      id: 13,
      examId: 2,
      type: "mcq",
      question: "How many letters are there in the Arabic alphabet?",
      options: ["26", "28", "30", "32"],
      correctAnswer: 1,
      marks: 2,
      negativeMarks: 0,
      hasImage: false,
      hasAudio: false
    },
    {
      id: 14,
      examId: 2,
      type: "mcq",
      question: "What does 'Kitab' mean in English?",
      options: ["Pen", "Book", "Paper", "School"],
      correctAnswer: 1,
      marks: 2,
      negativeMarks: 0,
      hasImage: false,
      hasAudio: false
    },
    {
      id: 15,
      examId: 2,
      type: "text",
      question: "Write the Arabic word for 'water'.",
      marks: 2,
      negativeMarks: 0,
      hasImage: false,
      hasAudio: false
    }
  ],
  results: [
    {
      id: 1,
      studentId: 2,
      examId: 2,
      score: 85,
      totalMarks: 20,
      scoredMarks: 17,
      correctAnswers: 8,
      wrongAnswers: 2,
      completedAt: "2025-09-20T10:30:00Z",
      timeTaken: 75
    },
    {
      id: 2,
      studentId: 1,
      examId: 3,
      score: 92,
      totalMarks: 16,
      scoredMarks: 15,
      correctAnswers: 7,
      wrongAnswers: 1,
      completedAt: "2025-09-18T14:15:00Z",
      timeTaken: 40
    },
    {
      id: 3,
      studentId: 4,
      examId: 1,
      score: 78,
      totalMarks: 20,
      scoredMarks: 16,
      correctAnswers: 6,
      wrongAnswers: 4,
      completedAt: "2025-09-15T09:45:00Z",
      timeTaken: 55
    }
  ],
  programs: [
    {
      id: 1,
      title: "Islamic Studies Foundation",
      description: "Basic Islamic education for young minds covering fundamental principles and practices.",
      class: "5th-7th",
      duration: "6 months",
      image: "/images/program1.jpg"
    },
    {
      id: 2,
      title: "Arabic Language Basics",
      description: "Learn to read and understand basic Arabic words and phrases.",
      class: "5th-6th",
      duration: "4 months",
      image: "/images/program2.jpg"
    },
    {
      id: 3,
      title: "Quran Recitation Course",
      description: "Master the art of beautiful Quranic recitation with proper Tajweed.",
      class: "6th-7th",
      duration: "8 months",
      image: "/images/program3.jpg"
    }
  ],
  books: [
    {
      id: 1,
      title: "My First Arabic Book",
      author: "Dr. Abdullah Rahman",
      price: "₹299",
      class: "5th-6th",
      image: "/images/book1.jpg",
      description: "A comprehensive guide to learning Arabic alphabets and basic words."
    },
    {
      id: 2,
      title: "Stories of the Prophets",
      author: "Imam Ibn Kathir",
      price: "₹450",
      class: "6th-7th",
      image: "/images/book2.jpg",
      description: "Beautiful stories from the lives of prophets for young readers."
    },
    {
      id: 3,
      title: "Islamic Values for Children",
      author: "Dr. Aisha Malik",
      price: "₹199",
      class: "5th-7th",
      image: "/images/book3.jpg",
      description: "Teaching Islamic moral values through engaging stories and activities."
    }
  ],
  adminCredentials: {
    email: "admin@gmail.com",
    password: "admin123"
  }
}
