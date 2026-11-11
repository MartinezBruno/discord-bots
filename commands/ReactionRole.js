// Emoji → role name. The roles must already exist in the server.
const ROLES = {
    '🔫': 'Counter Player',
    '🚙': 'Rocket Player',
    '🎯': 'Valorant Player',
}

const GAMES = {
    '🔫': 'CS:GO',
    '🚙': 'Rocket League',
    '🎯': 'Valorant',
}

module.exports = {
    name: 'reactionrole',
    description: 'Sets up a reaction role message',

    // Posts the role picker. Reactions are handled once, globally, in index.js
    // through handleReaction — not here, so calling the command again does not
    // stack duplicate listeners.
    async execute(message, args, Discord) {
        const embed = new Discord.EmbedBuilder()
            .setColor('#e42643')
            .setTitle('Choose a role to be added in')
            .setDescription(
                'Choosing a role will let others tag you easily if they need someone for a game\n\n' +
                    Object.entries(GAMES)
                        .map(([emoji, game]) => `${emoji} for ${game}`)
                        .join('\n\n'),
            )

        const messageEmbed = await message.channel.send({ embeds: [embed] })
        for (const emoji of Object.keys(ROLES)) await messageEmbed.react(emoji)
    },

    // action: 'add' | 'remove'
    async handleReaction(reaction, user, action, client, channelID) {
        if (reaction.partial) await reaction.fetch()
        if (reaction.message.partial) await reaction.message.fetch()
        if (user.bot) return

        const { message } = reaction
        if (!message.guild) return
        if (message.channel.id !== channelID) return
        // Only the picker posted by this bot assigns roles.
        if (message.author?.id !== client.user.id) return

        const roleName = ROLES[reaction.emoji.name]
        if (!roleName) return

        const role = message.guild.roles.cache.find((r) => r.name === roleName)
        if (!role) return console.warn(`Role "${roleName}" not found`)

        const member = await message.guild.members.fetch(user.id)
        await member.roles[action](role)
    },
}
