let allRights = ["manage content", "play games", "delete users", "view site"];

let allGroups = [{
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

let allUsers = [{
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

let sessionCreated = false;
let sessionUser;

function createUser(nick, pass) {
	if (typeof (nick) == "string" && typeof (pass) == "string") {
		let len = allUsers.push({
			nickname: nick,
			password: pass,
			groups: []
		});

		return allUsers[len - 1];
	}
};

function deleteUser(user) {
	if (user != null) {
		let foundUser = false;

		for (let i = 0; i < allUsers.length; i++) {
			if (allUsers[i] === user) {
				allUsers.splice(i, 1);
				foundUser = true;
			}
		}
		if (foundUser == false) {
			throw new Error('Передали уже удаленн(ого/ое/ую) user');
		}
	} else {
		throw new Error('Передали плохой аргумент');
	}
};

function users() {
	return allUsers;
};

function createGroup() {
	let groupName = "";
	let possibleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

	for (let i = 0; i < 10; i++) {
		groupName += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
	}

	let len = allGroups.push({
		name: groupName,
		rights: []
	});
	return allGroups[len - 1];
};

function deleteGroup(group) {
	if (group != null) {
		let foundGroup = false;

		for (let i = 0; i < allGroups.length; i++) {
			if (allGroups[i] === group) {
				allGroups.splice(i, 1);
				foundGroup = true;

				for (let j = 0; j < allUsers.length; j++) {
					if (allUsers[j].groups.indexOf(group) != -1) {
						allUsers[j].groups.splice(allUsers[j].groups.indexOf(group), 1);
					}
				}
			}
		}
		if (foundGroup == false) {
			throw new Error('Передали уже удаленн(ого/ое/ую) group')
		}
	} else {
		throw new Error('Передали плохой аргумент');
	}
};

function groups() {
	return allGroups;
};

function addUserToGroup(user, group) {
	if (user != null && group != null) {
		let foundUser = false;
		let foundGroup = false;
		let foundUserGroup = false;
		let idUser;

		for (let i = 0; i < allUsers.length; i++) {
			if (allUsers[i] === user) {
				foundUser = true;
				idUser = i;
				break;
			}
		}
		for (let i = 0; i < allGroups.length; i++) {
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
			throw new Error('Передали что-то удаленное');
		}
	} else {
		throw new Error('Передали плохой аргумент');
	}
};

function userGroups(user) {
	let foundUser = false;

	for (let i = 0; i < allUsers.length; i++) {
		if (allUsers[i] === user) {
			foundUser = true;
			return allUsers[i].groups;
		}
	}
	if (foundUser == false) {
		return [];
	}
};

function removeUserFromGroup(user, group) {
	if (user != null && group != null) {
		let foundUser = false;
		let foundGroup = false;
		let foundUserGroup = false;
		let id;

		for (let i = 0; i < allUsers.length; i++) {
			if (allUsers[i] === user) {
				foundUser = true;
				id = i;
				break;
			}
		}
		for (let i = 0; i < allGroups.length; i++) {
			if (allGroups[i] === group) {
				foundGroup = true;
				break;
			}
		}

		if (foundUser == true && foundGroup == true) {
			for (let i = 0; i < allUsers[id].groups.length; i++) {
				if (allUsers[id].groups[i] === group) {
					allUsers[id].groups.splice(i, 1);
					foundUserGroup = true;
				}
			}
			if (foundUserGroup == false) {
				throw new Error('Попытка удалить user из группы, которого там нет')
			}
		} else {
			throw new Error('Передали что-то удаленное');
		}
	} else {
		throw new Error('Передали плохой аргумент');
	}
};

function createRight() {
	let rightName = "";
	let possibleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

	for (let i = 0; i < 10; i++) {
		rightName += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
	}

	let len = allRights.push(rightName);

	return allRights[len - 1];
};

function deleteRight(right) {
	if (right != null) {
		let isExist = allRights.indexOf(right);

		if (isExist != -1) {
			allRights.splice(isExist, 1);

			for (let j = 0; j < allGroups.length; j++) {
				if (allGroups[j] != undefined && allGroups[j].rights != undefined) {
					if (allGroups[j].rights.indexOf(right) != -1) {
						allGroups[j].rights.splice(allGroups[j].rights.indexOf(right), 1);
					}
				}
			}
		} else {
			throw new Error('Передали уже удаленн(ого/ое/ую) right')
		}
	} else {
		throw new Error('Передали плохой аргумент');
	}
};

function groupRights(group) {
	let foundRight = false;

	for (let i = 0; i < allGroups.length; i++) {
		if (allGroups[i] === group) {
			if (allGroups[i].rights != undefined) {
				foundRight = true;
				return allGroups[i].rights;
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
		let foundRight = false;
		let foundGroup = false;
		let foundRigthGroup = false;
		let idGroup;

		for (let i = 0; i < allRights.length; i++) {
			if (allRights[i] === right) {
				foundRight = true;
				break;
			}
		}
		for (let i = 0; i < allGroups.length; i++) {
			if (allGroups[i] === group) {
				foundGroup = true;
				idGroup = i;
				break;
			}
		}

		if (foundRight == true && foundGroup == true) {
			if (allGroups[idGroup].rights != undefined) {
				if (allGroups[idGroup].rights.includes(right)) {
					foundRigthGroup = true;
				}
			} else {
				allGroups[idGroup].rights = [right];
				foundRigthGroup = true;
			}
			if (foundRigthGroup == false) {
				allGroups[idGroup].rights.push(right);
			}
		} else {
			throw new Error('Передали что-то удаленное')
		}
	} else {
		throw new Error('Передали плохой аргумент');
	}
};

function removeRightFromGroup(right, group) {
	if (right != null && group != null) {
		let foundRight = false;
		let foundGroup = false;
		let foundRigthGroup = false;
		let idGroup;

		for (let i = 0; i < allRights.length; i++) {
			if (allRights[i] === right) {
				foundRight = true;
				break;
			}
		}
		for (let i = 0; i < allGroups.length; i++) {
			if (allGroups[i] === group) {
				foundGroup = true;
				idGroup = i;
				break;
			}
		}
		if (foundRight == true && foundGroup == true) {
			if (allGroups[idGroup].rights !== undefined) {
				for (let i = 0; i < allGroups[idGroup].rights.length; i++) {
					if (allGroups[idGroup].rights[i] === right) {
						allGroups[idGroup].rights.splice(i, 1);
						foundRigthGroup = true;
					}
				}
			}
			if (foundRigthGroup == false) {
				throw new Error('Попытка удалить right из группы, которого там нет');
			}
		} else {
			throw new Error('Передали что-то удаленное');
		}
	} else {
		throw new Error('Передали плохой аргумент');
	}
};

function login(username, password) {
	if (typeof (username) == 'string' && typeof (password) == 'string') {
		if (sessionCreated == false) {
			for (let i = 0; i < allUsers.length; i++) {
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
		let foundUser = false;
		let foundRight = false;
		let idUser;
		let groupsWithRight = [];

		for (let i = 0; i < allUsers.length; i++) {
			if (allUsers[i] === user) {
				foundUser = true;
				idUser = i;
				break;
			}
		}

		for (let i = 0; i < allRights.length; i++) {
			if (allRights[i] === right) {
				foundRight = true;
				break;
			}
		}

		for (let i = 0; i < allGroups.length; i++) {
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
				let foundUserRight = allUsers[idUser].groups.some(elem => groupsWithRight.indexOf(elem) != -1);
				if (foundUserRight == true) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			throw new Error('Либо пользователь, либо право было удалено');
		}
	} else {
		throw new Error('Передали плохой аргумент');
	}
};