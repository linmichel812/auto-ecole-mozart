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

export const DEMO_CREDENTIALS = {
  email: 'eleve@demo.cm',
  password: 'Mozart2026!',
} as const;

export const MOCK_USER = {
  id: 'stu_001',
  email: 'eleve@demo.cm',
  firstName: 'Mireille',
  lastName: 'Kouam',
  phone: '+237 6 77 12 34 56',
  avatar: undefined,
  permisType: 'Permis B',
  agencyId: 'acacias',
  agencyName: 'Acacias',
  enrolledAt: '2025-11-15',
  instructorName: 'Claire Manga',
};

const MOCK_PROGRESS: TrainingProgress = {
  overallPercent: 62,
  theoryPercent: 85,
  practicePercent: 45,
  currentPhase: 'practice',
  nextMilestone: 'Examen blanc pratique : 15 mars 2026',
  phases: [
    { id: '1', label: 'Inscription & dossier', status: 'completed', percent: 100 },
    { id: '2', label: 'Code de la route', status: 'completed', percent: 100 },
    { id: '3', label: 'Conduite pratique', status: 'in_progress', percent: 45 },
    { id: '4', label: 'Examens blancs', status: 'in_progress', percent: 60 },
    { id: '5', label: 'Examen officiel', status: 'locked', percent: 0 },
  ],
};

const MOCK_PAYMENTS_SUMMARY: PaymentSummary = {
  totalDue: 50000,
  totalPaid: 35000,
  remaining: 15000,
  nextDueDate: '2026-04-01',
  nextDueAmount: 15000,
};

const MOCK_PAYMENTS: Payment[] = [
  { id: 'p1', date: '2025-11-15', label: 'Acompte inscription', amount: 15000, method: 'orange_money', status: 'paid', reference: 'OM-7829341' },
  { id: 'p2', date: '2025-12-20', label: '2e tranche', amount: 10000, method: 'mtn_momo', status: 'paid', reference: 'MTN-4491023' },
  { id: 'p3', date: '2026-02-10', label: '3e tranche', amount: 10000, method: 'cash', status: 'paid' },
  { id: 'p4', date: '2026-04-01', label: 'Solde final', amount: 15000, method: 'orange_money', status: 'pending' },
];

const MOCK_DRIVING: DrivingHours = {
  totalRequired: 20,
  completed: 9,
  remaining: 11,
  lastSession: '2026-06-18',
  sessions: [
    { id: 'd1', date: '2026-06-18', durationMinutes: 60, instructor: 'Claire Manga', topics: ['Créneaux', 'Circulation urbaine'], rating: 4 },
    { id: 'd2', date: '2026-06-14', durationMinutes: 60, instructor: 'Claire Manga', topics: ['Démarrage', 'Vitesses'], rating: 5 },
    { id: 'd3', date: '2026-06-10', durationMinutes: 60, instructor: 'Claire Manga', topics: ['Priorités', 'Rond-point'], rating: 4 },
    { id: 'd4', date: '2026-06-05', durationMinutes: 60, instructor: 'Claire Manga', topics: ['Freinage', 'Clignotants'], rating: 4 },
  ],
};

const MOCK_LESSONS: LessonSlot[] = [
  { id: 'l1', date: '2026-06-25', startTime: '08:00', endTime: '09:00', type: 'practice', title: 'Conduite pratique', location: 'Agence Acacias', instructor: 'Claire Manga', status: 'scheduled' },
  { id: 'l2', date: '2026-06-27', startTime: '14:00', endTime: '15:30', type: 'theory', title: 'Code : Signalisation', location: 'Salle Acacias', instructor: 'Admin', status: 'scheduled' },
  { id: 'l3', date: '2026-06-28', startTime: '10:00', endTime: '11:00', type: 'simulation', title: 'Examen blanc pratique', location: 'Parcours Odza', instructor: 'Samuel Eto\'o Jr.', status: 'scheduled' },
  { id: 'l4', date: '2026-06-20', startTime: '08:00', endTime: '09:00', type: 'practice', title: 'Conduite pratique', location: 'Agence Acacias', instructor: 'Claire Manga', status: 'completed' },
];

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Cours demain 8h', message: 'N\'oubliez pas votre cours de conduite demain à 8h à Acacias.', type: 'reminder', read: false, createdAt: '2026-06-23T10:00:00', link: '/espace-eleve/planning' },
  { id: 'n2', title: 'Document validé', message: 'Votre certificat médical a été approuvé.', type: 'success', read: false, createdAt: '2026-06-22T14:30:00', link: '/espace-eleve/documents' },
  { id: 'n3', title: 'Échéance paiement', message: 'Solde de 15 000 FCFA à régler avant le 1er avril.', type: 'warning', read: true, createdAt: '2026-06-20T09:00:00', link: '/espace-eleve/paiements' },
  { id: 'n4', title: 'Nouveau quiz disponible', message: '10 questions sur les panneaux de signalisation.', type: 'info', read: true, createdAt: '2026-06-18T11:00:00', link: '/espace-eleve/quiz-code' },
];

const MOCK_MESSAGES: Message[] = [
  { id: 'm1', from: 'Claire Manga', fromRole: 'instructor', subject: 'Progrès conduite', preview: 'Très bonne séance hier, continuez les créneaux...', body: 'Bonjour Mireille,\n\nTrès bonne séance hier. Vos créneaux s\'améliorent nettement. Pour la prochaine séance, nous travaillerons les prioritités à gauche.\n\nÀ bientôt,\nClaire', read: false, createdAt: '2026-06-22T16:00:00' },
  { id: 'm2', from: 'Administration Mozart', fromRole: 'admin', subject: 'Rappel solde', preview: 'Votre solde de 15 000 FCFA est dû le 1er avril...', body: 'Bonjour,\n\nNous vous rappelons que le solde de 15 000 FCFA est à régler avant le 1er avril 2026.\n\nCordialement,\nL\'équipe Mozart', read: true, createdAt: '2026-06-20T09:30:00' },
];

const MOCK_EXAMS: ExamResult[] = [
  { id: 'e1', type: 'code', date: '2026-05-10', score: 38, maxScore: 40, passed: true, notes: 'Excellent résultat' },
  { id: 'e2', type: 'code', date: '2026-04-15', score: 32, maxScore: 40, passed: true },
  { id: 'e3', type: 'conduite', date: '2026-03-01', passed: false, examiner: 'Inspecteur', notes: 'À retenter : stationnement' },
];

const MOCK_DOCUMENTS: AdminDocument[] = [
  { id: 'doc1', name: 'Photocopie CNI', type: 'cni', status: 'approved', uploadedAt: '2025-11-15' },
  { id: 'doc2', name: 'Certificat médical', type: 'medical', status: 'approved', uploadedAt: '2025-11-16' },
  { id: 'doc3', name: 'Photos identité (×4)', type: 'photo', status: 'approved', uploadedAt: '2025-11-15' },
  { id: 'doc4', name: 'Contrat de formation', type: 'contract', status: 'approved', uploadedAt: '2025-11-15' },
  { id: 'doc5', name: 'Justificatif domicile', type: 'other', status: 'pending', uploadedAt: '2026-06-01' },
];

const MOCK_RESOURCES: Resource[] = [
  { id: 'r1', title: 'Code de la route Cameroun : PDF officiel', category: 'code', format: 'pdf', url: '#' },
  { id: 'r2', title: 'Panneaux de signalisation', category: 'code', format: 'article', duration: '15 min', url: '#' },
  { id: 'r3', title: 'Techniques de stationnement', category: 'conduite', format: 'video', duration: '12 min', url: '#' },
  { id: 'r4', title: 'Guide examen pratique Yaoundé', category: 'conduite', format: 'pdf', url: '#' },
  { id: 'r5', title: 'Checklist jour J', category: 'admin', format: 'article', duration: '5 min', url: '#' },
];

const MOCK_MOCK_EXAMS: MockExam[] = [
  { id: 'me1', title: 'Examen blanc code : Série A', questionsCount: 40, durationMinutes: 30, passingScore: 35, bestScore: 38, attempts: 3 },
  { id: 'me2', title: 'Examen blanc code : Série B', questionsCount: 40, durationMinutes: 30, passingScore: 35, bestScore: 36, attempts: 2 },
  { id: 'me3', title: 'Examen blanc code : Série C', questionsCount: 40, durationMinutes: 30, passingScore: 35, attempts: 0 },
];

const MOCK_STATS: ProgressStats = {
  quizAverage: 82,
  mockExamBest: 38,
  lessonsCompleted: 14,
  lessonsTotal: 24,
  weeklyHours: [2, 1.5, 2, 0, 2, 1, 0],
  streakDays: 5,
};

export const MOCK_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Ce panneau triangulaire à bord rouge signifie :',
    options: ['Danger', 'Interdiction', 'Obligation', 'Indication'],
    correctIndex: 0,
    explanation: 'Le triangle pointe en haut avec bordure rouge = signal de danger au Cameroun.',
    category: 'Signalisation',
  },
  {
    id: 'q2',
    question: 'La vitesse maximale en agglomération au Cameroun est généralement de :',
    options: ['40 km/h', '50 km/h', '60 km/h', '80 km/h'],
    correctIndex: 1,
    explanation: 'En agglomération, la limite est de 50 km/h sauf indication contraire.',
    category: 'Vitesses',
  },
  {
    id: 'q3',
    question: 'Le feu orange fixe signifie :',
    options: ['Accélérer', 'Stop obligatoire si possible', 'Passage autorisé', 'Céder le passage'],
    correctIndex: 1,
    explanation: 'Feu orange = arrêt sauf si l\'arrêt brusque est dangereux.',
    category: 'Signalisation lumineuse',
  },
  {
    id: 'q4',
    question: 'Avant de changer de voie, vous devez :',
    options: ['Klaxonner', 'Regarder rétroviseurs et angle mort', 'Accélérer', 'Freiner fort'],
    correctIndex: 1,
    explanation: 'Contrôle des rétroviseurs + angle mort + clignotant avant tout changement de voie.',
    category: 'Conduite',
  },
  {
    id: 'q5',
    question: 'La ceinture de sécurité est obligatoire :',
    options: ['Uniquement sur autoroute', 'À l\'avant uniquement', 'Pour tous les occupants', 'Uniquement de nuit'],
    correctIndex: 2,
    explanation: 'Tous les occupants doivent être ceinturés, avant et arrière.',
    category: 'Sécurité',
  },
  {
    id: 'q6',
    question: 'En cas de pluie forte, vous devez :',
    options: ['Augmenter la vitesse', 'Réduire vitesse et augmenter distance', 'Feux de route permanents', 'Couper les essuie-glaces'],
    correctIndex: 1,
    explanation: 'Réduire la vitesse et doubler la distance de sécurité par temps de pluie.',
    category: 'Conduite',
  },
  {
    id: 'q7',
    question: 'Un panneau rond à fond bleu indique :',
    options: ['Une interdiction', 'Une obligation', 'Un danger', 'Une direction'],
    correctIndex: 1,
    explanation: 'Panneau rond bleu = signal d\'obligation.',
    category: 'Signalisation',
  },
  {
    id: 'q8',
    question: 'Le taux d\'alcoolémie toléré pour un permis B est de :',
    options: ['0 g/L', '0,2 g/L', '0,5 g/L', '0,8 g/L'],
    correctIndex: 2,
    explanation: 'Au Cameroun, la limite légale est de 0,5 g/L de sang pour les conducteurs.',
    category: 'Réglementation',
  },
  {
    id: 'q9',
    question: 'À un carrefour sans signalisation, la priorité revient :',
    options: ['Au plus rapide', 'À droite', 'À gauche', 'Au plus gros véhicule'],
    correctIndex: 1,
    explanation: 'Règle de base : priorité à droite sauf signalisation contraire.',
    category: 'Priorités',
  },
  {
    id: 'q10',
    question: 'Le stationnement est interdit :',
    options: ['Devant un garage', 'Sur un passage piéton', 'Près d\'un arbre', 'Sur un parking payant'],
    correctIndex: 1,
    explanation: 'Stationnement interdit sur passages piétons et à moins de 5 m des intersections.',
    category: 'Stationnement',
  },
];

function delay(ms = 400): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function createMockToken(): AuthSession['tokens'] {
  const expiresAt = Date.now() + 3600 * 1000;
  return {
    accessToken: `mock_jwt_${MOCK_USER.id}_${expiresAt}`,
    refreshToken: `mock_refresh_${MOCK_USER.id}`,
    expiresAt,
  };
}

export const mockStudentApi = {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    await delay(600);
    if (
      credentials.email.toLowerCase() === DEMO_CREDENTIALS.email &&
      credentials.password === DEMO_CREDENTIALS.password
    ) {
      return { user: MOCK_USER, tokens: createMockToken() };
    }
    throw new Error('Email ou mot de passe incorrect.');
  },

  async getDashboard(): Promise<StudentDashboard> {
    await delay(300);
    return {
      user: MOCK_USER,
      progress: MOCK_PROGRESS,
      payments: MOCK_PAYMENTS_SUMMARY,
      drivingHours: MOCK_DRIVING,
      upcomingLessons: MOCK_LESSONS.filter((l) => l.status === 'scheduled').slice(0, 3),
      unreadNotifications: MOCK_NOTIFICATIONS.filter((n) => !n.read).length,
      unreadMessages: MOCK_MESSAGES.filter((m) => !m.read).length,
      recentNotifications: MOCK_NOTIFICATIONS.slice(0, 3),
    };
  },

  async getProgress(): Promise<TrainingProgress> {
    await delay(200);
    return MOCK_PROGRESS;
  },

  async getPayments(): Promise<{ summary: PaymentSummary; history: Payment[] }> {
    await delay(200);
    return { summary: MOCK_PAYMENTS_SUMMARY, history: MOCK_PAYMENTS };
  },

  async getPlanning(): Promise<LessonSlot[]> {
    await delay(200);
    return MOCK_LESSONS;
  },

  async bookSession(booking: BookingRequest): Promise<LessonSlot> {
    await delay(500);
    const slot: LessonSlot = {
      id: `l_new_${Date.now()}`,
      date: booking.date,
      startTime: booking.timeSlot.split('-')[0] ?? '08:00',
      endTime: booking.timeSlot.split('-')[1] ?? '09:00',
      type: booking.type,
      title: booking.type === 'practice' ? 'Conduite pratique' : 'Cours théorique',
      location: 'Agence Acacias',
      instructor: 'Claire Manga',
      status: 'scheduled',
    };
    MOCK_LESSONS.unshift(slot);
    return slot;
  },

  async getDrivingHours(): Promise<DrivingHours> {
    await delay(200);
    return MOCK_DRIVING;
  },

  async getDocuments(): Promise<AdminDocument[]> {
    await delay(200);
    return MOCK_DOCUMENTS;
  },

  async getNotifications(): Promise<Notification[]> {
    await delay(200);
    return MOCK_NOTIFICATIONS;
  },

  async markNotificationRead(id: string): Promise<void> {
    await delay(100);
    const n = MOCK_NOTIFICATIONS.find((x) => x.id === id);
    if (n) n.read = true;
  },

  async getMessages(): Promise<Message[]> {
    await delay(200);
    return MOCK_MESSAGES;
  },

  async sendMessage(subject: string, body: string): Promise<Message> {
    await delay(400);
    const msg: Message = {
      id: `m_${Date.now()}`,
      from: MOCK_USER.firstName + ' ' + MOCK_USER.lastName,
      fromRole: 'system',
      subject,
      preview: body.slice(0, 60),
      body,
      read: true,
      createdAt: new Date().toISOString(),
    };
    return msg;
  },

  async getExamResults(): Promise<ExamResult[]> {
    await delay(200);
    return MOCK_EXAMS;
  },

  async getResources(): Promise<Resource[]> {
    await delay(200);
    return MOCK_RESOURCES;
  },

  async getQuizQuestions(): Promise<QuizQuestion[]> {
    await delay(200);
    return MOCK_QUIZ;
  },

  async getMockExams(): Promise<MockExam[]> {
    await delay(200);
    return MOCK_MOCK_EXAMS;
  },

  async getStatistics(): Promise<ProgressStats> {
    await delay(200);
    return MOCK_STATS;
  },
};
