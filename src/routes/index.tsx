import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <main className=" h-fit max-h-screen w-full border border-amber-300">
      Helllo I am seaph
    </main>
  )
}
