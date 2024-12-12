
# Caeser Bot - Discord AI Chatbot 
* Caeser Bot is a simple AI-powered chatbot that uses OpenAI's API to generate responses to user queries in Discord channels. It's designed to engage users in conversations, providing relevant and dynamic responses to text prompts.

## Features
- Custom Channel Support: Restrict the bot to specific channels for better management.
- Dynamic Conversations: Uses recent message history to provide contextual responses.
- AI-Powered Responses: Integrated with OpenAI GPT for intelligent and human-like interactions.
- Typing Simulation: Mimics typing to enhance user experience.
- Command Ignoring: Ignores messages starting with a designated prefix (default: !).

## Prerequisites
- Node.js (v16.6.0 or newer)
- Discord Bot Token
- OpenAI API Key
- dotenv package for environment variable management

## Installation
1. **Clone the Repository**

`
git clone <repository-url>
cd <repository-folder>`

2. **Install Dependencies**

`
npm install`

3. **Set Up Environment Variables**
   
Create a .env file in the project root with the following variables:

`
TOKEN=<your_discord_bot_token>
OPENAI_KEY=<your_openai_api_key>`

4. **Run the Bot**

`
node <filename>.js`
