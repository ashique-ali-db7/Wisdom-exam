import * as yup from 'yup'

export const mobileValidationSchema = yup.object({
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number')
})

export const studentValidationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  dob: yup
    .date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future'),
  class: yup
    .string()
    .required('Class is required')
    .oneOf(['5th', '6th', '7th'], 'Please select a valid class'),
  fatherName: yup
    .string()
    .required('Father\'s name is required')
    .min(2, 'Father\'s name must be at least 2 characters'),
  jilla: yup
    .string()
    .required('Jilla/District is required'),
  madrasaName: yup
    .string(),
  place: yup
    .string()
    .required('Place is required'),
  whatsappNumber: yup
    .string()
    .required('WhatsApp number is required')
    .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit WhatsApp number')
})

export const adminLoginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
})

export const quizValidationSchema = yup.object({
  title: yup
    .string()
    .required('Quiz title is required')
    .min(3, 'Title must be at least 3 characters'),
  class: yup
    .string()
    .required('Class is required')
    .oneOf(['5th', '6th', '7th'], 'Please select a valid class'),
  duration: yup
    .number()
    .required('Duration is required')
    .min(15, 'Minimum duration is 15 minutes')
    .max(180, 'Maximum duration is 180 minutes'),
  instructions: yup
    .string()
    .required('Instructions are required')
    .min(10, 'Instructions must be at least 10 characters'),
  helpdesk: yup
    .array()
    .of(
      yup.string().matches(/^[0-9]{10}$/, 'Please enter valid 10-digit numbers')
    )
    .max(2, 'Maximum 2 helpdesk numbers allowed')
})

export const questionValidationSchema = yup.object({
  type: yup
    .string()
    .required('Question type is required')
    .oneOf(['mcq', 'text'], 'Please select a valid question type'),
  question: yup
    .string()
    .required('Question is required')
    .min(5, 'Question must be at least 5 characters'),
  marks: yup
    .number()
    .required('Marks are required')
    .min(1, 'Minimum 1 mark required')
    .max(10, 'Maximum 10 marks allowed'),
  negativeMarks: yup
    .number()
    .min(0, 'Negative marks cannot be less than 0')
    .max(5, 'Maximum 5 negative marks allowed'),
  options: yup
    .array()
    .when('type', {
      is: 'mcq',
      then: yup
        .array()
        .of(yup.string().required('Option cannot be empty'))
        .min(2, 'At least 2 options required')
        .max(4, 'Maximum 4 options allowed'),
      otherwise: yup.array()
    }),
  correctAnswer: yup
    .number()
    .when('type', {
      is: 'mcq',
      then: yup
        .number()
        .required('Correct answer is required')
        .min(0, 'Please select a valid option'),
      otherwise: yup.number()
    })
})
