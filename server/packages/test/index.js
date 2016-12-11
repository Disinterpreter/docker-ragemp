/*
 *	SIMPLE ADMIN
 *		TUTORIAL:
 *
 *	Enter your password in variable "password", after that login with /login [password] ingame.
 *
 */
var password = "1337";
var loggedin = [];
console.log("Simple Admin");
mp.events.add(
{
        "playerCommand": (player, cmd) => {
		if(cmd.search("login") != -1) {
			var pw = cmd.substr(6);
			if(pw == password) {
				loggedin.push(player.name);		
				player.outputChatBox("[SIMPLE ADMIN] Successfully logged in.");
			}else{
				player.outputChatBox("[SIMPLE ADMIN] Wrong password.");
			}
                }
		if(cmd.search("kick") != -1) {
			if(loggedin.indexOf(player.name) > -1) {
				mp.players.forEach(function(entry) {
					if(entry.name == cmd.substr(5)) {
						player.outputChatBox("[SIMPLE ADMIN] Kicked player " + entry.name);
						entity.outputChatBox("<h2>You got kicked by admin " + entry.name + "</h2>");
						entry.kick("Kicked by admin " + player.name);
					}
				});
			}else{
				player.outputChatBox("[SIMPLE ADMIN] You have no permission to do this.");
			}
		}
		if(cmd.search("ban") != -1) {
		 	if(loggedin.indexOf(player.name) > -1) {
                                mp.players.forEach(function(entry) {
                                        if(entry.name == cmd.substr(5)) {
                                                player.outputChatBox("[SIMPLE ADMIN] Banned player " + entry.name);
						entry.outputChatBox("<h2>You got banned by admin " + entry.name + "</h2>");
                                                entry.ban("Banned by admin " + player.name);
                                        }
                                });
                        }else{
                                player.outputChatBox("[SIMPLE ADMIN] You have no permission to do this.");
                        }
		}
		if(cmd.search("goto") != -1) {
			if(loggedin.indexOf(player.name) > -1) {
				mp.players.forEach(function(entry) {
                                        if(entry.name == cmd.substr(5)) {
						player.outputChatBox("[SIMPLE ADMIN] Teleport to player " + entry.name);
						player.position = entry.position;
						player.spawn(entry.position);
					}
				});
                        }else{
                                player.outputChatBox("[SIMPLE ADMIN] You have no permission to do this.");
                        }

		}
        },
	"playerQuit" : (player, reason, kickReason) => {
		loggedin.pop(player);
	}
});
