var sprintf = require('sprintf').sprintf;

var gaussian = module.exports = {};

function erfc(x)
{
    var z = Math.abs(x);
    var t = 1 / (1 + z / 2);
    var r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 +
            t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
            t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
            t * (-0.82215223 + t * 0.17087277)))))))));

    return (x >= 0) ? r : 2 - r;
}

function ierfc(x)
{
    if (x >= 2)
    {
        return -100;
    }
    if (x <= 0)
    {
        return 100;
    }

    var xx = (x < 1) ? x : 2 - x;
    var t = Math.sqrt(-2 * Math.log(xx / 2));

    var r = -0.70711 * ((2.30753 + t * 0.27061) /
            (1 + t * (0.99229 + t * 0.04481)) - t);

    for (var i = 0; i < 2; i++)
    {
        var err = erfc(r) - xx;
        r += err / (1.12837916709551257 * Math.exp(-(r * r)) - r * err);
    }

    return (x < 1) ? r : -r;
}

var Gaussian = gaussian.Gaussian = function(mean, variance)
{
    this.mean = mean ? mean : 0;
    this.variance = variance ? variance : mean / 3.0;

    this.standardDeviation = Math.sqrt(variance);
    this.precision = 1 / variance;
    this.precisionMean = this.precision * mean;
};

Gaussian.prototype.pdf = function(x)
{
    var m = this.standardDeviation * Math.sqrt(2 * Math.PI);
    var e = Math.exp(-Math.pow(x - this.mean, 2) / (2 * this.variance));
    return e / m;
};

Gaussian.prototype.cdf = function(x)
{
    var xx = erfc(-(x - this.mean) / (this.standardDeviation * Math.sqrt(2)));
    return 0.5 * xx;
};

Gaussian.prototype.ppf = function(x)
{
    return this.mean - this.standardDeviation * Math.sqrt(2) * ierfc(2 * x);
};

Gaussian.prototype.mul = function(d)
{
    return Gaussian.fromPrecisionMean(this.precision + d.precision, this.precisionMean + d.precisionMean);
};

Gaussian.prototype.div = function(d)
{
    return Gaussian.fromPrecisionMean(this.precision - d.precision, this.precisionMean - d.precisionMean);
};

Gaussian.prototype.toString = function()
{
    return sprintf('%.1f (%.2f)', this.mean, this.variance);
};

Gaussian.fromPrecisionMean = function(precision, precisionMean)
{
    var mean = precisionMean / precision;
    var variance = 1 / precision;
    return new Gaussian(mean, variance);
};
