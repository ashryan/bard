require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

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
    if(interaction.options.get('char-name')){
      const char = interaction.options.get('char-name')
      if (String(char.value).toLowerCase() === 'Morfam'.toLowerCase()){
        interaction.reply("Morfam has 350 Gold");
        return;
      }
      if(String(char.value).toLowerCase() === 'Zirer'.toLowerCase()){
        interaction.reply("Zirer has 11 Gold");
        return;
      } 
      interaction.reply(`${char.value} has been neglected and is coming Soon\u2122`);
      return;
    }
    interaction.reply(`The party currently has a combined 13,392 Gold \nAlcryn: 35 Gold \nAndrew Tesco: 10,935 Gold \nForge Gwyn: 11 Gold \nGypsolandera: 2,005 Gold \nMorfam: 350 Gold \nOnkh: 10 Gold \nSythran Yjalnrai: 35 Gold \nZirer: 11 Gold`)
  }

  if (interaction.commandName === "roll") {
    const diceType = interaction.options.get('dice-type').value;
    console.log(diceType)
    const result = Math.round(Math.random() * diceType - 1 + 1);
    if(result === 1) {
      interaction.reply('When the fickle hand of fate guides the polyhedral dice to a lowly number, let it be a poignant reminder that even the mightiest of heroes are not immune to the capricious whims of chance. In this moment of adversity, I implore you to seize the opportunity presented by the unexpected turn of events. Embrace the intricate complexities of the narrative as it unfolds, for it is within the depths of uncertainty that the true essence of heroism is revealed. Do not falter in the face of misfortune, but rather let it serve as a catalyst for unparalleled resilience and unwavering determination. Your journey through the realms of imagination is not defined by the arbitrary outcome of a single dice roll, but rather by the indomitable spirit with which you confront each twist and turn along the way. So, let your response to this momentous occasion be nothing short of legendary, as you weave your tale of triumph against all odds.')
    }
    else {
      interaction.reply(`D${diceType} roll! \nYou have rolled ${result}`)
    }

  }

  if (interaction.commandName === "spell") {
    if(interaction.options.get('spell-name').value){
      const spellName = interaction.options.get('spell-name');
    

      fetch(`https://www.dnd5eapi.co/api/spells/${spellName.value}`).then((res) => {
        if(res.ok) {
          return res.json();
      }}).then((data) => {
        console.log(data)
        const embed = new EmbedBuilder()
        .setTitle("Spell Card")
        .setColor("Random")
        .addFields(
          {
            name: "Spell Name",
            value: data.name,
          
          },
          {
            name: "Classes",
            inline: true,
            value: (() => {
              let names = "";
              data.classes.map((arr) => {
              names += `${arr.name} `
              
              })
              return names;
            })() 
          },
          {
            name: "Components",
            inline: true,
            value: (() => {
              let comps = "";
              data.components.map((comp) => {
              comps += `${comp} `
              
              })
              return comps;
            })() 

          },
          {
            name: "Level",
            value: String(data.level),
            inline: true
          }
        )
        .addFields(
          {
            name: "Range",
            value: data.range,
            inline: true
          }, 
          {
          name: "Casting Time",
          value: data.casting_time,
          inline: true
          },
          {
            name: "Duration",
            value: data.duration,
            inline: true
          },
          {
            name: "Description",
            value: data.desc[0]
          }
        )

      interaction.reply({embeds: [embed]})
      }).catch((err) => {
        interaction.reply("Alas, I must regrettably confess to an egregious lack of familiarity with the particular sorcery to which you have so eloquently alluded, leaving me in a state of profound perplexity and disconcertion, as my extensive cognitive faculties fail to encompass the intricate intricacies of said enchantment, thereby rendering me utterly unable to offer any insight or elucidation on the matter at hand.")
        console.log('API Error', err)
      })
    
        
        
   

    } else {
      interaction.reply("Please input the name of the spell, I am a bard not a mind reader")
    }
    

  
  
  }
  
});



bard.login(process.env.TOKEN);