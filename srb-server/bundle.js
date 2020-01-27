'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var apolloServerExpress = require('apollo-server-express');
require('reflect-metadata');
var mongoose = _interopDefault(require('mongoose'));
var typeGraphql = require('type-graphql');
var typegoose = require('@typegoose/typegoose');
var bcrypt = _interopDefault(require('bcrypt'));
var jwt = _interopDefault(require('jsonwebtoken'));
var lodash = require('lodash');

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

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
        typegoose.prop(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    User = __decorate([
        typeGraphql.ObjectType()
    ], User);
    return User;
}());
var UserModel = typegoose.getModelForClass(User, {
    schemaOptions: {
        timestamps: true,
        collection: 'users'
    }
});

var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes["REGISTER_FAILED"] = "REGISTER_FAILED";
    ErrorTypes["LOGIN_FAILED"] = "LOGIN_FAILED";
})(ErrorTypes || (ErrorTypes = {}));

var errorConstructor = function (type, message) { return ({ type: type, message: message }); };

var errorResponse = function (type, message) { return ({
    error: errorConstructor(type, message)
}); };

var hashPassword = function (password) { return __awaiter(void 0, void 0, void 0, function () {
    var rounds;
    return __generator(this, function (_a) {
        rounds = 10;
        return [2 /*return*/, bcrypt.hash(password, rounds)];
    });
}); };
var verifyPassword = function (_a, passwordInput) {
    var password = _a.password;
    return bcrypt.compare(passwordInput, password);
};
var createToken = function (_a) {
    var _id = _a._id;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, jwt.sign({ _id: _id }, 'jwt')];
        });
    });
};
var createUserResponse = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {
                    user: lodash.pick(user, 'email', 'name')
                };
                return [4 /*yield*/, createToken({ _id: user._id })];
            case 1: return [2 /*return*/, (_a.token = _b.sent(),
                    _a)];
        }
    });
}); };

var register = function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var hasAllFields, isUserExists, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                hasAllFields = !!(request.email && request.password);
                return [4 /*yield*/, UserModel.findOne({ email: request.email }).exec()];
            case 1:
                isUserExists = !!(_b.sent());
                if (!(hasAllFields && !isUserExists)) return [3 /*break*/, 3];
                return [4 /*yield*/, createNewUser(request)];
            case 2:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                _a = errorOnRegister({ hasAllFields: hasAllFields, isUserExists: isUserExists });
                _b.label = 4;
            case 4: return [2 /*return*/, _a];
        }
    });
}); };
var createNewUser = function (_a) {
    var name = _a.name, email = _a.email, rawPassword = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        var password, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, hashPassword(rawPassword)];
                case 1:
                    password = _b.sent();
                    user = new UserModel({ name: name, email: email, password: password });
                    return [4 /*yield*/, user.save()];
                case 2:
                    _b.sent();
                    return [2 /*return*/, createUserResponse(user)];
            }
        });
    });
};
var errorOnRegister = function (_a) {
    var hasAllFields = _a.hasAllFields, isUserExists = _a.isUserExists;
    var type = ErrorTypes.REGISTER_FAILED;
    var message = !hasAllFields
        ? 'Fill all fields'
        : isUserExists
            ? 'User already exists'
            : 'Unknown error';
    return errorResponse(type, message);
};

var login = function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var hasAllFields, user, _a, validCredentials, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                hasAllFields = !!(request.email && request.password);
                if (!hasAllFields) return [3 /*break*/, 2];
                return [4 /*yield*/, UserModel.findOne({ email: request.email }).exec()];
            case 1:
                _a = _d.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = null;
                _d.label = 3;
            case 3:
                user = _a;
                if (!user) return [3 /*break*/, 5];
                return [4 /*yield*/, verifyPassword(user, request.password)];
            case 4:
                _b = _d.sent();
                return [3 /*break*/, 6];
            case 5:
                _b = false;
                _d.label = 6;
            case 6:
                validCredentials = _b;
                if (!(hasAllFields && validCredentials)) return [3 /*break*/, 8];
                return [4 /*yield*/, createUserResponse(user)];
            case 7:
                _c = _d.sent();
                return [3 /*break*/, 9];
            case 8:
                _c = errorOnLogin({ hasAllFields: hasAllFields, validCredentials: validCredentials });
                _d.label = 9;
            case 9: return [2 /*return*/, _c];
        }
    });
}); };
var errorOnLogin = function (_a) {
    var hasAllFields = _a.hasAllFields, validCredentials = _a.validCredentials;
    var type = ErrorTypes.LOGIN_FAILED;
    var message = !hasAllFields
        ? 'Fill all fields'
        : !validCredentials
            ? 'Invalid credentials'
            : 'Unknown error';
    return errorResponse(type, message);
};

typeGraphql.registerEnumType(ErrorTypes, { name: 'ErrorTypes' });
var AuthError = /** @class */ (function () {
    function AuthError() {
    }
    __decorate([
        typeGraphql.Field(function (type) { return ErrorTypes; }),
        __metadata("design:type", String)
    ], AuthError.prototype, "type", void 0);
    __decorate([
        typeGraphql.Field(),
        __metadata("design:type", String)
    ], AuthError.prototype, "message", void 0);
    AuthError = __decorate([
        typeGraphql.ObjectType()
    ], AuthError);
    return AuthError;
}());
var AuthPayload = /** @class */ (function () {
    function AuthPayload() {
    }
    __decorate([
        typeGraphql.Field(function (type) { return User; }, { nullable: true }),
        __metadata("design:type", User)
    ], AuthPayload.prototype, "user", void 0);
    __decorate([
        typeGraphql.Field({ nullable: true }),
        __metadata("design:type", String)
    ], AuthPayload.prototype, "token", void 0);
    __decorate([
        typeGraphql.Field(function (type) { return AuthError; }, { nullable: true }),
        __metadata("design:type", AuthError)
    ], AuthPayload.prototype, "error", void 0);
    AuthPayload = __decorate([
        typeGraphql.ObjectType()
    ], AuthPayload);
    return AuthPayload;
}());
var AuthRequest = /** @class */ (function () {
    function AuthRequest() {
    }
    __decorate([
        typeGraphql.Field(),
        __metadata("design:type", String)
    ], AuthRequest.prototype, "email", void 0);
    __decorate([
        typeGraphql.Field({ nullable: true }),
        __metadata("design:type", String)
    ], AuthRequest.prototype, "name", void 0);
    __decorate([
        typeGraphql.Field(),
        __metadata("design:type", String)
    ], AuthRequest.prototype, "password", void 0);
    AuthRequest = __decorate([
        typeGraphql.InputType()
    ], AuthRequest);
    return AuthRequest;
}());
var AuthResolvers = /** @class */ (function () {
    function AuthResolvers() {
    }
    AuthResolvers.prototype.login = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, login(request)];
            });
        });
    };
    AuthResolvers.prototype.register = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, register(request)];
            });
        });
    };
    __decorate([
        typeGraphql.Query(function (returns) { return AuthPayload; }),
        __param(0, typeGraphql.Arg('request')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [AuthRequest]),
        __metadata("design:returntype", Promise)
    ], AuthResolvers.prototype, "login", null);
    __decorate([
        typeGraphql.Mutation(function (returns) { return AuthPayload; }),
        __param(0, typeGraphql.Arg('request')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [AuthRequest]),
        __metadata("design:returntype", Promise)
    ], AuthResolvers.prototype, "register", null);
    AuthResolvers = __decorate([
        typeGraphql.Resolver()
    ], AuthResolvers);
    return AuthResolvers;
}());

var buildSchema = (function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeGraphql.buildSchema({
                    validate: false,
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
