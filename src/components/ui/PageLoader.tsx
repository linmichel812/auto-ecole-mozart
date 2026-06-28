/** Loader plein écran : affiché pendant le lazy loading des routes */
export function PageLoader() {
  return (
    <div
      className="page-loader"
      role="status"
      aria-label="Chargement de la page"
      style={{
        minHeight: '60vh',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: '3px solid var(--moz-neutral-200, #e2e8f0)',
          borderTopColor: 'var(--moz-primary, #e62100)',
          borderRadius: '50%',
          animation: 'admin-spin 0.7s linear infinite',
        }}
      />
    </div>
  );
}
