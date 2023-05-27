const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
require("dotenv").config();

async function callChatGPT(ask) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        const conversationFile = "conversation.json"; // 대화를 저장할 JSON 파일 경로
        const openai = new OpenAIApi(configuration);
        let conversation = loadConversation(conversationFile); // 대화 로드
        conversation.push({ role: "user", content: ask }); // 사용자의 질문을 대화에 추가

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: conversation,
            temperature: 0.8,
            //max_tokens: 50,
        });

        const reply = response.data.choices[0].message;
        conversation.push(reply); // AI의 답변을 대화에 추가

        saveConversation(conversation); // 대화 저장

        return reply;
    } catch (error) {
        console.error(
            "An error occurred while calling the ChatGPT API:",
            error
        );
        return null;
    }
}

// 대화 불러오기
function loadConversation(file) {
    try {
        const data = fs.readFileSync(file);
        return JSON.parse(data);
    } catch (error) {
        console.error("Error loading conversation:", error);
        return [];
    }
}

// 대화 저장
function saveConversation(conversation) {
    try {
        const data = JSON.stringify(conversation);
        fs.writeFileSync(conversationFile, data);
    } catch (error) {
        console.error("Error saving conversation:", error);
    }
}

module.exports = { callChatGPT };
