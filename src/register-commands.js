require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'playtime',
    description: 'Returns current playtime'
  },

  { 
    name: 'spell',
    description: 'Returns details of a spell',
    options: [{
      name: 'spell-name',
      description: 'Name of spell to search',
      type: ApplicationCommandOptionType.String,
      required: true
    }]

  },
  {
    name: 'roll',
    description: 'Roll a dice',
    options: [{
      name: 'dice-type',
      description: 'Type of dice to roll',
      type: ApplicationCommandOptionType.Integer,
      required: true,
      choices: [
        {
          name: 'D4',
          value: 4
        },
        {
          name: 'D6',
          value: 6
        },
        {
          name: 'D8',
          value: 20
        },
        {
          name: 'D12',
          value: 12
        },
        {
          name: 'D20',
          value: 20
        },
        {
          name: 'D100',
          value: 100
        }
        
      ]
    }]
  },
  {
    // Alcryn 35 gold
// Andrew Tesco 10,935
// Forge Gwyn 11
// Gypsolandera 2005
// Morfam 350
// Onkh 10
// Sythran Yjalnrai 35
// Zirer 11
    name: 'gold',
    description: 'Returns the total gold of the party and individual breakdowns',
    options: [{
      name: 'char-name',
      description: 'Name of character',
      type: ApplicationCommandOptionType.String,
      choices: [{
        name:'Alcryn',
        value: 'Alcryn'
      },
      {
        name:'Andrew Tesco',
        value: 'Andrew Tesco'
      },
      {
        name:'Forge Gwyn',
        value: 'Forge Gwyn'
      },
      {
        name:'Gypsolandera',
        value: 'Gypsolandera'
      },
      {
        name:'Morfam',
        value: 'Morfam'
      },
      {
        name:'Onkh',
        value: 'Onkh'
      },
      {
        name:'Sythran Yjalnrai',
        value: 'Sythran Yjalnrai'
      },
      {
        name:'Zirer',
        value: 'Zirer'
      },
      ]
  
    }]
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