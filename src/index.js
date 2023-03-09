require('dotenv').config();
const translate = require('@vitalets/google-translate-api');


const { Client, IntentsBitField } = require('discord.js');

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

client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'translate') {
    const text = options.getString('text');
    const targetLanguage = options.getString('target');

    try {
      const result = await translate(text, { to: targetLanguage });
      interaction.reply(result.text);
    } catch (error) {
      console.error(error);
      interaction.reply('An error occurred while translating the text.');
    }
  }

    
});

client.login(process.env.TOKEN);

