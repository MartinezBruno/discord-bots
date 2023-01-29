module.exports = {
    name: 'reactionrole',
    description: 'Sets up a reaction role message',
    async execute(message, args, Discord, client, channelID) {
        const channel = channelID

        const counterPlayers = message.guild.roles.cache.find(r => r.name === 'Counter Player')
        const rocketPlayers = message.guild.roles.cache.find(r => r.name === 'Rocket Player')
        const valorantPlayers = message.guild.roles.cache.find(r => r.name === 'Valorant Player')

        const counterPlayersReact = '🔫'
        const rocketPlayersReact = '🚙'
        const valorantPlayersReact = '🏳️‍🌈'

        let embed = new Discord.EmbedBuilder()
            .setColor('#e42643')
            .setTitle('Choose a role to be added in')
            .setDescription(
                'Choosing a role will let others tag you easily if they need someone for a game\n\n' +
                    `${counterPlayersReact} for CS:GO\n\n` +
                    `${rocketPlayersReact} for Rocket League\n\n` +
                    `${valorantPlayersReact} for Valorant`,
            )
        let messageEmbed = await message.channel.send({ embeds: [embed] })
        messageEmbed.react(counterPlayersReact)
        messageEmbed.react(rocketPlayersReact)
        messageEmbed.react(valorantPlayersReact)

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return
            if (!reaction.message.guild) return

            if (reaction.message.channel.id === channelID) {
                switch (reaction.emoji.name) {
                    case counterPlayersReact:
                        return await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add(counterPlayers)
                    case rocketPlayersReact:
                        return await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add(rocketPlayers)
                    case valorantPlayersReact:
                        return await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add(valorantPlayers)
                    default:
                        break
                }
            } else return
        })

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return
            if (!reaction.message.guild) return

            if (reaction.message.channel.id === channelID) {
                switch (reaction.emoji.name) {
                    case counterPlayersReact:
                        return await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove(counterPlayers)
                    case rocketPlayersReact:
                        return await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove(rocketPlayers)
                    case valorantPlayersReact:
                        return await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove(valorantPlayers)
                    default:
                        break
                }
            } else return
        })
    },
}
