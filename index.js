const configData = require("./config.json");
const DiscordJS = require("discord.js");
const client = new DiscordJS.Client();

const customEmbed = (author, authorImage, text, title, colorCode) => {
	const embed = new DiscordJS.MessageEmbed()
		.setAuthor(author, authorImage, "https://www.schulzdev.com")
		.setTitle(title)
		.setDescription(text)
		.setColor(colorCode)
		.setTimestamp()
		.setFooter("MfG Max :)");

	return embed;
};

client.on("ready", () => {
	console.log("Bot ist ready.");
});

client.on("message", (msg) => {
	if (!msg.content.startsWith(configData.Prefix) || msg.author.bot) return;

	const args = msg.content.slice(configData.Prefix.length).trim().split(" ");
	const command = args.shift().toLowerCase();

	//Willkommen Command
	if (command === "hello") {
		msg.reply("Hallo!");
		return;
	}

	//Embed Command
	if (command === "embed") {
		if (args.length < 1) {
			const reminderMsg = msg.reply("Specify the Text!");
			setTimeout(() => {
				reminderMsg.then((message) => {
					message.delete();
				});
			}, 1000);
			return;
		} else {
			msg.delete().then(() => {
				const text = args.join(" ");
				msg.reply(
					customEmbed(
						msg.author.username,
						msg.author.avatarURL(),
						text,
						"Announcement",
						"#ff0000"
					)
				);
			});
			return;
		}
	}
});

client.login(configData.Token);
