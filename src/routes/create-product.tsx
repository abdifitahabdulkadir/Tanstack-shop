import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createProduct } from "@/db/products.server"
import { zodResolver } from "@hookform/resolvers/zod"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
const createdProductItem = createServerFn({ method: "POST" })
  .inputValidator((data: CreateProduct) => data)
  .handler(async ({ data }) => {
    return await createProduct(data)
  })
export const Route = createFileRoute("/create-product")({
  component: RouteComponent,
})

const productSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Product name must be less than 20 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(50, "Description must be less than 50 characters"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((price) => !isNaN(Number(price)), "Price must be a number")
    .refine((value) => Number(value) > 0, "Price must be a postive number"),
  imageUrl: z
    .url("Url must be Valid Url")
    .max(500, "Url length must be less than 500 characters"),
  badge: z.union([
    z.enum(["New", "Featured", "Sale", "Limited"]),
    z.undefined(),
  ]),
  inventory: z.enum(["In-Stock", "Backorder", "Preorder"]),
})

function RouteComponent() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof productSchema>>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      badge: undefined,
      inventory: "In-Stock",
    },
    resolver: zodResolver(productSchema),
  })
  const navigate = useNavigate()

  async function handleFormSubmit(data: z.infer<typeof productSchema>) {
    const result = await createdProductItem({
      data: {
        name: data.name,
        description: data.description,
        badge: data.badge,
        inventory: data.inventory,
        image: data.imageUrl,
        price: data.price,
      },
    })
    if (result.success) {
      toast.success("Successfully Added Product")
      return
    }
    toast.error("Failed to Add product. please try again")
  }
  return (
    <section className="space-y-4">
      <div className="w-full h-fit bg-white text-black shadow-sm border border-black/10 rounded-lg  px-4 py-3">
        <h2 className="text-2xl font-bold mb-2">Create A Product</h2>
        <p className="text-slate-600 mb-4">
          Add a new product to your store by filling out the form below.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white flex justify-center items-center  flex-col px-4 pt-6 space-y-5 py-3 rounded-lg shadow-sm pb-20"
      >
        <div className="space-y-5.5 w-full h-fit max-w-2xl px-3">
          <label htmlFor="ProductName">Product Name *</label>
          <Input
            {...register("name")}
            id="ProductName"
            placeholder="Proudct Name"
            className="py-3 px-2 h-[60px] rounded-lg placeholder:text-gray-500 placeholder:italic focus-visible:ring-[.8px] focus-visible:ring-primary text-black  placeholder:font-normal "
          />
          <FieldError
            errors={
              errors.name?.message
                ? [{ message: errors.name.message }]
                : undefined
            }
          />
        </div>

        <div className="space-y-5.5 w-full h-fit max-w-2xl px-3">
          <label htmlFor="description">Product Description *</label>
          <Input
            {...register("description")}
            id="description"
            placeholder="Enter Your description Here"
            className="py-3 px-2 h-[60px] rounded-lg placeholder:text-gray-500 placeholder:italic focus-visible:ring-[.8px] focus-visible:ring-primary text-black  placeholder:font-normal "
          />
          <FieldError
            errors={
              errors.description?.message
                ? [{ message: errors.description.message }]
                : undefined
            }
          />
        </div>

        <div className="space-y-5.5 w-full h-fit max-w-2xl px-3">
          <label htmlFor="price">Product price *</label>
          <Input
            id="price"
            {...register("price")}
            placeholder="Enter Your price here"
            className="py-3 px-2 h-[60px] rounded-lg placeholder:text-gray-500 placeholder:italic focus-visible:ring-[.8px] focus-visible:ring-primary text-black  placeholder:font-normal "
          />
          <FieldError
            errors={
              errors.price?.message
                ? [{ message: errors.price.message }]
                : undefined
            }
          />
        </div>

        <div className="space-y-5.5 w-full h-fit max-w-2xl px-3">
          <label htmlFor="ImageUrl">Product ImageUrl *</label>
          <Input
            type="url"
            id="ImageUrl"
            {...register("imageUrl")}
            placeholder="Enter Your ImageUrl here"
            className="py-3 px-2 h-[60px] rounded-lg placeholder:text-gray-500 placeholder:italic focus-visible:ring-[.8px] focus-visible:ring-primary text-black font-semibold placeholder:font-normal "
          />
          <FieldError
            errors={
              errors.imageUrl?.message
                ? [{ message: errors.imageUrl.message }]
                : undefined
            }
          />
        </div>

        <div className="space-y-5.5 w-full h-fit max-w-2xl px-3">
          <label htmlFor="badge">Badge (Optional)</label>
          <Select
            onValueChange={(value) =>
              setValue(
                "badge",
                value as "New" | "Featured" | "Sale" | "Limited",
              )
            }
          >
            <SelectTrigger className="h-[100px] max-w-2xl w-full px-3 py-3">
              <SelectValue placeholder="Select Badge" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New </SelectItem>
              <SelectItem value="Featured">Featured</SelectItem>
              <SelectItem value="Limited">Limited</SelectItem>
              <SelectItem value="Sale">Sale</SelectItem>
            </SelectContent>
          </Select>
          <FieldError
            errors={
              errors.badge?.message
                ? [{ message: errors.badge.message }]
                : undefined
            }
          />
        </div>

        <div className="space-y-5.5 w-full h-fit max-w-2xl px-3">
          <label htmlFor="inventory">Inventory Status *</label>
          <Select
            onValueChange={(value) =>
              setValue(
                "inventory",
                value as "In-Stock" | "Backorder" | "Preorder",
              )
            }
          >
            <SelectTrigger className="h-[100px] max-w-2xl w-full px-3 py-3">
              <SelectValue placeholder="Select Inventory Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In-Stock">In Stock </SelectItem>
              <SelectItem value="Preorder">Preorder</SelectItem>
              <SelectItem value="Backorder">Backorder</SelectItem>
            </SelectContent>
          </Select>
          <FieldError
            errors={
              errors.inventory?.message
                ? [{ message: errors.inventory.message }]
                : undefined
            }
          />
        </div>

        <div className="w-full max-w-2xl flex items-center justify-between">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-3 py-2 disabled:cursor-not-allowed disabled:opacity-45 bg-primary text-white rounded-[10px] "
          >
            {isSubmitting ? "Creating....." : "Create Product"}
          </Button>

          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              navigate({ to: "/products" })
            }}
            className="text-black border hover:bg-white hover:text-black/80 border-black/20 bg-white/40 px-3 py-2"
          >
            Cancel
          </Button>
        </div>
      </form>
    </section>
  )
}
