import { createRouter, Link } from "@tanstack/react-router"

// Import the generated route tree
import { QueryClient } from "@tanstack/react-query"
import { routeTree } from "./routeTree.gen"

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    context: {
      queryClient: new QueryClient(),
    },
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: (e) => {
      console.log(e)
      return (
        <div
          style={{ textAlign: "center", marginTop: "6rem", color: "#ef4444" }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Something went wrong.
          </h1>
          <p style={{ color: "#64748b" }}>An unexpected error occurred.</p>
        </div>
      )
    },
    defaultNotFoundComponent: () => {
      return (
        <div
          style={{
            textAlign: "center",
            marginTop: "6rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
            404 - Not Found
          </h1>
          <p style={{ color: "#64748b" }}>
            Sorry, the page you are looking for does not exist.
          </p>
          <Link
            to="/"
            style={{
              padding: "0.5rem 1.5rem",
              backgroundColor: "#334155",
              color: "white",
              borderRadius: "9999px",
              fontWeight: 500,
              textDecoration: "none",
              marginTop: "0.5rem",
              transition: "background 190ms",
              display: "inline-block",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#475569")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#334155")
            }
          >
            Go Home
          </Link>
        </div>
      )
    },
  })

  return router
}
