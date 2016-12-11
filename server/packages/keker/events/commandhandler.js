var fs = require('fs'), path = require('path'); 

var registeredCommands = {};

// load commands on next tick
setTimeout(() =>
{	
	console.log('\nLoading commands:'); 
	fs.readdirSync(path.resolve(__dirname, '../commands')).forEach(src =>
	{
		process.stdout.write('\t\"' + src + '\"');
		Object.assign(registeredCommands, require('../commands/' + src)); 
		console.log(" - OK");
	});
}, 0);

module.exports =
{
	"playerCommand": (player, cmdtext) =>
	{
		var arr = cmdtext.split(" ");		
		var cmd = registeredCommands[arr[0]];
			
		if(cmd != null)
		{
			cmd(player, arr, cmdtext);
		}
	}
};