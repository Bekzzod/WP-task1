var allUsers = [
	{nickname: "admin", password: "1234", groups: ["admin", "manager", "basic"]},
	{nickname: "sobakajozhec", password: "ekh228", groups: ["basic", "manager"]},
	{nickname: "patriot007", password: "russiaFTW", groups: ["basic"]}
];

var allRights = ["manage content", "play games", "delete users", "view site"];

var allGroups = {
	"admin": [allRights[2]],
	"manager": [allRights[0]],
	"basic": [allRights[1], allRights[3]]
}

function createUser(nick, pass) {
	if (typeof(nick) == "string" && typeof(pass) == "string") {
		var len = allUsers.push({nickname: nick, password: pass, groups: ["basic"]});

		return allUsers[len - 1];
	}
};

function deleteUser(user) {
	if (user != null) {
		var found = false;

		for(var i = 0; i < allUsers.length; i++) {
			if (allUsers[i] === user) {
				allUsers.splice(i, 1);
				found = true;
			}
		}
		if (found == false){
			throw new Error('сообщение, описывающее возникшую ошибку');
		}
	}
	else {
		throw new Error('сообщение, описывающее возникшую ошибку');
	}
};

function users() {
	return allUsers;
};

function createGroup() {};

function deleteGroup(group) {
	if (group != null) {
		var groups = Object.keys(allGroups);
		var isExist = groups.indexOf(group);

		if ( isExist != -1) {
			delete allGroups[group];
		}
	}
	else {
		throw new Error('сообщение, описывающее возникшую ошибку')
	}
};

function groups() {
	return Object.values(allGroups);
};

function addUserToGroup(nick, group) {

};

function userGroups(nick) {
	for(var i = 0; i < allUsers.length; i++) {
		if (allUsers[i].nickname === nick) {
			return allUsers[i].groups;
		}
		else {
			return [];
		}
	}
};

function removeUserFromGroup() {};

function createRight(right) {
	if (right != null) {
		var len = allRights.push(right);
		
		return allRights[len - 1];
		}
};

function deleteRight(right) {
	if (right != null) {
		var isExist = allRights.indexOf(right);

		if ( isExist != -1) {
			allRights.splice(isExist, 1);
		}
	}
	else {
		throw new Error('сообщение, описывающее возникшую ошибку')
	}
};

function groupRights(group) {
	var groups = Object.keys(allGroups);
	var isExist = groups.indexOf(group);

	if ( isExist != -1) {
		return allGroups[group];
	}
	else {
		return [];
	}
};

function rights() {
	return allRights;
};

function addRightToGroup() {};

function removeRightFromGroup() {};

function login(username, password) {};

function currentUser() {};

function logout() {};

function isAuthorized(user, right) {};
