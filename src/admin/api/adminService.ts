/**
 * Service administrateur : façade unique pour l'espace admin.
 * @module admin/api/adminService
 */

import { USE_MOCK_API } from '../../student/api/client';
import { mockAdminApi } from './mockAdminApi';
import type {
  ActivityLogEntry,
  AdminDashboard,
  AdminPaymentRecord,
  AdminSession,
  AgencyRecord,
  ContentRecord,
  FormationRecord,
  InscriptionRecord,
  LoginCredentials,
  StudentRecord,
  TestimonialRecord,
} from '../types';

export const adminService = {
  login: (c: LoginCredentials): Promise<AdminSession> =>
    USE_MOCK_API ? mockAdminApi.login(c) : mockAdminApi.login(c),

  getDashboard: (): Promise<AdminDashboard> => mockAdminApi.getDashboard(),
  getStatistics: (): Promise<AdminDashboard> => mockAdminApi.getStatistics(),

  getStudents: (): Promise<StudentRecord[]> => mockAdminApi.getStudents(),
  updateStudentStatus: (id: string, status: StudentRecord['status']) =>
    mockAdminApi.updateStudentStatus(id, status),

  getAgencies: (): Promise<AgencyRecord[]> => mockAdminApi.getAgencies(),
  toggleAgency: (id: string) => mockAdminApi.toggleAgency(id),

  getFormations: (): Promise<FormationRecord[]> => mockAdminApi.getFormations(),
  updateFormationPrice: (id: string, total: number, deposit: number) =>
    mockAdminApi.updateFormationPrice(id, total, deposit),

  getContents: (): Promise<ContentRecord[]> => mockAdminApi.getContents(),
  getTestimonials: (): Promise<TestimonialRecord[]> => mockAdminApi.getTestimonials(),
  toggleTestimonial: (id: string) => mockAdminApi.toggleTestimonial(id),

  getInscriptions: (): Promise<InscriptionRecord[]> => mockAdminApi.getInscriptions(),
  updateInscriptionStatus: (id: string, status: InscriptionRecord['status']) =>
    mockAdminApi.updateInscriptionStatus(id, status),

  getActivityLog: (): Promise<ActivityLogEntry[]> => mockAdminApi.getActivityLog(),
  getPayments: (): Promise<AdminPaymentRecord[]> => mockAdminApi.getPayments(),
};

export { DEMO_ADMIN_CREDENTIALS } from './mockAdminApi';
