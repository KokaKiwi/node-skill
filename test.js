#!/usr/bin/env node

var skill = require('./index'),
    trueskill = skill.trueskill,
    elo = skill.elo;

var kiwi = new elo.Rating(100.0);
var john = new elo.Rating(2000.0);
var jean = new elo.Rating(125.0);
var kapoue = new elo.Rating(125.0);
var lol = new elo.Rating(125.0);
var coin = new elo.Rating(360.0);

var team_red = [kiwi, john, jean];
var team_blue = [kapoue, lol];
var team_purple = [coin];

function showTeam(team, name)
{
    console.log('Team ' + name + ':');
    for (var i in team)
    {
        console.log('  Player ' + (i * 1 + 1) + ': ' + team[i].toString());
    }
}

showTeam(team_red, 'red');
showTeam(team_blue, 'blue');
showTeam(team_purple, 'purple');

elo.updateRatings([team_red, team_blue, team_purple], [3, 2, 1]);

console.log('');
showTeam(team_red, 'red');
showTeam(team_blue, 'blue');
showTeam(team_purple, 'purple');

var kiwi2 = new elo.Rating(1250.0);
var john2 = new elo.Rating(2000.0);

console.log('');
console.log('Kiwi: ' + kiwi2);
console.log('John: ' + john2);

elo.updateRatings([kiwi2, john2], [1, 1]);

console.log('');
console.log('Kiwi: ' + kiwi2);
console.log('John: ' + john2);
