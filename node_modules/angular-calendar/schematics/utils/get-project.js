"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
exports.__esModule = true;
exports.getProjectFromWorkspace = void 0;
var schematics_1 = require("@angular-devkit/schematics");
/**
 * Finds the specified project configuration in the workspace. Throws an error if the project
 * couldn't be found.
 */
function getProjectFromWorkspace(workspace, projectName) {
    if (!projectName) {
        var allProjects = Array.from(workspace.projects.values());
        if (allProjects.length === 1) {
            // is only 1 project, it must be the default
            return allProjects[0];
        }
        // follows logic from angular CLI by determining the default project that has the root set to main project
        var defaultProject = allProjects.find(function (project) { return project.root === ''; });
        if (!defaultProject) {
            throw new schematics_1.SchematicsException('Workspace does not have a default project');
        }
    }
    var project = workspace.projects.get(projectName);
    if (!project) {
        throw new schematics_1.SchematicsException("Could not find project in workspace: ".concat(projectName));
    }
    return project;
}
exports.getProjectFromWorkspace = getProjectFromWorkspace;
