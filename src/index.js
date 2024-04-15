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

bard.on('interactionCreate', (interaction) => {
  if(!interaction.isChatInputCommand()) return;

  if(interaction.commandName === "playtime") {
    interaction.reply("The current campaign is called Waterdeep: Dragon Heist and has been ongoing for 1 session or 4 hours.")
  }
// Alcryn 35 gold
// Andrew Tesco 10,935
// Forge Gwyn 11
// Gypsolandera 2005
// Morfam 350
// Onkh 10
// Sythran Yjalnrai 35
// Zirer 11

  if (interaction.commandName === "gold") {
    interaction.reply(`The party currently has a combined 13,392 Gold \nAlcryn: 35 Gold \nAndrew Tesco: 10,935 Gold \nForge Gwyn: 11 Gold \nGypsolandera: 2,005 Gold \nMorfam: 350 Gold \nOnkh: 10 Gold \nSythran Yjalnrai: 35 Gold \nZirer: 11 Gold`)
  }
});
bard.login(process.env.TOKEN);