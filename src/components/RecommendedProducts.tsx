import { use } from "react"
import { ProductCard } from "./ProductCard"

interface Props {
  recommended: Promise<ProductInsert[]>
}

export default function RecommendedProducts({ recommended }: Props) {
  const recommendedProducts = use(recommended)
  return (
    <div className="flex flex-col gap-5">
      {recommendedProducts.map((each, index) => {
        return <ProductCard product={each} key={index} />
      })}
    </div>
  )
}
