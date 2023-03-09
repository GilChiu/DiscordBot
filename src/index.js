require('dotenv').config();
const { GPT } = require('@openai/api');

const gpt2 = require('gpt-2')

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

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isChatInputCommand()) return;


    if(interaction.commandName === 'translate'){
        if (message.author.bot) return;
    
    const content = message.content;
    const targetLanguage = 'es';

    const gpt2Response = await gpt2.generate({
        prompt: `${content} [to ${targetLanguage}]`,
        length: 100,
      });
    const translation = gpt2Response.data.text.trim().split('\n')[0].split('] ')[1];
    console.log(translation);
    }

    
});

client.login(process.env.TOKEN);

