const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('../config.json');
const token = process.env.TOKEN;

module.exports = {
	name: 'ready',
	once: true,
	execute(client, commands) {
		console.log(`Logged in as ${client.user.tag}`);

		const rest = new REST({ version: '9' }).setToken(token);

		(async () => {
			try {
				console.log('Started refreshing application (/) commands.');

				await rest.put(
					Routes.applicationGuildCommands(clientId, guildId),
					{ body: commands }
				);

				console.log('Successfully reloaded application (/) commands.');
			} 
			catch (error) {
				console.error(error);
			}
		})();
	}
};
