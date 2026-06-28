import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GdprConsent } from '../components/legal/GdprConsent';
import { Badge, Button, FormGrid, Input } from '../design-system';
import { PageHero } from '../components/layout/PageHero';
import { SeoHead } from '../components/seo/SeoHead';
import {
  AGENCIES,
  CONTACT,
  DEPOSIT_AMOUNTS,
  INSCRIPTION_STEPS,
  PAYMENT_METHODS,
  PERMIS_DETAILS,
  REQUIRED_DOCUMENTS,
} from '../data';
import './InscriptionPage.css';
import './pages.css';

const STORAGE_KEY = 'mozart-inscription-v1';

export interface InscriptionFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  permisId: string;
  agencyId: string;
  documents: Record<string, string>;
  paymentMethod: string;
  acceptTerms: boolean;
}

const defaultData: InscriptionFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  address: '',
  permisId: '',
  agencyId: '',
  documents: {},
  paymentMethod: 'orange',
  acceptTerms: false,
};

export function InscriptionPage() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<InscriptionFormData>(defaultData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData({ ...defaultData, ...JSON.parse(saved) });
      } catch {
        /* ignore */
      }
    }
    const permis = searchParams.get('permis');
    const agence = searchParams.get('agence');
    if (permis || agence) {
      setData((prev) => ({
        ...prev,
        ...(permis ? { permisId: permis } : {}),
        ...(agence ? { agencyId: agence } : {}),
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const update = useCallback((patch: Partial<InscriptionFormData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  }, []);

  const progress = (step / INSCRIPTION_STEPS.length) * 100;
  const deposit = data.permisId ? (DEPOSIT_AMOUNTS[data.permisId] ?? 10000) : 0;

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!data.firstName.trim()) e.firstName = 'Prénom requis';
      if (!data.lastName.trim()) e.lastName = 'Nom requis';
      if (!data.phone.trim()) e.phone = 'Téléphone requis';
      if (!data.birthDate) e.birthDate = 'Date de naissance requise';
    }
    if (s === 2 && !data.permisId) e.permisId = 'Choisissez une formation';
    if (s === 3 && !data.agencyId) e.agencyId = 'Choisissez une agence';
    if (s === 4) {
      REQUIRED_DOCUMENTS.filter((d) => d.required).forEach((d) => {
        if (!data.documents[d.id]) e[`doc_${d.id}`] = 'Document requis';
      });
    }
    if (s === 5 && !data.acceptTerms) e.acceptTerms = 'Vous devez accepter les conditions';
    if (s === 6 && !data.paymentMethod) e.paymentMethod = 'Choisissez un mode de paiement';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 6));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const finish = () => {
    if (!validateStep(6)) return;
    localStorage.removeItem(STORAGE_KEY);
    setCompleted(true);
  };

  const permis = PERMIS_DETAILS.find((p) => p.id === data.permisId);
  const agency = AGENCIES.find((a) => a.id === data.agencyId);

  if (completed) {
    return (
      <>
        <SeoHead title="Inscription confirmée | Auto-École Mozart" path="/inscription" />
        <PageHero title="Inscription confirmée !" subtitle="Bienvenue chez Mozart, votre dossier est en cours de traitement." />
        <section className="pages__content inscription">
          <div className="moz-container inscription-wizard">
            <div className="inscription-panel inscription-success">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
              <h2>Merci {data.firstName} !</h2>
              <p style={{ color: 'var(--moz-text-muted)', maxWidth: '28rem', margin: '0 auto 1.5rem' }}>
                Votre demande d&apos;inscription au {permis?.title ?? 'permis'} à l&apos;agence{' '}
                {agency?.name ?? ''} a été enregistrée. Notre équipe vous contacte sous 24h pour finaliser
                votre dossier.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  href={`${CONTACT.whatsappHref}?text=${encodeURIComponent(`Bonjour, je viens de m'inscrire (${data.firstName} ${data.lastName}). Merci de confirmer mon dossier.`)}`}
                  variant="whatsapp"
                >
                  Confirmer sur WhatsApp
                </Button>
                <Button href="/" variant="outline">
                  Retour à l&apos;accueil
                </Button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SeoHead
        title="Inscription en ligne | Auto-École Mozart Yaoundé"
        description="Inscrivez-vous en ligne en 6 étapes : informations, choix du permis, agence, documents et acompte."
        path="/inscription"
      />
      <PageHero
        title="Inscription en ligne"
        subtitle="6 étapes simples, votre dossier est sauvegardé automatiquement."
        breadcrumb={[
          { label: 'Accueil', href: '/' },
          { label: 'Inscription' },
        ]}
      />

      <section className="pages__content inscription">
        <div className="moz-container inscription-wizard">
          <div className="inscription-progress" aria-label="Progression de l'inscription">
            <div className="inscription-progress__bar">
              <div className="inscription-progress__fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="inscription-progress__steps">
              {INSCRIPTION_STEPS.map((s) => (
                <div
                  key={s.id}
                  className={`inscription-progress__step ${step === s.id ? 'inscription-progress__step--active' : ''} ${step > s.id ? 'inscription-progress__step--done' : ''}`}
                >
                  {step > s.id ? '✓' : s.id}. <span>{s.shortLabel}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="inscription-panel">
            {step === 1 && (
              <StepPersonal data={data} update={update} errors={errors} />
            )}
            {step === 2 && (
              <StepPermis data={data} update={update} errors={errors} />
            )}
            {step === 3 && (
              <StepAgency data={data} update={update} errors={errors} />
            )}
            {step === 4 && (
              <StepDocuments data={data} update={update} errors={errors} />
            )}
            {step === 5 && (
              <StepReview data={data} update={update} errors={errors} permis={permis} agency={agency} deposit={deposit} />
            )}
            {step === 6 && (
              <StepPayment data={data} update={update} errors={errors} deposit={deposit} permis={permis} />
            )}

            <div className="inscription-nav">
              {step > 1 ? (
                <Button type="button" variant="ghost" onClick={prev}>
                  ← Retour
                </Button>
              ) : (
                <span />
              )}
              {step < 6 ? (
                <Button type="button" onClick={next}>
                  Continuer →
                </Button>
              ) : (
                <Button type="button" onClick={finish}>
                  Valider et payer l&apos;acompte
                </Button>
              )}
            </div>
          </div>

          <div className="inscription-trust">
            <span>Données sauvegardées localement</span>
            <span>Réponse sous 24h</span>
            <span>Paiement sécurisé</span>
          </div>
        </div>
      </section>
    </>
  );
}

function StepPersonal({
  data,
  update,
  errors,
}: {
  data: InscriptionFormData;
  update: (p: Partial<InscriptionFormData>) => void;
  errors: Record<string, string>;
}) {
  return (
    <>
      <h2>Informations personnelles</h2>
      <p>Commençons par faire connaissance : ces informations figurent sur votre dossier officiel.</p>
      <FormGrid columns={2}>
        <Input
          label="Prénom"
          name="firstName"
          required
          value={data.firstName}
          onChange={(e) => update({ firstName: e.target.value })}
          error={errors.firstName}
          placeholder="Ex. Jean"
        />
        <Input
          label="Nom"
          name="lastName"
          required
          value={data.lastName}
          onChange={(e) => update({ lastName: e.target.value })}
          error={errors.lastName}
          placeholder="Ex. Kouam"
        />
        <Input
          label="Téléphone"
          name="phone"
          type="tel"
          required
          value={data.phone}
          onChange={(e) => update({ phone: e.target.value })}
          error={errors.phone}
          placeholder="+237 6 XX XX XX XX"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={data.email}
          onChange={(e) => update({ email: e.target.value })}
          placeholder="votre@email.cm"
          hint="Optionnel : pour recevoir votre confirmation"
        />
        <Input
          label="Date de naissance"
          name="birthDate"
          type="date"
          required
          value={data.birthDate}
          onChange={(e) => update({ birthDate: e.target.value })}
          error={errors.birthDate}
        />
        <Input
          label="Adresse"
          name="address"
          value={data.address}
          onChange={(e) => update({ address: e.target.value })}
          placeholder="Quartier, Yaoundé"
        />
      </FormGrid>
    </>
  );
}

function StepPermis({
  data,
  update,
  errors,
}: {
  data: InscriptionFormData;
  update: (p: Partial<InscriptionFormData>) => void;
  errors: Record<string, string>;
}) {
  return (
    <>
      <h2>Choix du permis</h2>
      <p>Sélectionnez la formation qui correspond à votre projet.</p>
      {errors.permisId && (
        <p style={{ color: 'var(--moz-error)', fontSize: '0.875rem', marginBottom: '1rem' }}>{errors.permisId}</p>
      )}
      <div className="inscription-permis-grid" role="radiogroup" aria-label="Choix du permis">
        {PERMIS_DETAILS.map((p) => (
          <label
            key={p.id}
            className={`inscription-permis-option ${data.permisId === p.id ? 'inscription-permis-option--selected' : ''}`}
          >
            <input
              type="radio"
              name="permisId"
              value={p.id}
              checked={data.permisId === p.id}
              onChange={() => update({ permisId: p.id })}
            />
            <div className="inscription-permis-option__info">
              <strong>{p.title} ({p.category})</strong>
              <span>{p.price} · {p.duration}</span>
            </div>
            {p.featured && <Badge variant="primary" solid>Populaire</Badge>}
          </label>
        ))}
      </div>
    </>
  );
}

function StepAgency({
  data,
  update,
  errors,
}: {
  data: InscriptionFormData;
  update: (p: Partial<InscriptionFormData>) => void;
  errors: Record<string, string>;
}) {
  return (
    <>
      <h2>Choix de l&apos;agence</h2>
      <p>Choisissez l&apos;agence Mozart la plus proche de chez vous.</p>
      {errors.agencyId && (
        <p style={{ color: 'var(--moz-error)', fontSize: '0.875rem', marginBottom: '1rem' }}>{errors.agencyId}</p>
      )}
      <div className="inscription-agency-grid" role="radiogroup" aria-label="Choix de l'agence">
        {AGENCIES.map((a) => (
          <label
            key={a.id}
            className={`inscription-permis-option ${data.agencyId === a.id ? 'inscription-permis-option--selected' : ''}`}
          >
            <input
              type="radio"
              name="agencyId"
              value={a.id}
              checked={data.agencyId === a.id}
              onChange={() => update({ agencyId: a.id })}
            />
            <div className="inscription-permis-option__info">
              <strong>{a.name}{a.isMain ? ' ★' : ''}</strong>
              <span>{a.address}</span>
            </div>
          </label>
        ))}
      </div>
    </>
  );
}

function StepDocuments({
  data,
  update,
  errors,
}: {
  data: InscriptionFormData;
  update: (p: Partial<InscriptionFormData>) => void;
  errors: Record<string, string>;
}) {
  const handleFile = (id: string, file: File | null) => {
    update({
      documents: {
        ...data.documents,
        [id]: file ? file.name : '',
      },
    });
  };

  return (
    <>
      <h2>Téléversement des documents</h2>
      <p>Formats acceptés : PDF, JPG, PNG (max 5 Mo par fichier).</p>
      <div className="inscription-upload">
        {REQUIRED_DOCUMENTS.map((doc) => (
          <div
            key={doc.id}
            className={`inscription-upload__item ${data.documents[doc.id] ? 'inscription-upload__item--done' : ''}`}
          >
            <span className="inscription-upload__label">
              {doc.label} {doc.required && <span>*</span>}
            </span>
            {data.documents[doc.id] ? (
              <span className="inscription-upload__file">✓ {data.documents[doc.id]}</span>
            ) : (
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                aria-label={doc.label}
                onChange={(e) => handleFile(doc.id, e.target.files?.[0] ?? null)}
              />
            )}
            {errors[`doc_${doc.id}`] && (
              <span style={{ color: 'var(--moz-error)', fontSize: '0.75rem', width: '100%' }}>
                {errors[`doc_${doc.id}`]}
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function StepReview({
  data,
  update,
  errors,
  permis,
  agency,
  deposit,
}: {
  data: InscriptionFormData;
  update: (p: Partial<InscriptionFormData>) => void;
  errors: Record<string, string>;
  permis: (typeof PERMIS_DETAILS)[number] | undefined;
  agency: (typeof AGENCIES)[number] | undefined;
  deposit: number;
}) {
  return (
    <>
      <h2>Validation de votre dossier</h2>
      <p>Vérifiez vos informations avant de procéder au paiement de l&apos;acompte.</p>
      <div className="inscription-review">
        <div className="inscription-review__section">
          <h4>Identité</h4>
          <Row label="Nom" value={`${data.firstName} ${data.lastName}`} />
          <Row label="Téléphone" value={data.phone} />
          {data.email && <Row label="Email" value={data.email} />}
          <Row label="Naissance" value={data.birthDate} />
        </div>
        <div className="inscription-review__section">
          <h4>Formation</h4>
          <Row label="Permis" value={permis ? `${permis.title} (${permis.category})` : 'Non renseigné'} />
          <Row label="Tarif" value={permis?.price ?? 'Non renseigné'} />
          <Row label="Agence" value={agency?.name ?? 'Non renseigné'} />
        </div>
        <div className="inscription-review__section">
          <h4>Documents</h4>
          {REQUIRED_DOCUMENTS.map((d) => (
            <Row key={d.id} label={d.label} value={data.documents[d.id] ? '✓ Fourni' : 'À fournir'} />
          ))}
        </div>
        <div className="inscription-review__section">
          <h4>Acompte à régler</h4>
          <Row label="Montant" value={`${deposit.toLocaleString('fr-FR')} FCFA`} />
        </div>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <GdprConsent
          checked={data.acceptTerms}
          onChange={(checked) => update({ acceptTerms: checked })}
          error={errors.acceptTerms}
        />
      </div>
    </>
  );
}

function StepPayment({
  data,
  update,
  errors,
  deposit,
  permis,
}: {
  data: InscriptionFormData;
  update: (p: Partial<InscriptionFormData>) => void;
  errors: Record<string, string>;
  deposit: number;
  permis: (typeof PERMIS_DETAILS)[number] | undefined;
}) {
  return (
    <>
      <h2>Paiement de l&apos;acompte</h2>
      <p>Dernière étape : réglez votre acompte pour confirmer votre inscription.</p>
      <div className="inscription-payment">
        <p style={{ margin: '0 0 0.5rem', color: 'var(--moz-text-muted)' }}>Acompte {permis?.title ?? ''}</p>
        <div className="inscription-payment__amount">{deposit.toLocaleString('fr-FR')} FCFA</div>
      </div>
      <div className="inscription-payment-methods" role="radiogroup" aria-label="Mode de paiement">
        {PAYMENT_METHODS.map((m) => (
          <label
            key={m.id}
            className={`inscription-payment-method ${data.paymentMethod === m.id ? 'inscription-payment-method--selected' : ''}`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={m.id}
              checked={data.paymentMethod === m.id}
              onChange={() => update({ paymentMethod: m.id })}
              style={{ accentColor: 'var(--moz-primary)' }}
            />
            <strong>{m.label}</strong>
          </label>
        ))}
      </div>
      {errors.paymentMethod && (
        <p style={{ color: 'var(--moz-error)', fontSize: '0.875rem' }}>{errors.paymentMethod}</p>
      )}
      <p className="moz-caption" style={{ textAlign: 'center' }}>
        Après validation, vous recevrez les instructions de paiement par SMS/WhatsApp.
        L&apos;acompte réserve votre place et ouvre votre dossier administratif.
      </p>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="inscription-review__row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
