const { SlashCommandBuilder, SlashCommandUserOption } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const { task } = require('./commands/task');

const mapCommand = (command) => {
	if(command.name == undefined || command.description == undefined) {
		throw 'command has no name or no description';
	}

	const builder = new SlashCommandBuilder().setName(command.name).setDescription(command.description);

	if(command.useroptions != undefined)
		for(let useroption of command.useroptions) {
			builder.addUserOption(option => {
				if(useroption.name == undefined || useroption.description == undefined) {
					throw 'user option has no name or no description';
				}
	
				option.setName(useroption.name).setDescription(useroption.description);
				if(useroption.required != undefined) option.setRequired(useroption.required);

				return option;
			})
		}

	if(command.stringoptions != undefined)
		for(let stringoption of command.stringoptions) {
			builder.addStringOption(option => {
				if(stringoption.name == undefined || stringoption.description == undefined) {
					throw 'user option has no name or no description';
				}
	
				option.setName(stringoption.name).setDescription(stringoption.description);
				if(stringoption.required != undefined) option.setRequired(stringoption.required);

				return option;
			})

		}

	return builder;
}

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	mapCommand(task),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);