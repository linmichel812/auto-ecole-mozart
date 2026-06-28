import { USE_MOCK_API } from './client';
import { mockStudentApi } from './mockStudentApi';
import type {
  AdminDocument,
  AuthSession,
  BookingRequest,
  DrivingHours,
  ExamResult,
  LessonSlot,
  LoginCredentials,
  Message,
  MockExam,
  Notification,
  Payment,
  PaymentSummary,
  ProgressStats,
  QuizQuestion,
  Resource,
  StudentDashboard,
  TrainingProgress,
} from '../types';

/** Couche service : point d'entrée unique pour le frontend */
export const studentService = {
  login: (c: LoginCredentials): Promise<AuthSession> =>
    USE_MOCK_API ? mockStudentApi.login(c) : mockStudentApi.login(c),

  getDashboard: (): Promise<StudentDashboard> => mockStudentApi.getDashboard(),
  getProgress: (): Promise<TrainingProgress> => mockStudentApi.getProgress(),
  getPayments: (): Promise<{ summary: PaymentSummary; history: Payment[] }> => mockStudentApi.getPayments(),
  getPlanning: (): Promise<LessonSlot[]> => mockStudentApi.getPlanning(),
  bookSession: (b: BookingRequest): Promise<LessonSlot> => mockStudentApi.bookSession(b),
  getDrivingHours: (): Promise<DrivingHours> => mockStudentApi.getDrivingHours(),
  getDocuments: (): Promise<AdminDocument[]> => mockStudentApi.getDocuments(),
  getNotifications: (): Promise<Notification[]> => mockStudentApi.getNotifications(),
  markNotificationRead: (id: string): Promise<void> => mockStudentApi.markNotificationRead(id),
  getMessages: (): Promise<Message[]> => mockStudentApi.getMessages(),
  sendMessage: (s: string, b: string): Promise<Message> => mockStudentApi.sendMessage(s, b),
  getExamResults: (): Promise<ExamResult[]> => mockStudentApi.getExamResults(),
  getResources: (): Promise<Resource[]> => mockStudentApi.getResources(),
  getQuizQuestions: (): Promise<QuizQuestion[]> => mockStudentApi.getQuizQuestions(),
  getMockExams: (): Promise<MockExam[]> => mockStudentApi.getMockExams(),
  getStatistics: (): Promise<ProgressStats> => mockStudentApi.getStatistics(),
};

export { DEMO_CREDENTIALS } from './mockStudentApi';
