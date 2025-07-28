"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var schematics_1 = require("@angular-devkit/schematics");
var tasks_1 = require("@angular-devkit/schematics/tasks");
var ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
var ast_utils_1 = require("@schematics/angular/utility/ast-utils");
var workspace_1 = require("@schematics/angular/utility/workspace");
var dependencies_1 = require("@schematics/angular/utility/dependencies");
var core_1 = require("@angular-devkit/core");
var utils_1 = require("../utils");
var version_names_1 = require("./version-names");
function default_1(options) {
    return (0, schematics_1.chain)([
        addPackageJsonDependencies(options),
        installPackageJsonDependencies(),
        addModuleToImports(options),
        addAngularCalendarStyle(options),
    ]);
}
exports["default"] = default_1;
function installPackageJsonDependencies() {
    return function (host, context) {
        context.addTask(new tasks_1.NodePackageInstallTask());
        context.logger.log('info', "Installing angular calendar dependencies...");
        return host;
    };
}
function addPackageJsonDependencies(options) {
    return function (host, context) {
        var dateAdapters = {
            moment: version_names_1.momentVersion,
            'date-fns': version_names_1.dateFnsVersion
        };
        var angularCalendarDependency = nodeDependencyFactory('angular-calendar', version_names_1.angularCalendarVersion);
        var dateAdapterLibrary = options.dateAdapter;
        var dateAdapterLibraryDependency = nodeDependencyFactory(dateAdapterLibrary, dateAdapters[dateAdapterLibrary]);
        (0, dependencies_1.addPackageJsonDependency)(host, angularCalendarDependency);
        context.logger.log('info', "Added \"".concat(angularCalendarDependency.name, "\" into ").concat(angularCalendarDependency.type));
        (0, dependencies_1.addPackageJsonDependency)(host, dateAdapterLibraryDependency);
        context.logger.log('info', "Added \"".concat(dateAdapterLibraryDependency.name, "\" into ").concat(dateAdapterLibraryDependency.type));
        return host;
    };
}
function nodeDependencyFactory(packageName, version) {
    return {
        type: dependencies_1.NodeDependencyType.Default,
        name: packageName,
        version: version,
        overwrite: true
    };
}
function addModuleToImports(options) {
    var _this = this;
    return function (host, context) { return __awaiter(_this, void 0, void 0, function () {
        var workspace, project, mainPath, appModulePath, moduleName, moduleCalendarSrc, moduleSource, updates, recorder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    context.logger.log('info', "Add modules imports options...");
                    return [4 /*yield*/, (0, workspace_1.getWorkspace)(host)];
                case 1:
                    workspace = _a.sent();
                    project = (0, utils_1.getProjectFromWorkspace)(workspace, options.projectName);
                    mainPath = (0, utils_1.getProjectMainFile)(project);
                    appModulePath = options.module
                        ? (0, core_1.normalize)(project.root + '/' + options.module)
                        : (0, ng_ast_utils_1.getAppModulePath)(host, mainPath);
                    moduleName = "CalendarModule.forRoot({ provide: DateAdapter, useFactory: ".concat(options.dateAdapter === 'moment'
                        ? 'momentAdapterFactory'
                        : 'adapterFactory', " })");
                    moduleCalendarSrc = 'angular-calendar';
                    (0, utils_1.addModuleImportToRootModule)(host, moduleName, moduleCalendarSrc, project);
                    moduleSource = (0, utils_1.getSourceFile)(host, appModulePath);
                    updates = [
                        (0, ast_utils_1.insertImport)(moduleSource, appModulePath, 'DateAdapter', moduleCalendarSrc),
                        (0, ast_utils_1.insertImport)(moduleSource, appModulePath, 'adapterFactory', "".concat(moduleCalendarSrc, "/date-adapters/").concat(options.dateAdapter)),
                    ];
                    if (options.dateAdapter === 'moment') {
                        updates.push((0, utils_1.insertWildcardImport)(moduleSource, appModulePath, 'moment', 'moment'));
                        updates.push((0, utils_1.insertAfterImports)(moduleSource, appModulePath, ";\n\nexport function momentAdapterFactory() {\n  return adapterFactory(moment);\n}"));
                    }
                    recorder = host.beginUpdate(appModulePath);
                    updates.forEach(function (update) {
                        recorder.insertLeft(update.pos, update.toAdd);
                    });
                    host.commitUpdate(recorder);
                    return [2 /*return*/, (0, schematics_1.mergeWith)((0, schematics_1.source)(host))];
            }
        });
    }); };
}
function addAngularCalendarStyle(options) {
    var libStylePath = 'node_modules/angular-calendar/css/angular-calendar.css';
    return (0, utils_1.addStyle)(libStylePath, options.projectName);
}
