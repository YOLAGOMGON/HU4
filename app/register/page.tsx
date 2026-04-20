type RegisterPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

const errorMessages: Record<string, string> = {
  missing: "Completa nombre, correo y contrasena.",
  exists: "Este correo ya esta registrado.",
  server: "No pudimos crear tu cuenta. Intenta de nuevo.",
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const errorKey = resolvedSearchParams?.error ?? "";
  const errorMessage = errorMessages[errorKey];

  return (
    <main className="page">
      <section className="card">
        <span className="badge">Registro</span>
        <h1>Crea tu cuenta</h1>
        {errorMessage ? <p className="hint">{errorMessage}</p> : null}
        <form className="form" method="post" action="/api/register">
          <div className="field">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="contrasena">Contrasena</label>
            <input
              id="contrasena"
              name="contrasena"
              type="password"
              autoComplete="new-password"
              required
            />
          </div>
          <button className="button primary" type="submit">
            Crear cuenta
          </button>
        </form>
        <p className="hint">
          Ya tienes cuenta?{" "}
          <a className="inline-link" href="/login">
            Inicia sesion
          </a>
        </p>
      </section>
    </main>
  );
}
