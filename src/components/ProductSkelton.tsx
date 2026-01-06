import { Skeleton } from "./ui/skeleton"

export default function ProductSkelton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }, () => {
        return <Skeleton className="h-[100px] w-full" />
      })}
    </div>
  )
}
