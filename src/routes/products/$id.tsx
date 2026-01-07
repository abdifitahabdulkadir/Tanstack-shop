import AddToCart from "@/components/AddToCart"
import ProductSkelton from "@/components/ProductSkelton"
import RecommendedProducts from "@/components/RecommendedProducts"
import {
  deleteProductById,
  getProductById,
  getRecommendedProducts,
} from "@/db/products.server"
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { Trash } from "lucide-react"
import { Suspense } from "react"
import toast from "react-hot-toast"

const fetProductById = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    return await getProductById({ id: data.id })
  })

const getRecommended = createServerFn({ method: "GET" }).handler(
  getRecommendedProducts,
)

export const Route = createFileRoute("/products/$id")({
  component: RouteComponent,

  loader: async ({ params }) => {
    const product = await fetProductById({ data: { id: params.id } })
    return { product }
  },
  head: async ({ loaderData }) => {
    const product = loaderData?.product
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
const deleteProduct = createServerFn({ method: "POST" })
  .inputValidator((data: { productId: string }) => data)
  .handler(async ({ data }) => await deleteProductById(data.productId))

function RouteComponent() {
  const { product } = Route.useLoaderData()
  const { id } = Route.useParams()
  const router = useRouter()
  const navigate = useNavigate()

  if (!product) {
    return (
      <div className="p-6 text-center text-red-500">Product not found.</div>
    )
  }

  async function handleProductDeletion() {
    const result = await deleteProduct({ data: { productId: id } })
    if (result.success) {
      toast.success("Successfully Deleted a product")
      router.invalidate({ sync: true })
      navigate({ to: "/products" })
      return
    }
    toast.error("Failed to  delete the product. Please try again.")
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
            <Trash
              onClick={(e) => {
                e.stopPropagation()
                handleProductDeletion()
              }}
              className="text-primary"
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-pink-600 mb-6 flex items-center gap-2">
          🐷 Recommended Products
        </h2>

        <Suspense fallback={<ProductSkelton />}>
          <RecommendedProducts recommended={getRecommended()} />
        </Suspense>
      </div>
    </div>
  )
}
