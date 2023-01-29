require('dotenv').config()
const Discord = require('discord.js')
const fs = require('fs')

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.Guilds,
    ],
})
const { tokenID, channelID } = process.env
const prefix = '-'

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
commandFiles.forEach(file => {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
})

client.once('ready', () => console.log('Bot running'))

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if (command === 'reactionrole') client.commands.get('reactionrole').execute(message, args, Discord, client, channelID)
})

client.login(tokenID)
