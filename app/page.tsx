export default function Home() {
  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">Plataforma de tecnologia</p>
        <h1>Gestion de acceso y catalogo</h1>
        <p className="lead">
          Experiencia web integrada con autenticacion, sesiones seguras y
          consultas en Postgres. La UI esta construida en Next.js y la logica de
          datos vive en <span className="code">lib</span>.
        </p>
        <div className="actions">
          <a className="button primary" href="/register">
            Crear cuenta
          </a>
          <a className="button ghost" href="/login">
            Iniciar sesión
          </a>
        </div>
      </section>
    </main>
  );
}
