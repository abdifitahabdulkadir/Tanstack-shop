import { manageCartFn } from "@/routes/products/carts"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import { ShoppingBagIcon } from "lucide-react"
import toast from "react-hot-toast"
import { Button } from "./ui/button"

interface Props {
  productId: string
  quantity: number
}
export default function AddToCart({ productId, quantity }: Props) {
  const router = useRouter()
  const queryclient = useQueryClient()
  return (
    <Button
      onClick={async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const result = await manageCartFn({
          data: {
            action: "add",
            productId,
            quantity,
          },
        })
        if (result.success) {
          await router.invalidate({ sync: true })
          queryclient.invalidateQueries({
            queryKey: ["cart-items-count"],
          })
          toast.success("Successfully Added to the cart")
        }
      }}
      size="sm"
      variant={"secondary"}
      className={"bg-slate-900  text-white hover:bg-primary "}
    >
      <ShoppingBagIcon size={16} /> Add to Cart
    </Button>
  )
}
