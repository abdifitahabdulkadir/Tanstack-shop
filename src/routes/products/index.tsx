import { ProductCard } from "@/components/ProductCard"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getALlProducts } from "@/db/products"
import { createFileRoute, Link } from "@tanstack/react-router"

// const fetchProducts = createServerFn({ method: "GET" }).handler(
//   async () => await getALlProducts(),
// )
export const Route = createFileRoute("/products/")({
  component: RouteComponent,
  loader: async () => {
    return await getALlProducts()
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()

  return (
    <div className="space-y-6">
      <section className="space-y-4 max-w-6xl mx-auto">
        <Card className="p-6 shadow-md bg-white/80">
          <Link
            to="/"
            className="bg-slate-700 transform hover:scale-x-[1.2] hover:duration-300 duration-500 ease-in-out text-white px-2 w-fit py-1 rounded-full will-change-transform"
          >
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardHeader className="px-0">
                <p className="text-sm uppercase tracking-wide text-slate-500">
                  StartShop Catalog
                </p>
                <CardTitle className="text-2xl font-semibold">
                  Products built for makers
                </CardTitle>
              </CardHeader>
              <CardDescription className="text-sm text-slate-600">
                Browse a minimal, production-flavoured catalog with TanStack
                Start server functions and typed routes.
              </CardDescription>
            </div>
          </div>
        </Card>
      </section>
      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((product, index) => (
            <ProductCard key={`product-${index}`} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
