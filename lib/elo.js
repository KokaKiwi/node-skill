var sprintf = require('sprintf').sprintf;

var elo = module.exports = {};

elo.K = 32;
elo.FACTOR = 400;

elo.LOSS = 0;
elo.DRAW = 0.5;
elo.WIN = 1;

function averageValue(arr)
{
    var value = 0;
    for (var i in arr)
    {
        value += arr[i].value;
    }
    return value / arr.length;
}

var Rating = elo.Rating = function(value)
{
    this.value = value;
};

Rating.prototype.calculateChange = function(opponent, result)
{
    var diff = opponent.value - this.value;
    var percent = 1 / (1 + Math.pow(10, diff / elo.FACTOR));
    var change = elo.K * (result - percent);
    return change;
};

Rating.prototype.toString = function()
{
    return sprintf('%.1f', this.value);
}

elo.updateRatings = function(players, ranks)
{
    var scores = [];
    for (var i in players)
    {
        var player = players[i];
        if (player instanceof Array)
        {
            scores.push(new Rating(averageValue(player)));
        }
        else
        {
            scores.push(new Rating(player.value));
        }
    }
    for (var i in scores)
    {
        var score = scores[i];
        for (var j in scores)
        {
            if (j != i)
            {
                var result = elo.DRAW;
                if (ranks[i] < ranks[j])
                    result = elo.WIN;
                else if (ranks[i] > ranks[j])
                    result = elo.LOSS;
                var change = score.calculateChange(scores[j], result);
                var player = players[i];
                if (player instanceof Array)
                {
                    for (var k in player)
                    {
                        player[k].value += change;
                    }
                }
                else
                {
                    player.value += change;
                }
            }
        }
    }
};
