import prisma from "prisma/prisma"

export async function getRecommendedProducts() {
  try {
    return await prisma.product.findMany({
      take: 3,
    })
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function getALlProducts() {
  try {
    return await prisma.product.findMany()
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function getProductById({ id }: { id: string }) {
  try {
    return await prisma.product.findFirst({
      where: {
        id,
      },
    })
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
    console.log(error)
    return { success: false }
  }
}
