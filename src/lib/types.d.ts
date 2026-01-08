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
  isAddedToCart: boolean
}

type CreateProduct = Omit<ProductInsert, "id" | "rating" | "reviews">

type CartItem = {
  id: string
  productId: string
  quantity: number
  createdAt: Date
  imageUrl: string
  badge?: string
  price: string
  inventory: string
  name: string
}
