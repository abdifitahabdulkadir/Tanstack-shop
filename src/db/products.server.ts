import prisma from "prisma/prisma"

export async function getRecommendedProducts() {
  try {
    const result = await prisma.product.findMany({
      take: 3,
      include: {
        cartItems: {
          select: {
            productId: true,
          },
        },
      },
    })
    return result.map((eachProduct) => {
      const { cartItems, ...rest } = eachProduct
      return {
        ...rest,
        isAddedToCart: cartItems !== null,
      }
    })
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function getALlProducts() {
  try {
    const resuts = await prisma.product.findMany({
      include: {
        cartItems: {
          select: {
            productId: true,
          },
        },
      },
    })
    return resuts.map((eachProduct) => {
      const { cartItems, ...rest } = eachProduct
      return {
        ...rest,
        isisAddedToCart: cartItems !== null,
      }
    })
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function getProductById({ id }: { id: string }) {
  try {
    const getProductByIdResult = await prisma.product.findFirst({
      where: {
        id,
      },
      include: {
        cartItems: {},
      },
    })
    if (getProductByIdResult) {
      const { cartItems, ...rest } = getProductByIdResult
      const transformed: ProductInsert = {
        ...rest,
        isAddedToCart: cartItems !== null,
      }
      return transformed
    }
    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function createProduct(product: CreateProduct) {
  try {
    await prisma.product.create({
      data: {
        ...product,
        rating: "",
        reviews: 0,
      },
    })
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export async function deleteProductById(id: string) {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    })
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
