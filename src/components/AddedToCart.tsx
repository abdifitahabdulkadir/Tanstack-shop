export default function AddedToCart() {
  return (
    <span className="inline-flex items-center gap-1 text-emerald-600 font-medium text-sm">
      <svg
        className="w-4 h-4 inline-block"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      Added to cart
    </span>
  )
}
