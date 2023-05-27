const express = require("express");
const router = express.Router();
const { callChatGPT } = require("./chatGPT");

// express 미들웨어 사용
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


router.post("/ask", async (req, res) => {
    const { ask } = req.body;
    const response = await callChatGPT(ask);

    if (response) {
        res.status(200).json({ response });
    } else {
        res.status(500).json({
            error: "Failed to get response from ChatGPT API",
        });
    }
});

app.use("/", router);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
