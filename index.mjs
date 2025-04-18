import express from "express"

const app = express()

app.use("/", (req, res) => { res.send("hello from ec2") })

const PORT = process.env.PORT || 5003

app.listen(PORT, "0.0.0.0", () => console.log(`server running on port ${PORT}`))
