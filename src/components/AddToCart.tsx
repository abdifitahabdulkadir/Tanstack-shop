import { ShoppingBagIcon } from "lucide-react"
import { Button } from "./ui/button"

export default function AddToCart() {
  return (
    <Button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      size="sm"
      variant={"secondary"}
      className={"bg-slate-900  text-white hover:bg-primary "}
    >
      <ShoppingBagIcon size={16} /> Add to Cart
    </Button>
  )
}
