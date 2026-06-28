/** Types du domaine élève : contrat API prêt pour le backend */

export interface StudentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  permisType: string;
  agencyId: string;
  agencyName: string;
  enrolledAt: string;
  instructorName: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthSession {
  user: StudentUser;
  tokens: AuthTokens;
}

export interface TrainingProgress {
  overallPercent: number;
  theoryPercent: number;
  practicePercent: number;
  currentPhase: 'theory' | 'practice' | 'exam_prep' | 'completed';
  phases: ProgressPhase[];
  nextMilestone: string;
}

export interface ProgressPhase {
  id: string;
  label: string;
  status: 'completed' | 'in_progress' | 'locked';
  percent: number;
}

export interface Payment {
  id: string;
  date: string;
  label: string;
  amount: number;
  method: 'orange_money' | 'mtn_momo' | 'cash' | 'bank';
  status: 'paid' | 'pending' | 'overdue';
  reference?: string;
}

export interface PaymentSummary {
  totalDue: number;
  totalPaid: number;
  remaining: number;
  nextDueDate?: string;
  nextDueAmount?: number;
}

export interface LessonSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'theory' | 'practice' | 'simulation';
  title: string;
  location: string;
  instructor: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface BookingRequest {
  date: string;
  timeSlot: string;
  type: 'theory' | 'practice';
  notes?: string;
}

export interface DrivingHours {
  totalRequired: number;
  completed: number;
  remaining: number;
  lastSession?: string;
  sessions: DrivingSession[];
}

export interface DrivingSession {
  id: string;
  date: string;
  durationMinutes: number;
  instructor: string;
  topics: string[];
  rating?: number;
}

export interface AdminDocument {
  id: string;
  name: string;
  type: 'cni' | 'medical' | 'photo' | 'contract' | 'other';
  status: 'approved' | 'pending' | 'rejected' | 'missing';
  uploadedAt?: string;
  url?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'reminder';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface Message {
  id: string;
  from: string;
  fromRole: 'instructor' | 'admin' | 'system';
  subject: string;
  preview: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface ExamResult {
  id: string;
  type: 'code' | 'conduite';
  date: string;
  score?: number;
  maxScore?: number;
  passed: boolean;
  examiner?: string;
  notes?: string;
}

export interface Resource {
  id: string;
  title: string;
  category: 'code' | 'conduite' | 'admin' | 'video';
  format: 'pdf' | 'video' | 'article';
  duration?: string;
  url: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface MockExam {
  id: string;
  title: string;
  questionsCount: number;
  durationMinutes: number;
  passingScore: number;
  bestScore?: number;
  attempts: number;
}

export interface ProgressStats {
  quizAverage: number;
  mockExamBest: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  weeklyHours: number[];
  streakDays: number;
}

export interface StudentDashboard {
  user: StudentUser;
  progress: TrainingProgress;
  payments: PaymentSummary;
  drivingHours: DrivingHours;
  upcomingLessons: LessonSlot[];
  unreadNotifications: number;
  unreadMessages: number;
  recentNotifications: Notification[];
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ApiError {
  code: string;
  message: string;
}
