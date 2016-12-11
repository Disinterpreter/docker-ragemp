var registeredEvents = [];

console.log('\nLoading events:'); 

fs.readdirSync(path.resolve(__dirname, 'events')).forEach(src =>
{
	process.stdout.write('\t\"' + src + '\"');
	registeredEvents = registeredEvents.concat(require('./events/' + src)); 
	console.log(" - OK");
});

registeredEvents.forEach(event => { mp.events.add(event); });