require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const bard = new Client({
  intents: [
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]

})

bard.on('ready', (e) => {
  console.log("A Bard Appears");
})

bard.on('messageCreate', (msg) => {
  console.log(msg);
} )

bard.login(process.env.TOKEN);