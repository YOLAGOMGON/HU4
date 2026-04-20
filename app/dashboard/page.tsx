import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { listProducts, type ProductRecord } from "@/lib/product-service";

export default async function DashboardPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  const products = await listProducts();

  return (
    <main className="page">
      <section className="card">
        <div className="dashboard-header">
          <div>
            <p className="eyebrow">Sesion activa</p>
            <h1>Hola, {user.name}</h1>
            <p className="dashboard-email">{user.email}</p>
          </div>
          <div className="dashboard-actions">
            <div className="dashboard-avatar" aria-hidden="true">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <form method="post" action="/api/logout">
              <button className="button ghost dashboard-logout" type="submit">
                <svg
                  className="dashboard-logout__icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"                >
                  <path
                    d="M16 17l5-5-5-5M21 12H9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 5a8 8 0 1 0 0 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Cerrar sesion
              </button>
            </form>
          </div>
        </div>
        <div className="dashboard-products">
          <div className="dashboard-products__header">
            <div>
              <p className="eyebrow">Productos</p>
              <h2>Inventario</h2>
            </div>
            <span className="dashboard-products__count">
              {products.length} items
            </span>
          </div>
          <div className="dashboard-products__grid">
            {products.map((product: ProductRecord) => (
              <article
                key={product.sku}
                className="dashboard-products__card"
              >
                <p className="dashboard-products__name">{product.name}</p>
                <p className="dashboard-products__price">
                  ${product.unit_price.toFixed(2)}
                </p>
                <p className="dashboard-products__sku">{product.sku}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
