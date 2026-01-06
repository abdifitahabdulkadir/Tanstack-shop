type ProductInsert = {
  name: string
  description: string
  price: string
  badge?: string | null
  rating: string
  reviews: number
  image: string
  inventory: string
  id: string
}

type CreateProduct = Omit<ProductInsert, "id" | "rating" | "reviews">
