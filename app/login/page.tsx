type LoginPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

const errorMessages: Record<string, string> = {
  missing: "Ingresa tu correo y contrasena.",
  invalid: "Los datos no coinciden con una cuenta registrada.",
  server: "No pudimos iniciar sesion. Intenta de nuevo.",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const errorKey = resolvedSearchParams?.error ?? "";
  const errorMessage = errorMessages[errorKey];

  return (
    <main className="page">
      <section className="card">
        <span className="badge">Login</span>
        <h1>Bienvenido de vuelta</h1>
        {errorMessage ? <p className="hint">{errorMessage}</p> : null}
        <form className="form" method="post" action="/api/login">
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
              autoComplete="current-password"
              required
            />
          </div>
          <button className="button primary" type="submit">
            Iniciar sesión
          </button>
        </form>
        <p className="hint">
          No tienes cuenta?{" "}
          <a className="inline-link" href="/register">
            Registrate
          </a>
        </p>
      </section>
    </main>
  );
}
