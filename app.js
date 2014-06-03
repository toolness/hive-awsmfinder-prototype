var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

var app = express();
var geocodes = {};

var DEBUG = true;
var PORT = process.env.PORT || 3000;
var GOOGLE_GEOCODING_API_KEY = process.env.GOOGLE_GEOCODING_API_KEY || '';
var BLOGPOST_URL = 'http://hivenyc.org/2014/04/23/summer-2014-program-opportunities/';
var CLIENT_CONFIG = {
  GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  GA_HOSTNAME: process.env.GA_HOSTNAME
};
var GEO_COMPONENT_FILTERS = [
  'country:US',
  'administrative_area:NY'
].join('|');

function getArticle($) {
  var article = $('article');
  $('header, footer, script, .social-share, .tags, ' +
    '.blog-navigation', article).remove();
  return article;
}

function geocode(address, cb) {
  if (address in geocodes)
    return process.nextTick(cb.bind(null, null, geocodes[address]));

  // https://developers.google.com/maps/documentation/geocoding/
  request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    qs: {
      key: GOOGLE_GEOCODING_API_KEY,
      address: address,
      sensor: 'false',
      components: GEO_COMPONENT_FILTERS
    }
  }, function(err, geoRes, body) {
    if (err) return cb(err);
    if (geoRes.statusCode != 200)
      return cb(new Error('got http ' + geoRes.statusCode));
    body = JSON.parse(body);
    if (body.status != 'OK') return cb(new Error(body.status));
    var result = body.results[0];
    var location = result.geometry.location;
    location.formatted_address = result.formatted_address;
    geocodes[address] = location;
    cb(null, geocodes[address]);
  });
}

app.use('/', function(req, res, next) {
  res.cookie('config', JSON.stringify(CLIENT_CONFIG));
  next();
});

app.get('/afterschool-programs.json', function(req, res, next) {
  request.get(BLOGPOST_URL, function(err, blogRes, body) {
    if (err) return next(err);
    if (blogRes.statusCode != 200)
      return next(new Error('got http ' + blogRes.statusCode));
    var $ = cheerio.load(body);
    var article = getArticle($);
    var addresses = article.find('.hive-address').map(function() {
      return $(this).text().trim();
    });

    async.each(addresses, geocode, function(err) {
      if (err) return next(err);

      return res.send({
        programs: article.html(),
        geocodes: geocodes
      });
    });
  });
});

app.use(express.static(__dirname + '/static'));

app.use(function(err, req, res, next) {
  if (typeof(err) == 'number')
    return res.type('text/plain').send(err);
  if (typeof(err.status) == 'number')
    return res.type('text/plain').send(err.status, err.message);
  var stack = err.stack || err.toString();
  process.stderr.write(stack);
  res.type('text')
    .send(500, DEBUG ? stack : 'Sorry, something exploded!');
});

app.listen(PORT, function() {
  console.log("listening on port " + PORT);
});
