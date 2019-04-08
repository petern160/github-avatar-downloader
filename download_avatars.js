var request = require('request');

// gets secret.js 'FILE NAME'
var secret = require('./secret.js');
// require file system
var fs = require('fs')

// console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        // authorizaion header asking for key secret.GITHUB_TOKEN accesses the value direct from secret.js
        'Authorization' : secret
      }
      
    };

    
  
    request(options, function(err, res, body) {

      // console.log('type of body: ' +  body)
      
      cb(err, JSON.parse(body));
    });
  }
getRepoContributors("jquery", "jquery", function(err, result) {
    console.log(result)
    // downloadImageByURL()
    // console.log("Result:", result);
  });

  function downloadImageByURL(url, filePath) {
    request.get(url)
    .on('error', function(error){
      throw err;

    })
    .on('response', function(response){
      console.log('the response status code is: ' + response.statusCode);
    })

    .on('end', function(end){
      console.log('ended here')
    })
    .pipe(fs.createWriteStream('./avatar_http.jpg'));
  }
  
  downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")