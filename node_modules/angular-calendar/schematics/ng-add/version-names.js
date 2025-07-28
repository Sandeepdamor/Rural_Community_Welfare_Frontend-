"use strict";
exports.__esModule = true;
exports.dateFnsVersion = exports.momentVersion = exports.angularCalendarVersion = void 0;
var packageJson = require('./package.json'); // eslint-disable-line  @typescript-eslint/no-var-requires
exports.angularCalendarVersion = "^".concat(packageJson.version);
exports.momentVersion = packageJson.devDependencies.moment;
exports.dateFnsVersion = packageJson.devDependencies['date-fns'];
