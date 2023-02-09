import { Express } from "express";

const app = express()
const PORT = 5000;

app.get('/api/', (req, res) => {
    res.send("BACKEND IS RUNNING");
})

app.listen(PORT, () => {
    console.log(`Backend is running on port${PORT}`);
})