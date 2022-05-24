task = {
    name: 'task',
    description: 'Assign a task',
    useroptions: [{
        name: 'user',
        description: 'set the user to assign the task to',
        required: true,
    }],
    stringoptions: [{
        name: 'time',
        description: '?d ?h ?m time to assign to the task',
        requiered: true,
    }],
    run: (interaction) => {
        const options = interaction.options._hoistedOptions;

        console.log(options);

        interaction.reply(`task recieved for user <@${options[0].user.id}>`);
        setTimeout(() => {
            interaction.channel.send(`REMINDER <@${options[0].user.id}>`);
        }, 5000);
    }
}

module.exports = { task: task };