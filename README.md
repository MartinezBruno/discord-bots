# discord-bots

A small Discord bot built with [discord.js](https://discord.js.org) v14. It posts a role picker, and members get or lose a role by reacting to it.

## Commands

### `-reactionrole`

Posts an embed listing the available game roles and adds one reaction per role:

| Reaction | Role | Game |
|---|---|---|
| 🔫 | Counter Player | CS:GO |
| 🚙 | Rocket Player | Rocket League |
| 🎯 | Valorant Player | Valorant |

Adding a reaction gives you the role. Removing it takes the role away. Only reactions on the bot's own picker, in the configured channel, are handled.

## Setup

1. Create an application and bot in the Discord Developer Portal and enable the **Message Content** intent.
2. Invite the bot with the `Manage Roles` permission. Its role must sit **above** the game roles in the server's role list.
3. Create the three roles listed above in your server.
4. Add a `.env` file:

   ```env
   tokenID=your-bot-token
   channelID=id-of-the-channel-where-the-picker-lives
   ```

5. Install and run:

   ```sh
   npm install
   npm start
   ```

`server.js` starts a tiny Express server on port 3000 that answers `Bot is running`. It is used as a keep-alive endpoint on hosts that sleep idle processes.

## Stack

Node.js, discord.js 14, Express, dotenv.
