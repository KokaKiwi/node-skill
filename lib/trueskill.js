var Gaussian = require('./gaussian').Gaussian,
    sprintf = require('sprintf').sprintf;

var trueskill = module.exports = {};

trueskill.Rating = function(mu, sigma)
{
    this.mu = mu;
    this.sigma = sigma;
};

trueskill.Rating.prototype.toString = function()
{
    return sprintf('%.1f (%.2f)', this.mu, this.sigma);
};

trueskill.updateRatings = function(teams, ranks)
{

};
