"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.addStyle = void 0;
var schematics_1 = require("@angular-devkit/schematics");
var _1 = require(".");
var workspace_1 = require("@schematics/angular/utility/workspace");
function addStyleToTarget(project, targetName, stylePath) {
    var target = project.targets.get(targetName);
    return project.targets.set(targetName, __assign(__assign({}, target), { options: __assign(__assign({}, target.options), { styles: __spreadArray([stylePath], target.options.styles, true) }) }));
}
function addStyle(stylePath, projectName) {
    return (0, workspace_1.updateWorkspace)(function (workspace) {
        var appConfig = getAngularAppConfig(workspace, projectName);
        if (appConfig) {
            addStyleToTarget(appConfig, 'build', stylePath);
            addStyleToTarget(appConfig, 'test', stylePath);
        }
        else {
            throw new schematics_1.SchematicsException("project configuration could not be found");
        }
    });
}
exports.addStyle = addStyle;
function isAngularBrowserProject(projectConfig) {
    var buildConfig = projectConfig.targets.get('build');
    return (buildConfig === null || buildConfig === void 0 ? void 0 : buildConfig.builder) === '@angular-devkit/build-angular:browser';
}
function getAngularAppConfig(workspace, projectName) {
    var projectConfig = (0, _1.getProjectFromWorkspace)(workspace, projectName);
    return isAngularBrowserProject(projectConfig) ? projectConfig : null;
}
