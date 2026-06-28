import { lazy, Suspense, type ComponentType } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/routing/ScrollToTop';
import { PageLoader } from './components/ui/PageLoader';
import { AdminRoutes } from './admin/AdminRoutes';
import { StudentRoutes } from './student/StudentRoutes';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const PermisPage = lazy(() => import('./pages/PermisPage').then((m) => ({ default: m.PermisPage })));
const AgenciesPage = lazy(() => import('./pages/AgenciesPage').then((m) => ({ default: m.AgenciesPage })));
const NewsPage = lazy(() => import('./pages/NewsPage').then((m) => ({ default: m.NewsPage })));
const ArticlePage = lazy(() => import('./pages/ArticlePage').then((m) => ({ default: m.ArticlePage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then((m) => ({ default: m.FAQPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const InscriptionPage = lazy(() => import('./pages/InscriptionPage').then((m) => ({ default: m.InscriptionPage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.LegalPage })));

function withLayout(Page: ComponentType) {
  return (
    <Layout>
      <Page />
    </Layout>
  );
}

function NotFoundPage() {
  return (
    <Layout>
      <div className="moz-container pages__content" style={{ textAlign: 'center', paddingBlock: '6rem' }}>
        <h1>Page introuvable</h1>
        <p className="moz-lead" style={{ marginBottom: '2rem' }}>
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <a href="/" className="moz-btn moz-btn--primary moz-btn--md">
          Retour à l&apos;accueil
        </a>
      </div>
    </Layout>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={withLayout(HomePage)} />
          <Route path="/a-propos" element={withLayout(AboutPage)} />
          <Route path="/nos-permis" element={withLayout(PermisPage)} />
          <Route path="/nos-agences" element={withLayout(AgenciesPage)} />
          <Route path="/actualites" element={withLayout(NewsPage)} />
          <Route path="/actualites/:slug" element={withLayout(ArticlePage)} />
          <Route path="/faq" element={withLayout(FAQPage)} />
          <Route path="/contact" element={withLayout(ContactPage)} />
          <Route path="/inscription" element={withLayout(InscriptionPage)} />
          <Route path="/legal/:slug" element={<LegalPage />} />
          <Route path="/espace-eleve/*" element={<StudentRoutes />} />
          <Route path="/espace-admin/*" element={<AdminRoutes />} />
          <Route path="/formations" element={withLayout(PermisPage)} />
          <Route path="/auto-ecole/nos-agences" element={withLayout(AgenciesPage)} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
