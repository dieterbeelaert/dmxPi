/**
 * Created with JetBrains WebStorm.
 * User: Dieter Beelaert
 * Date: 16/03/14
 * Time: 16:28
 * To change this template use File | Settings | File Templates.
 */

function Context(req){
    this.params = {};

//querystring
    for(var q in req.query){
        if(req.query.hasOwnProperty(q)){
            this.params[q] = req.query[q];
        }
    }

//post data
    for(var b in req.body){
        if(req.body.hasOwnProperty(b)){
            this.params[b] = req.body[b];
        }
    }
}

Context.prototype.getParam = function(paramName){
    return this.params[paramName] || "";
}

Context.prototype.setParam = function(paramName, param){
    this.params[paramName] = param;
}

module.exports = Context;
