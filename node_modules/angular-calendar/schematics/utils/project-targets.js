"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
exports.__esModule = true;
exports.getProjectTargetOptions = void 0;
/** Resolves the architect options for the build target of the given project. */
function getProjectTargetOptions(project, buildTarget) {
    if (project.targets.get(buildTarget)) {
        return project.targets.get(buildTarget).options;
    }
    throw new Error("Cannot determine project target configuration for: ".concat(buildTarget, "."));
}
exports.getProjectTargetOptions = getProjectTargetOptions;
