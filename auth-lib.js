var allRights = ["manage content", "play games", "delete users", "view site"];

var allGroups = [{
		name: "admin",
		rights: [allRights[2]]
	},
	{
		name: "manager",
		rights: [allRights[0]]
	},
	{
		name: "basic",
		rights: [allRights[1], allRights[3]]
	}
]

var allUsers = [{
		nickname: "admin",
		password: "1234",
		groups: [allGroups[0], allGroups[1], allGroups[2]]
	},
	{
		nickname: "sobakajozhec",
		password: "ekh228",
		groups: [allGroups[2], allGroups[1]]
	},
	{
		nickname: "patriot007",
		password: "russiaFTW",
		groups: [allGroups[2]]
	}
];

var sessionCreated = false;
var sessionUser;

function createUser(nick, pass) {
	if (typeof (nick) == "string" && typeof (pass) == "string") {
		var len = allUsers.push({
			nickname: nick,
			password: pass,
			groups: [allGroups[2]]
		});

		return allUsers[len - 1];
	}
};

function deleteUser(user) {
	if (user != null) {
		var found = false;

		for (var i = 0; i < allUsers.length; i++) {
			if (allUsers[i] === user) {
				allUsers.splice(i, 1);
				found = true;
			}
		}
		if (found == false) {
			throw new Error('должна бросить исключение, если ей передали уже удаленн(ого/ое/ую) user');
		}
	} else {
		throw new Error('должна бросить исключение, если ей передали плохой аргумент');
	}
};

function users() {
	return allUsers;
};

function createGroup() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 7; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	var rndRigth = Math.floor(Math.random() * allRights.length);

	var len = allGroups.push({
		name: text,
		rights: undefined
	});
	return allGroups[len - 1];
};

function deleteGroup(group) {
	if (group != null) {
		var found = false;

		for (var i = 0; i < allGroups.length; i++) {
			if (allGroups[i] === group) {
				delete allGroups[i];
				found = true;

				for (var j = 0; j < allUsers.length; j++) {
					if (allUsers[j].groups.indexOf(group) != -1) {
						allUsers[j].groups.splice(allUsers[j].groups.indexOf(group), 1);
					}
				}
			}
		}
		if (found == false) {
			throw new Error('сообщение, описывающее возникшую ошибку')
		}
	} else {
		throw new Error('должна бросить исключение, если ей передали плохой аргумент');
	}
};

function groups() {
	return allGroups;
};

function addUserToGroup(user, group) {
	if (user != null && group != null) {
		var foundUser = false;
		var foundGroup = false;
		var foundUserGroup = false;
		var idUser;

		for (var i = 0; i < allUsers.length; i++) {
			if (allUsers[i] === user) {
				foundUser = true;
				idUser = i;
				break;
			}
		}
		for (var i = 0; i < allGroups.length; i++) {
			if (allGroups[i] === group) {
				foundGroup = true;
				break;
			}
		}

		if (foundUser == true && foundGroup == true) {
			if (allUsers[idUser].groups.indexOf(group) != -1) {
				foundUserGroup = true;
			}
			if (foundUserGroup == false) {
				allUsers[idUser].groups.push(group);
			}
		} else {
			throw new Error('должна бросить исключение, если ей передали что-то удаленное');
		}
	} else {
		throw new Error('должна бросить исключение, если ей передали плохой аргумент');
	}
};

function userGroups(user) {
	var foundUser = false;

	for (var i = 0; i < allUsers.length; i++) {
		if (allUsers[i] === user) {
			return allUsers[i].groups;
			foundUser = true;
		}
	}
	if (foundUser == false) {
		return [];
	}
};

function removeUserFromGroup(user, group) {
	if (user != null && group != null) {
		var foundUser = false;
		var foundGroup = false;
		var foundUserGroup = false;
		var id;

		for (var i = 0; i < allUsers.length; i++) {
			if (allUsers[i] === user) {
				foundUser = true;
				id = i;
				break;
			}
		}
		for (var i = 0; i < allGroups.length; i++) {
			if (allGroups[i] === group) {
				foundGroup = true;
				break;
			}
		}

		if (foundUser == true && foundGroup == true) {
			for (var i = 0; i < allUsers[id].groups.length; i++) {
				if (allUsers[id].groups[i] === group) {
					allUsers[id].groups.splice(i, 1);
					foundUserGroup = true;
				}
			}
			if (foundUserGroup == false) {
				throw new Error('должна должна бросить исключение при попытке удалить user из группы, которого там нет')
			}
		} else {
			throw new Error('сообщение, описывающее возникшую ошибку');
		}
	} else {
		throw new Error('должна бросить исключение, если ей передали плохой аргумент');
	}
};

function createRight() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 7; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	var len = allRights.push(text);

	return allRights[len - 1];
};

function deleteRight(right) {
	if (right != null) {
		var isExist = allRights.indexOf(right);

		if (isExist != -1) {
			allRights.splice(isExist, 1);

			for (var j = 0; j < allGroups.length; j++) {
				if (allGroups[j] != undefined && allGroups[j].rights != undefined) {
					if (allGroups[j].rights.indexOf(right) != -1) {
						allGroups[j].rights.splice(allGroups[j].rights.indexOf(right), 1);
					}
				}
			}
		} else {
			throw new Error('должна бросить исключение, если ей передали уже удаленн(ого/ое/ую) right')
		}
	} else {
		throw new Error('должна бросить исключение, если ей передали плохой аргумент')
	}
};

function groupRights(group) {
	var foundRight = false;

	for (var i = 0; i < allGroups.length; i++) {
		if (allGroups[i] === group) {
			if (allGroups[i].rights != undefined) {
				return allGroups[i].rights;
				foundRight = true;
			}
		}
	}
	if (foundRight == false) {
		return [];
	}
};

function rights() {
	return allRights;
};

function addRightToGroup(right, group) {
	if (right != null && group != null) {
		var foundRight = false;
		var foundGroup = false;
		var foundRigthGroup = false;
		var idRight;
		var idGroup;

		for (var i = 0; i < allRights.length; i++) {
			if (allRights[i] === right) {
				foundRight = true;
				idRight = i;
				break;
			}
		}
		for (var i = 0; i < allGroups.length; i++) {
			if (allGroups[i] === group) {
				foundGroup = true;
				idGroup = i;
				break;
			}
		}

		if (foundRight == true && foundGroup == true) {
			if (allGroups[idGroup].rights != undefined) {
				if (allGroups[idGroup].rights.includes(allRights[idRight])) {
					foundRigthGroup = true;
				}
			} else {
				allGroups[idGroup].rights = [allRights[idRight]];
				foundRigthGroup = true;
			}
			if (foundRigthGroup == false) {
				allGroups[idGroup].rights.push(allRights[idRight]);
			}
		} else {
			throw new Error('должна бросить исключение, если ей передали что-то удаленное')
		}
	} else {
		throw new Error('должна бросить исключение, если ей передали плохой аргумент')
	}
};

function removeRightFromGroup(right, group) {
	if (right != null && group != null) {
		var foundRight = false;
		var foundGroup = false;
		var foundRigthGroup = false;
		var idGroup;

		for (var i = 0; i < allRights.length; i++) {
			if (allRights[i] === right) {
				foundRight = true;
				break;
			}
		}
		for (var i = 0; i < allGroups.length; i++) {
			if (allGroups[i] === group) {
				foundGroup = true;
				idGroup = i;
				break;
			}
		}
		if (foundRight == true && foundGroup == true) {
			if (allGroups[idGroup].rights !== undefined) {
				for (var i = 0; i < allGroups[idGroup].rights.length; i++) {
					if (allGroups[idGroup].rights[i] === right) {
						allGroups[idGroup].rights.splice(i, 1);
						foundRigthGroup = true;
					}
				}
			}
			if (foundRigthGroup == false) {
				throw new Error('должна должна бросить исключение при попытке удалить right из группы, которого там нет');
			}
		} else {
			throw new Error('должна бросить исключение, если ей передали что-то удаленное');
		}
	} else {
		throw new Error('должна бросить исключение, если ей передали плохой аргумент');
	}
};

function login(username, password) {
	if (typeof (username) == 'string' && typeof (password) == 'string') {
		if (sessionCreated == false) {
			for (var i = 0; i < allUsers.length; i++) {
				if (allUsers[i].nickname === username && allUsers[i].password === password) {
					sessionCreated = true;
					sessionUser = allUsers[i];
				}
			}
			if (sessionCreated) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
};

function currentUser() {
	return sessionUser;
};

function logout() {
	sessionUser = undefined;
	sessionCreated = false;
};

function isAuthorized(user, right) {
	if (user != null && right != null) {
		var foundUser = false;
		var foundRight = false;
		var idUser;
		var groupsWithRight = [];

		for (var i = 0; i < allUsers.length; i++) {
			if (allUsers[i] === user) {
				foundUser = true;
				idUser = i;
				break;
			}
		}

		for (var i = 0; i < allRights.length; i++) {
			if (allRights[i] === right) {
				foundRight = true;
				break;
			}
		}

		for (var i = 0; i < allGroups.length; i++) {
			if (allGroups[i] != undefined) {
				if (allGroups[i].rights != undefined) {
					if (allGroups[i].rights.includes(right)) {
						groupsWithRight.push(allGroups[i]);
					}
				}
			}
		}

		if (foundUser == true && foundRight == true) {
			if (groupsWithRight.length > 0) {
				var foundUserRight = allUsers[idUser].groups.some(elem => groupsWithRight.indexOf(elem) != -1);
				if (foundUserRight == true) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			throw new Error('функция isAuthorized должна бросать исключения, когда либо пользователь, либо право было удалено');
		}
	} else {
		throw new Error('функция isAuthorized должна бросать исключения, когда её вызывают с плохими аргументами');
	}
};