var _permissions = [];
/**
 *
 */
CFB.Configure = function (permissions) {
    _.each(permissions, function (p) {
        if(_.indexOf(_permissions, p) == -1)
            _permissions.push(p); 
    });
};
/**
 *
 *
 */
CFB.getPermissions = function () {
    return _permissions;
};