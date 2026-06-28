/**
 * Types domaine administrateur : contrat API backend.
 * @module admin/types
 */

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'admin' | 'manager';
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AdminSession {
  user: AdminUser;
  tokens: AuthTokens;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface StudentRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  permisType: string;
  agencyId: string;
  agencyName: string;
  status: 'active' | 'pending' | 'completed' | 'suspended';
  enrolledAt: string;
  progressPercent: number;
  totalPaid: number;
  totalDue: number;
}

export interface AgencyRecord {
  id: string;
  name: string;
  district: string;
  address: string;
  phone: string;
  hours: string;
  active: boolean;
  studentsCount: number;
}

export interface FormationRecord {
  id: string;
  title: string;
  category: string;
  totalPrice: number;
  deposit: number;
  duration: string;
  active: boolean;
  enrollments: number;
}

export interface ContentRecord {
  id: string;
  type: 'article' | 'faq';
  title: string;
  category: string;
  status: 'published' | 'draft';
  updatedAt: string;
}

export interface TestimonialRecord {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  published: boolean;
}

export interface InscriptionRecord {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  permisId: string;
  permisLabel: string;
  agencyId: string;
  agencyName: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  depositPaid: boolean;
  paymentMethod?: string;
}

export interface ActivityLogEntry {
  id: string;
  action: string;
  actor: string;
  actorRole: string;
  resource: string;
  resourceId?: string;
  details?: string;
  createdAt: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface AdminStats {
  totalStudents: number;
  activeStudents: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingPayments: number;
  pendingInscriptions: number;
  agenciesCount: number;
  formationsCount: number;
  conversionRate: number;
}

export interface AdminDashboard {
  stats: AdminStats;
  recentActivity: ActivityLogEntry[];
  revenueByMonth: Array<{ month: string; amount: number }>;
  studentsByAgency: Array<{ agency: string; count: number }>;
}

export interface AdminPaymentRecord {
  id: string;
  studentName: string;
  amount: number;
  method: string;
  planType: string;
  status: string;
  date: string;
  reference: string;
}
