const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commands = [];

function commandsFile(path) {
	const commandFiles = fs.readdirSync(path);
	for (let file of commandFiles) {
		if (file.endsWith('.js')) {
			let command = require(path+'/'+file);
			commands.push(command.data.toJSON());
			client.commands.set(command.data.name, command)
		} else commandsFile(path+'/'+file)
	}
}
commandsFile('./commands');

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, commands));
	} 
    else {
		client.on(event.name, (...args) => event.execute(...args, commands));
	}
}

client.login(token);
