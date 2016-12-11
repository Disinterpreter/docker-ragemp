global.game = 
{
	spawns: [new mp.Vector3(2140.15454, 4783.173, 40.4812241), new mp.Vector3(2133.27148, 4777.55, 40.4814262), 
		new mp.Vector3(2019.19739, 4763.39746, 40.62057), new mp.Vector3(2027.80859, 4749.584, 40.7290535)],

	models: mp.joaat(["mp_m_weed_01", "mp_m_forgery_01", "mp_f_weed_01", "mp_f_chbar_01", "ig_johnnyklebitz",
						"player_two", "ig_nervousron", "ig_wade", "ig_floyd", "ig_chef"]),
						
	weapons: mp.joaat(["WEAPON_PISTOL", "WEAPON_ASSAULTRIFLE","WEAPON_SAWNOFFSHOTGUN","WEAPON_COMPACTRIFLE"])
};

mp.environment.weather = 'HALLOWEEN';
mp.environment.time.hour = 23;

// добавим словарь причин смертей, чтобы преобразовывать хеши в строки
var g_reasons = {};

function InitReasons(arr)
{
	arr.forEach(reason => { g_reasons[mp.joaat(reason)] = reason.substr(7); });
}

InitReasons(["WEAPON_PISTOL", "WEAPON_ASSAULTRIFLE","WEAPON_SAWNOFFSHOTGUN","WEAPON_COMPACTRIFLE"]);

module.exports =
{
	"test" : () => { console.log("haha"); },
	
	"playerJoin" : player =>
	{
		// присвоим игроку случайную модель
		player.model = game.models[Math.floor(Math.random() * game.models.length)]
		
		// you can use both ways
		//game.weapons.forEach(weapon => { player.giveWeapon(weapon, 10000); });			
		player.giveWeapon(game.weapons, 1000);
		
		// заспавним в одной из точек, указанных в game.spawns
		player.spawn(game.spawns[Math.floor(Math.random() * game.spawns.length)]);
		
		player.kills = 0;
	},
	
	"playerDeath" : (player, reason, killer) =>
	{
		if(killer != null)
		{
			killer.kills++;
				
			// узнаем причину, так как reason - хеш причины
			var str = g_reasons[reason];
				
			if(str != undefined)
			{
				str = player.name + "(" + player.kills + ")" + " [" + str + "] " + killer.name + "(" + killer.kills + ")";
				mp.players.forEach(_player => { _player.outputChatBox(str); });
			}
		}
		
		player.spawn(game.spawns[Math.floor(Math.random() * game.spawns.length)]);
	},
	
	"playerQuit" : (player, reason, kickReason) =>
	{
		const str = player.name + " quit";
		mp.players.forEach(_player => { _player.outputChatBox(str); });
	},
	
	"playerChat": (player, text) =>
	{
		// мы можем использовать html-теги в чате, так как он сделан на HTML (cef),
		// используем тег выделения для выделения количества убийств у каждого
		const str = player.name + "<b>(" + player.kills + ")</b>: " + text;
		
		// отправим сообщение всем игрокам
		mp.players.forEach(_player => { _player.outputChatBox(str); });
	}
};