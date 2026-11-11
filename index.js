require('dotenv').config()
const Discord = require('discord.js')
const keepAlive = require('./server')
const fs = require('fs')

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.Guilds,
    ],
    // Without partials, reactions on messages sent before the bot started
    // (i.e. not in cache) never fire the reaction events.
    partials: [Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.Reaction],
})
const { tokenID, channelID } = process.env
const prefix = '-'

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'))
commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
})

client.once('ready', () => console.log('Bot running'))

client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if (command === 'reactionrole') client.commands.get('reactionrole').execute(message, args, Discord)
})

// Registered once at startup. Previously these lived inside the command and
// were added again on every `-reactionrole`, so listeners piled up.
const reactionRole = client.commands.get('reactionrole')
const onReaction = (action) => (reaction, user) =>
    reactionRole.handleReaction(reaction, user, action, client, channelID).catch(console.error)

client.on('messageReactionAdd', onReaction('add'))
client.on('messageReactionRemove', onReaction('remove'))

keepAlive()
client.login(tokenID)
