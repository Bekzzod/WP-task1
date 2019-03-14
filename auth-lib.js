var allUsers = [
	{nickname: "admin", password: "1234", groups: ["admin", "manager", "basic"]},
	{nickname: "sobakajozhec", password: "ekh228", groups: ["basic", "manager"]},
	{nickname: "patriot007", password: "russiaFTW", groups: ["basic"]}
];

var allRights = ["manage content", "play games", "delete users", "view site"];

var allGroups = {
	"admin": [rights[2]],
	"manager": [rights[0]],
	"basic": [rights[1], rights[3]]
}

function createUser(nick, pass) {
	allUsers.push({nickname: nick, password: pass, groups: ["basic"]});

	return allUsers[allUsers.length - 1];
};

function deleteUser(nick) {
	for (var i = 0; i < allUsers.length; i++) {
		if (Object.values(allUsers[i]).indexOf(nick) > -1) {
			allUsers.splice(i, 1);
		}
	}
};

function users() {
	return allUsers;
};

function createGroup() {};

function deleteGroup() {};

function groups() {};

function addUserToGroup() {};

function userGroups() {};

function removeUserFromGroup() {};

function createRight() {};

function deleteRight() {};

function groupRights() {};

function rights() {};

function addRightToGroup() {};

function removeRightFromGroup() {};

function login(username, password) {};

function currentUser() {};

function logout() {};

function isAuthorized(user, right) {};
