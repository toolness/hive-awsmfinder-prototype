#!/usr/bin/env node

var fs = require('fs');
var request = require('request');
var async = require('async');
var cheerio = require('cheerio');

var GEO_COMPONENT_FILTERS = [
  'country:US|administrative_area:NY'
].join('|');

var geocodes = fs.existsSync('geocodes.json') ? require('../geocodes.json')
                                              : {};
var html = fs.readFileSync('afterschool-programs.html', 'utf-8');
var $ = cheerio.load(html);

// https://developers.google.com/maps/documentation/geocoding/
function geocode(address, cb) {
  request({
    url: 'http://maps.googleapis.com/maps/api/geocode/json',
    qs: {
      address: address,
      sensor: 'false',
      components: GEO_COMPONENT_FILTERS
    }
  }, function(err, res, body) {
    if (err) return cb(err);
    body = JSON.parse(body);
    if (body.status != 'OK') return cb(new Error(body.status));
    var result = body.results[0];
    var location = result.geometry.location;
    location.formatted_address = result.formatted_address;
    cb(null, location);
  });
}

var lookups = [];

$('.hive-address').each(function() {
  var address = this.text().trim();

  if (address in geocodes) return;

  lookups.push(function(cb) {
    geocode(address, function(err, info) {
      if (err)
        return cb(new Error('geocoding ' + JSON.stringify(address) +
                            ' resulted in ' + err.message));
      console.log("geocoded", address, "(" + info.formatted_address + ")");
      geocodes[address] = info;
      cb(null);
    });
  });
});

async.parallelLimit(lookups, 3, function(err) {
  if (err) throw err;
  fs.writeFileSync('geocodes.json', JSON.stringify(geocodes, null, 2));
  console.log("wrote geocodes.json");
});
