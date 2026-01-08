import prisma from "prisma/prisma"

export async function getAllCarts() {
  try {
    const carts = await prisma.cartItems.findMany({
      include: {
        product: {
          select: {
            badge: true,
            inventory: true,
            image: true,
            price: true,
            name: true,
          },
        },
      },
    })
    return carts.map((each) => {
      return {
        id: each.id,
        productId: each.productId,
        quantity: each.quantity,
        createdAt: each.createdAt,
        imageUrl: each.product.image,
        badge: each.product.badge,
        price: each.product.price,
        inventory: each.product.inventory,
        name: each.product.name,
      }
    })
  } catch (error) {
    console.error("from carts : ", error)
    return []
  }
}

export async function addToCart({
  productId,
  quantity,
}: {
  productId: string
  quantity: number
}) {
  try {
    const quantityLimit = Math.max(1, Math.min(quantity, 99))
    if (quantityLimit >= 99) {
      throw new Error("quanity should be less than 99 ")
    }
    const isProductExisted = await prisma.cartItems.findFirst({
      where: {
        productId,
      },
    })
    if (isProductExisted) {
      await prisma.cartItems.update({
        where: {
          productId,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      })
    } else {
      await prisma.cartItems.create({
        data: {
          productId,
          quantity,
        },
      })
    }

    return { success: true }
  } catch (error) {
    console.error("from carts : ", error)
    return { success: false }
  }
}
export async function removeFromCart({ productId }: { productId: string }) {
  try {
    const isProductExisted = await prisma.cartItems.findFirst({
      where: {
        productId,
      },
    })
    if (isProductExisted) {
      if (isProductExisted.quantity === 1) {
        await prisma.cartItems.delete({
          where: {
            productId,
          },
        })
      } else {
        await prisma.cartItems.update({
          where: {
            productId,
          },
          data: {
            quantity: {
              decrement: 1,
            },
          },
        })
      }
    }

    return { success: true }
  } catch (error) {
    console.error("from carts : ", error)
    return { success: false }
  }
}

export async function clearCartItems() {
  try {
    await prisma.cartItems.deleteMany({})
    return { success: true }
  } catch (error) {
    console.error("from carts : ", error)
    return { success: false }
  }
}
