require('dotenv/config');



const { Client, IntentsBitField } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,


    ],
});

client.on('ready', (c) => {
    console.log(`✅ ${c.user.username} is online `);
});

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || interaction.commandName !== 'translate') return;

  const message = interaction.options.getString('message');

  const conversationLog = [
    { role: 'system', content: 'You are a friendly chatbot.' },
    { role: 'user', content: message }
  ];

  try {
    const result = await openai.createChatCompletion({
      model: 'text-davinci-002',
      messages: conversationLog
    });

    await interaction.reply(result.data.choices[0].text);
  } catch (error) {
    console.log(`ERROR: ${error}`);
    await interaction.reply('Sorry, there was an error processing your request.');
  }
});

client.login(process.env.TOKEN);

