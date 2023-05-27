const express = require("express");
const router = express.Router();

// express 미들웨어 사용
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


router.post("/ask", async (req, res) => {
});

app.use("/", router);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
