// See https://github.com/typicode/json-server#module
import jsonserver from "json-server"
const { create, router, defaults, rewriter } = jsonserver
const server = create()
const db = router("db.json")
const middlewares = defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(
    rewriter({
        "/api/*": "/$1",
        "/blog/:resource/:id/show": "/:resource/:id",
    })
)
server.use(db)
server.listen(8000, () => {
    console.log("JSON Server is running")
})

// Export the Server API
export default server
