import { getAllCarts } from "@/db/carts.server"
import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { ShoppingBag } from "lucide-react"

const getCartItemsCount = createServerFn().handler(async () => {
  const items = await getAllCarts()
  const cartLength = items.length
  const total =
    items.reduce((prev, current) => {
      return prev + Number(current.price) * current.quantity
    }, 0) + 8
  return {
    itemsLength: cartLength,
    totalAmount: total.toFixed(2),
  }
})
export default function Header() {
  const { data } = useQuery({
    queryKey: ["cart-items-count"],
    queryFn: getCartItemsCount,
  })
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto max-w-6xl px-4 py-3 items-center justify-between flex">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-800">
              <ShoppingBag size={20} />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                StartShop
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 sm:flex">
            <Link
              to="/"
              className="rounded-lg px-3 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="rounded-lg px-3 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Products
            </Link>
            <Link to="/create-product">Create Product</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/products/carts"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span>Cart</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 px-2 text-[11px] font-bold text-white">
              {data?.itemsLength}
            </span>
            <span className="hidden text-[11px] font-medium tex-slate-500 sm:inline">
              ${data?.totalAmount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
