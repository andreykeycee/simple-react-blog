'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var apolloServerExpress = require('apollo-server-express');
require('reflect-metadata');
var mongoose = _interopDefault(require('mongoose'));
var typeGraphql = require('type-graphql');
var typegoose = require('@typegoose/typegoose');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

var connectToDb = function () { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoose.connect('mongodb://localhost:27017/', {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        dbName: 'srb'
                    })];
            case 1:
                _a.sent();
                console.info('Database is on the air!');
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.error('unable to connect DB:', e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };

var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeGraphql.Field(function (type) { return typeGraphql.ID; }),
        __metadata("design:type", String)
    ], User.prototype, "_id", void 0);
    __decorate([
        typeGraphql.Field(),
        typegoose.prop(),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        typeGraphql.Field(),
        typegoose.prop(),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeGraphql.Field(),
        typegoose.prop(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    User = __decorate([
        typeGraphql.ObjectType()
    ], User);
    return User;
}());

var AuthResolvers = /** @class */ (function () {
    function AuthResolvers() {
    }
    AuthResolvers.prototype.user = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        typeGraphql.Query(function (returns) { return User; }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], AuthResolvers.prototype, "user", null);
    AuthResolvers = __decorate([
        typeGraphql.Resolver()
    ], AuthResolvers);
    return AuthResolvers;
}());

var buildSchema = (function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeGraphql.buildSchema({
                    resolvers: [
                        AuthResolvers
                    ]
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });

var app = express();
connectToDb().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var schema, server;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, buildSchema()];
            case 1:
                schema = _a.sent();
                server = new apolloServerExpress.ApolloServer({
                    schema: schema,
                });
                server.applyMiddleware({ app: app, path: '/graphql' });
                app.listen({ port: 4004 }, function () {
                    console.log('Apollo Server on http://localhost:4004/graphql');
                });
                return [2 /*return*/];
        }
    });
}); });
