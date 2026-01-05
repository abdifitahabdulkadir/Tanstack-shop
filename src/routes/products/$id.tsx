import AddToCart from "@/components/AddToCart"
import { getProductById } from "@/db/products"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/products/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return await getProductById({ id: params.id })
  },
  head: async ({ loaderData }) => {
    const product = loaderData
    return {
      meta: [
        {
          name: "description",
          content: product?.description ?? "Product details",
        },
        {
          name: "title",
          title: product?.name ?? "",
        },
        {
          property: "og:title",
          content: product?.name ?? "Product",
        },
        {
          property: "og:description",
          content: product?.description ?? "Product details",
        },
        {
          property: "og:image",
          content: product?.image ?? "",
        },
        {
          name: "keywords",
          content: [product?.name, "TanStack", "Shop", "Product"]
            .filter(Boolean)
            .join(", "),
        },
      ],
    }
  },
})

function RouteComponent() {
  const product = Route.useLoaderData()

  if (!product) {
    return (
      <div className="p-6 text-center text-red-500">Product not found.</div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 mt-8">
      <Link
        to="/products"
        className="inline-block mb-6 px-4 py-2 rounded-full bg-slate-700 text-white text-sm font-semibold shadow hover:bg-slate-800 transition-colors duration-200"
      >
        ← Back to products
      </Link>
      <div className="flex rounded-lg p-4 flex-col md:flex-row gap-6 items-start">
        <img
          src={product.image}
          alt={product.name}
          className=" mx-auto max-w-64 max-h-64 h-fit w-fit object-cover  border"
        />
        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          {product.badge && (
            <span className="inline-block rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold w-fit text-white">
              {product.badge}
            </span>
          )}
          <p className="text-slate-700">{product.description}</p>

          <div className="flex items-center gap-3 mt-1">
            <span className="text-yellow-500 font-semibold">
              {product.rating}★
            </span>
            <span className="text-slate-500 text-sm">
              ({product.reviews} reviews)
            </span>
            <span
              className={`ml-4 inline-block px-3 py-1 rounded-full text-xs font-semibold
                ${
                  product.inventory === "in-stock"
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : product.inventory === "backorder"
                      ? "bg-amber-50 text-amber-700 border border-amber-100"
                      : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                }
              `}
            >
              {product.inventory === "in-stock"
                ? "In Stock"
                : product.inventory === "backorder"
                  ? "Backorder"
                  : "Preorder"}
            </span>
          </div>

          <div className="w-full flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900 mt-2">
              ${product.price}
            </span>
            <AddToCart />
          </div>
        </div>
      </div>
    </div>
  )
}
