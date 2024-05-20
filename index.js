require("dotenv/config");
const { Client } = require("discord.js");
const { OpenAI } = require("openai");

const client = new Client({
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
});

client.on("ready", () => {
  console.log("Caeser Bot is Activated");
});

const IGNORE_PREFIX = "!";
const CHANNELS = ["1240784858200932443", "1240814893490372668"];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(IGNORE_PREFIX)) return;
  if (
    !CHANNELS.includes(message.channelId) &&
    !message.mentions.users.has(client.user.id)
  )
    return;

  await message.channel.sendTyping();

  const sendTypingInterval = setInterval(() => {
    message.channel.sendTyping();
  }, 5000);

  let conversation = [];
  conversation.push({
    role: "system",
    content: "Caeser-Bot is your friendly chatbot.",
  });

  let previousMessages = await message.channel.messages.fetch({
    limit: 10,
  });
  previousMessages.reverse();

  previousMessages.forEach((msg) => {
    if (msg.author.bot && msg.author.id !== client.user.id) return;
    if (message.content.startsWith(IGNORE_PREFIX)) return;

    const userName = msg.author.username
      .replace(/\s+/g, "_")
      .replace(/[^\w\s]/gi, "");

    if (msg.author.id === client.user.id) {
      conversation.push({
        role: "assistant",
        name: userName,
        content: msg.content,
      });

      return;
    }
    conversation.push({
      role: "user",
      name: userName,
      content: msg.content,
    });
  });

  const response = await openai.chat.completions
    .create({
      model: "gpt-4o",
      messages: conversation,
    })
    .catch((error) => console.error("OpenAI Error:\n", error));

  clearInterval(sendTypingInterval);

  if (!response) {
    message.reply(
      "Sorry I am having techincal difficulties retrieving a response from the OpenAI API. Please Try again in a moment."
    );
    return;
  }

  const responseMessage = response.choices[0].message.content;
  const chunkSizeLimiter = 2000;

  for (let i = 0; i < responseMessage.length; i += chunkSizeLimiter) {
    const chunk = responseMessage.substring(i, i + chunkSizeLimiter);

    await message.reply(chunk);
  }

  
});
client.login(process.env.TOKEN);
