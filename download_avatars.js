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
        'Authorization' : 'Bearer ' + secret.GITHUB_TOKEN
      }
      
    };

    
  
    request(options, function(err, res, body) {
      let data = JSON.parse(body);

      // console.log(data)
      // console.log('type of body: ' +  body)
    

      cb(err, data);
    });
} //function getRepoContributors ends here.

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
  .pipe(fs.createWriteStream(filePath));
}

//main program starts here

var repoOwner = process.argv[2];
var repo = process.argv[3];

  if (repoOwner === undefined || repo === undefined) {
    console.log("Please provide RepoOwner and Repo as command line arguements");
    return;
  } else{
    getRepoContributors("jquery", "jquery", function(err, result) {
      console.log(result)
      result.forEach (function(user) {
        console.log("Avatar URL for " + user.login + ": " + user.avatar_url);
        var path = './avatars/' + user.login + '.jpg';
        downloadImageByURL(user.avatar_url, path)
      });
      
      // console.log("Result:", result);
    });

  }
 

 
  

  