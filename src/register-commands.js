require('dotenv').config();
const {REST, Routes} = require('discord.js');

const commands = [
  {
    name: 'playtime',
    description: 'Returns current playtime'
  },
  {
    name: 'gold',
    description: 'Returns the total gold of the party and individual breakdowns'
  }
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering / Commands");
    await rest.put(
      Routes.applicationGuildCommands(process.env.BARD_ID, process.env.GUILD_ID), 
      { body: commands }
    )
    console.log("Commands Registered Successfully");
  } catch (err) {
    console.log(`Error: ${err}`)
  }
})();