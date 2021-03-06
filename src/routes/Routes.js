let Controller = require('../controllers/Controller')

// Routes
module.exports = function() {
    this.router = require('express').Router()
    this.controller = new Controller()
    
    this.init = function(port) {
        this.port = port
        this.controller.init()
        this.initRoutes(this)
    }

    this.startFreeboxAuthentication = function(callback) {
        this.controller.startFreeboxAuthentication((success) => {
            callback(success)
            // TEST REQUEST AFTER AUTH
            // if (success) {
            //     this.controller.testRequest((code) => {
            //         console.log(code)
            //     })
            // }
        })
    }

    this.checkUnauthorizedRequest = function(request) {
        if (request.headers.host != 'localhost:'+this.port) {
            request.status(401)
            request.send('unauthorized')
            return
        }
    }

    this.initRoutes = function(self) {
        self.router.get('/ping', function(req, res) {
            self.controller.handlePing(res)
        })
        self.router.get('/fbx/rights', function(req, res) {
            self.controller.handleCheckRights(res)
        })
        self.router.get('/fbx/auth', function(req, res) {
            self.controller.handleAuth(res)
        })
        self.router.get('/homebridge/restart', function(req, res) {
            self.controller.handleHomebridgeRestart(res)
        })
        self.router.get('/homebridge/conf', function(req, res) {
            self.controller.handleHomebridgeConf(res)
        })
        self.router.get('/homebridge/conf/alarm', function(req, res) {
            self.controller.handleHomebridgeConfWithAlarm(res)
        })
        self.router.get('/homebridge/conf/cam', function(req, res) {
            self.controller.handleHomebridgeConfWithCamera(res)
        })
        self.router.get('/homebridge/conf/full', function(req, res) {
            self.controller.handleHomebridgeConfFull(res)
        })
        self.router.get('/homebridge/clean', function(req, res) {
            self.controller.handleHomebridgeClean(res)
        })
        self.router.get('/node/list', function(req, res) {
            self.checkUnauthorizedRequest(req)
            self.controller.handleNodeList(res)
        })
        self.router.get('/node/:id', function(req, res) {
            self.checkUnauthorizedRequest(req)
            let nodeId = parseInt(req.params.id, 10)
            self.controller.handleNodeStatus(nodeId, res)
        })
        self.router.get('/alarm/main', function(req, res) {
            self.checkUnauthorizedRequest(req)
            self.controller.handleAlarmMain(res)
        })
        self.router.get('/alarm/secondary', function(req, res) {
            self.checkUnauthorizedRequest(req)
            self.controller.handleAlarmSecondary(res)
        })
        self.router.get('/alarm/off', function(req, res) {
            self.checkUnauthorizedRequest(req)
            self.controller.handleAlarmOff(res)
        })
        self.router.get('/alarm/home', function(req, res) {
            self.checkUnauthorizedRequest(req)
            self.controller.handleAlarmOff(res)
        })
        self.router.get('/alarm/target', function(req, res) {
            self.checkUnauthorizedRequest(req)
            self.controller.handleAlarmTarget(res)
        })
        self.router.get('/alarm/state', function(req, res) {
            self.checkUnauthorizedRequest(req)
            self.controller.handleAlarmState(res)
        })
        self.router.get('/log/server', function(req, res) {
            self.controller.handleServerLogs(res)
        })
        self.router.get('/log/server/error', function(req, res) {
            self.controller.handleServerErrorLogs(res)
        })
        self.router.get('/log/homebridge', function(req, res) {
            self.controller.handleHomebridgeLogs(res)
        })
        self.router.get('/log/homebridge/error', function(req, res) {
            self.controller.handleHomebridgeErrorLogs(res)
        })
    }
}