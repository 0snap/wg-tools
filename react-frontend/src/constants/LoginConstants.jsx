var keyMirror = require('keymirror');

let Constants = keyMirror({
  LOGIN_SUCCESS: null,
  LOGIN_ERROR: null,
  LOGIN_FAILED: null,
  LOGOUT_SUCCESS: null,
  LOGIN_STATUS_CHANGED: null,
  REGISTER_ERROR: null,
  REGISTER_FAILED: null,
  WG_TOOLS_AUTH: null
});

module.exports = Constants;