var _permissions = [];
	
CFB.getPermissions = function () {
    return _permissions;
};

CFB.Configure = function (permissions) {};

if (Meteor.settings.public.facebook.permissions) {
	_.each(Meteor.settings.public.facebook.permissions, function (p) {
		if(_.indexOf(_permissions, p) == -1)
			_permissions.push(p); 
	});
}