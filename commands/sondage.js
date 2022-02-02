const { SlashCommandBuilder } = require('@discordjs/builders')
const Numero = require('../tools/numero')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sondage')
        .setDescription("lol")
        .addSubcommand(subcommand =>
            subcommand
                .setName("help")
                .setDescription("Besoin d'aide ?")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("vote")
                .setDescription("Lance un vote.")
                .addStringOption(option =>
                    option.setName("choix")
                        .setDescription("Liste des choix")
                        .setRequired(true)
                    )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("start")
                .setDescription("Débute un sondage.")
                .addStringOption(option =>
                    option.setName("selection")
                        .setDescription("Liste des sélectionés")
                        .setRequired(true)
                    )
        ),
	async execute(interaction) {
        command = interaction.options.getSubcommand()
        if (command == "help") {
            
        }
        else if (command == "vote") {
            let liste = interaction.options.getString("choix").split(" ")
            if (liste.length > 9) return
            
            let content = Numero.num(1) + " : " + liste[0]
            i = 1
            while (i < liste.length) {
                content = content + "\n" + Numero.num(i+1) + " : " + liste[i]
                i++
            }

            const message = await interaction.reply({ content: content, fetchReply: true });
		    i = 1
            while (i <= liste.length) {
                message.react(Numero.num(i))
                i++
            }
        }
        else if (command == "start") {
            let lol = interaction.options.getString("selection")
            interaction.reply(lol)
        }
	}
};