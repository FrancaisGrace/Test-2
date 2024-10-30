import { Client } from 'discord.js';
import config from './config';
import helpCommand from './commands';

const { intents, prefix, token } = config;

const client = new Client({
  intents,
  presence: {
    status: 'online',
    activities: [{
      name: `${prefix}Mother`,
      type: 'LISTENING'
    }]
  }
});

client.on('ready', () => {
  console.log(`Logged in as: ${client.user?.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift();

    switch(command) {
      case 'ping':
        const msg = await message.reply('Pinging...');
        await msg.edit(`KILL YOURSELF, I also responded in: ${Date.now() - msg.createdTimestamp}ms.`);
        break;

      case 'say':
      case 'repeat':
        if (args.length > 0) await message.channel.send(args.join(' '));
        else await message.reply('You did not send a message to repeat,FUCK YOU.');
        break;

      case 'help':
        const embed = helpCommand(message);
        embed.setThumbnail(client.user!.displayAvatarURL());
        await message.channel.send({ embeds: [embed] });
        break;
    }
  }
});

client.login(token);
