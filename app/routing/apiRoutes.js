const fs = require("fs");
const friends = require("../data/friends");
const express = require("express");
var app = express();

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var duplicates = friends.filter(function (f) {
            return f.name == req.body.name;
        });
        if (duplicates.length === 0) {
            var match = compareScoring(req.body.scores);            
            friends.push(req.body);
            res.json(match);
        } else {
            res.json({
                name: "Sorry, the name " + duplicates[0].name + " is already used",
                photo: "https://cdn4.iconfinder.com/data/icons/dot/256/man_person_mens_room.png",
                scores: [1,1,1,1,1,1,1,1,1,1]
            });
        }
    });

    var compareScoring = function(scores) {
        var closestScore = 50;
        var closestMatch;
       friends.forEach(function(f) {
           var diff = 0;
            for (let i = 0; i < f.scores.length; i++) {
                diff = Math.abs(scores[i] - f.scores[i]);                
            }
            if(diff < closestScore) {
                closestMatch = f;
            }
       });
       return closestMatch;
    };

};