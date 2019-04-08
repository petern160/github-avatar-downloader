var request = require('request');
var secret = require('secret.js')

// console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization' : 'Bearer ' + secret.GITHUB_TOKEN
      }
      
    };
  
    request(options, function(err, res, body) {
      cb(err, body);
    });
  }
getRepoContributors("lighthouse-labs", "assessment-exam-student", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
  });

  