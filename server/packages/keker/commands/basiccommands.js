module.exports =
{
	"pos": (player, args) =>
	{
		var pos = player.position;
		player.outputChatBox("X: <b>" + pos.x + "</b>, Y: <b>" + pos.y + "</b>, Z: <b>" + pos.z + "</b>");
	},
	
	"repair" : (player, args) =>
	{
		player.vehicle.repair();
	},
	
	"slapmepls": (player, args) =>
	{
		var pos = player.position;
		pos.z += 2.0;
		
		player.position = pos;
	},
	
	"veh": (player, args) =>
	{
		var pos = player.position;
		pos.x += 2.0;
			
		// добавим созданную машину в массив createdVehs, чтобы контролировать в дальнейшем количество
		// созданных игроками машин
		mp.vehicles.new(mp.joaat(args[1]), pos);
	},
		
	"setweather": (player, args) =>
	{
		mp.environment.weather = args[1];
	},
		
	"settime": (player, args) =>
	{
		mp.environment.time.hour = parseInt(args[1]);
	},
	
	"model": (player, args) =>
	{
		player.model = mp.joaat(args[1]);
	},
	
	"clothes": (player, args) =>
	{
		player.setClothes(parseInt(args[1]), parseInt(args[2]), parseInt(args[3]), parseInt(args[4]));
	},
	
	"prop": (player, args) =>
	{
		player.setProp(parseInt(args[1]), parseInt(args[2]), parseInt(args[3]));
	}
};