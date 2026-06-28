/**
 * Mock API administrateur : données mutables en mémoire.
 * @module admin/api/mockAdminApi
 */

import { AGENCIES } from '../../data/agencies';
import { ARTICLES } from '../../data/articles';
import { FAQ_ITEMS } from '../../data/faq';
import { TESTIMONIALS } from '../../data/home';
import { PERMIS_PRICING } from '../../shared/constants/pricing';
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

export const DEMO_ADMIN_CREDENTIALS = {
  email: 'admin@mozart.cm',
  password: 'MozartAdmin2026!',
} as const;

const ADMIN_USER = {
  id: 'adm_001',
  email: 'admin@mozart.cm',
  firstName: 'Samuel',
  lastName: 'Eto\'o',
  role: 'super_admin' as const,
};

let students: StudentRecord[] = [
  { id: 'stu_001', firstName: 'Mireille', lastName: 'Kouam', email: 'eleve@demo.cm', phone: '+237 6 77 12 34 56', permisType: 'Permis B', agencyId: 'acacias', agencyName: 'Acacias', status: 'active', enrolledAt: '2025-11-15', progressPercent: 62, totalPaid: 35000, totalDue: 50000 },
  { id: 'stu_002', firstName: 'Jean', lastName: 'Mbarga', email: 'jean.mb@email.cm', phone: '+237 6 99 88 77 66', permisType: 'Permis B', agencyId: 'odza', agencyName: 'Odza', status: 'active', enrolledAt: '2026-01-10', progressPercent: 35, totalPaid: 15000, totalDue: 50000 },
  { id: 'stu_003', firstName: 'Aïcha', lastName: 'Bello', email: 'aicha.b@email.cm', phone: '+237 6 55 44 33 22', permisType: 'Permis A', agencyId: 'mvan', agencyName: 'Mvan', status: 'pending', enrolledAt: '2026-06-01', progressPercent: 5, totalPaid: 0, totalDue: 35000 },
  { id: 'stu_004', firstName: 'Patrick', lastName: 'Ndjock', email: 'p.ndjock@email.cm', phone: '+237 6 11 22 33 44', permisType: 'Permis B', agencyId: 'acacias', agencyName: 'Acacias', status: 'completed', enrolledAt: '2025-06-01', progressPercent: 100, totalPaid: 50000, totalDue: 50000 },
];

let agencies: AgencyRecord[] = AGENCIES.map((a) => ({
  id: a.id,
  name: a.name,
  district: a.name,
  address: a.address,
  phone: a.phone,
  hours: a.hours,
  active: true,
  studentsCount: students.filter((s) => s.agencyId === a.id).length,
}));

let formations: FormationRecord[] = Object.values(PERMIS_PRICING).map((p) => ({
  id: p.id,
  title: p.label,
  category: p.id.includes('permis') ? 'Permis' : 'Spécial',
  totalPrice: p.totalPrice,
  deposit: p.deposit,
  duration: '1-2 mois',
  active: true,
  enrollments: 12,
}));

let testimonials: TestimonialRecord[] = TESTIMONIALS.map((t) => ({
  id: t.id,
  name: t.name,
  role: t.meta,
  quote: t.text,
  rating: t.rating ?? 5,
  published: true,
}));

let inscriptions: InscriptionRecord[] = [
  { id: 'ins_001', applicantName: 'Brice Fokou', email: 'brice.f@email.cm', phone: '677998877', permisId: 'permis-b', permisLabel: 'Permis B', agencyId: 'odza', agencyName: 'Odza', status: 'pending', submittedAt: '2026-06-22T10:00:00', depositPaid: false },
  { id: 'ins_002', applicantName: 'Grace Tchami', email: 'grace.t@email.cm', phone: '655112233', permisId: 'permis-a', permisLabel: 'Permis A', agencyId: 'mvan', agencyName: 'Mvan', status: 'pending', submittedAt: '2026-06-21T14:30:00', depositPaid: true, paymentMethod: 'orange_money' },
  { id: 'ins_003', applicantName: 'Eric Nguema', email: 'eric.n@email.cm', phone: '699887766', permisId: 'permis-b', permisLabel: 'Permis B', agencyId: 'acacias', agencyName: 'Acacias', status: 'approved', submittedAt: '2026-06-18T09:00:00', depositPaid: true, paymentMethod: 'mtn_momo' },
];

let activityLog: ActivityLogEntry[] = [
  { id: 'log_1', action: 'Paiement validé', actor: 'Système', actorRole: 'system', resource: 'payment', resourceId: 'tx_p2', details: 'MTN MoMo 10 000 FCFA, Mireille Kouam', createdAt: '2026-06-20T11:00:00', severity: 'info' },
  { id: 'log_2', action: 'Inscription reçue', actor: 'Brice Fokou', actorRole: 'public', resource: 'inscription', resourceId: 'ins_001', createdAt: '2026-06-22T10:00:00', severity: 'info' },
  { id: 'log_3', action: 'Document approuvé', actor: 'Samuel Eto\'o', actorRole: 'admin', resource: 'document', resourceId: 'doc2', details: 'Certificat médical, Mireille Kouam', createdAt: '2026-06-22T14:30:00', severity: 'info' },
  { id: 'log_4', action: 'Tentative connexion échouée', actor: 'unknown', actorRole: 'public', resource: 'auth', details: 'IP 102.XXX.XXX.XX', createdAt: '2026-06-23T03:15:00', severity: 'warning' },
  { id: 'log_5', action: 'Élève suspendu', actor: 'Samuel Eto\'o', actorRole: 'admin', resource: 'student', resourceId: 'stu_003', details: 'Dossier incomplet', createdAt: '2026-06-19T16:00:00', severity: 'critical' },
];

function delay(ms = 300): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function logActivity(entry: Omit<ActivityLogEntry, 'id' | 'createdAt'>) {
  activityLog.unshift({
    ...entry,
    id: `log_${Date.now()}`,
    createdAt: new Date().toISOString(),
  });
}

function createToken(): AdminSession['tokens'] {
  const expiresAt = Date.now() + 3600 * 1000;
  return {
    accessToken: `admin_jwt_${ADMIN_USER.id}_${expiresAt}`,
    refreshToken: `admin_refresh_${ADMIN_USER.id}`,
    expiresAt,
  };
}

export const mockAdminApi = {
  async login(credentials: LoginCredentials): Promise<AdminSession> {
    await delay(500);
    if (
      credentials.email.toLowerCase() === DEMO_ADMIN_CREDENTIALS.email &&
      credentials.password === DEMO_ADMIN_CREDENTIALS.password
    ) {
      logActivity({ action: 'Connexion admin', actor: ADMIN_USER.firstName + ' ' + ADMIN_USER.lastName, actorRole: 'admin', resource: 'auth', severity: 'info' });
      return { user: ADMIN_USER, tokens: createToken() };
    }
    logActivity({ action: 'Connexion admin échouée', actor: credentials.email, actorRole: 'public', resource: 'auth', severity: 'warning' });
    throw new Error('Identifiants administrateur incorrects.');
  },

  async getDashboard(): Promise<AdminDashboard> {
    await delay(300);
    const activeStudents = students.filter((s) => s.status === 'active').length;
    const totalRevenue = students.reduce((sum, s) => sum + s.totalPaid, 0);
    return {
      stats: {
        totalStudents: students.length,
        activeStudents,
        totalRevenue,
        monthlyRevenue: 85000,
        pendingPayments: 2,
        pendingInscriptions: inscriptions.filter((i) => i.status === 'pending').length,
        agenciesCount: agencies.filter((a) => a.active).length,
        formationsCount: formations.filter((f) => f.active).length,
        conversionRate: 68,
      },
      recentActivity: activityLog.slice(0, 8),
      revenueByMonth: [
        { month: 'Jan', amount: 420000 },
        { month: 'Fév', amount: 380000 },
        { month: 'Mar', amount: 510000 },
        { month: 'Avr', amount: 470000 },
        { month: 'Mai', amount: 620000 },
        { month: 'Juin', amount: 850000 },
      ],
      studentsByAgency: agencies.map((a) => ({
        agency: a.name,
        count: students.filter((s) => s.agencyId === a.id).length,
      })),
    };
  },

  async getStudents(): Promise<StudentRecord[]> {
    await delay(200);
    return [...students];
  },

  async updateStudentStatus(id: string, status: StudentRecord['status']): Promise<StudentRecord> {
    await delay(300);
    const s = students.find((x) => x.id === id);
    if (!s) throw new Error('Élève introuvable');
    s.status = status;
    logActivity({ action: `Statut élève → ${status}`, actor: ADMIN_USER.firstName, actorRole: 'admin', resource: 'student', resourceId: id, severity: 'info' });
    return s;
  },

  async getAgencies(): Promise<AgencyRecord[]> {
    await delay(200);
    return [...agencies];
  },

  async toggleAgency(id: string): Promise<AgencyRecord> {
    await delay(200);
    const a = agencies.find((x) => x.id === id);
    if (!a) throw new Error('Agence introuvable');
    a.active = !a.active;
    logActivity({ action: `Agence ${a.active ? 'activée' : 'désactivée'}`, actor: ADMIN_USER.firstName, actorRole: 'admin', resource: 'agency', resourceId: id, severity: 'info' });
    return a;
  },

  async getFormations(): Promise<FormationRecord[]> {
    await delay(200);
    return [...formations];
  },

  async updateFormationPrice(id: string, totalPrice: number, deposit: number): Promise<FormationRecord> {
    await delay(300);
    const f = formations.find((x) => x.id === id);
    if (!f) throw new Error('Formation introuvable');
    f.totalPrice = totalPrice;
    f.deposit = deposit;
    logActivity({ action: 'Tarif formation modifié', actor: ADMIN_USER.firstName, actorRole: 'admin', resource: 'formation', resourceId: id, details: `${totalPrice} FCFA`, severity: 'info' });
    return f;
  },

  async getContents(): Promise<ContentRecord[]> {
    await delay(200);
    const articles: ContentRecord[] = ARTICLES.map((a) => ({
      id: a.slug,
      type: 'article',
      title: a.title,
      category: a.category,
      status: 'published',
      updatedAt: a.date,
    }));
    const faqs: ContentRecord[] = FAQ_ITEMS.map((f, i) => ({
      id: `faq_${i}`,
      type: 'faq',
      title: f.question.slice(0, 60) + (f.question.length > 60 ? '…' : ''),
      category: f.category,
      status: 'published',
      updatedAt: '2026-01-01',
    }));
    return [...articles, ...faqs];
  },

  async getTestimonials(): Promise<TestimonialRecord[]> {
    await delay(200);
    return [...testimonials];
  },

  async toggleTestimonial(id: string): Promise<TestimonialRecord> {
    await delay(200);
    const t = testimonials.find((x) => x.id === id);
    if (!t) throw new Error('Témoignage introuvable');
    t.published = !t.published;
    logActivity({ action: `Témoignage ${t.published ? 'publié' : 'masqué'}`, actor: ADMIN_USER.firstName, actorRole: 'admin', resource: 'testimonial', resourceId: id, severity: 'info' });
    return t;
  },

  async getInscriptions(): Promise<InscriptionRecord[]> {
    await delay(200);
    return [...inscriptions];
  },

  async updateInscriptionStatus(id: string, status: InscriptionRecord['status']): Promise<InscriptionRecord> {
    await delay(300);
    const ins = inscriptions.find((x) => x.id === id);
    if (!ins) throw new Error('Inscription introuvable');
    ins.status = status;
    logActivity({ action: `Inscription ${status}`, actor: ADMIN_USER.firstName, actorRole: 'admin', resource: 'inscription', resourceId: id, severity: 'info' });
    return ins;
  },

  async getActivityLog(): Promise<ActivityLogEntry[]> {
    await delay(200);
    return [...activityLog];
  },

  async getPayments(): Promise<AdminPaymentRecord[]> {
    await delay(200);
    return students.flatMap((s) => {
      if (s.totalPaid === 0) return [];
      return [{
        id: `pay_${s.id}`,
        studentName: `${s.firstName} ${s.lastName}`,
        amount: s.totalPaid,
        method: 'orange_money',
        planType: 'installment',
        status: s.totalPaid >= s.totalDue ? 'completed' : 'partial',
        date: s.enrolledAt,
        reference: `REF-${s.id.toUpperCase()}`,
      }];
    });
  },

  async getStatistics(): Promise<AdminDashboard> {
    return this.getDashboard();
  },
};
