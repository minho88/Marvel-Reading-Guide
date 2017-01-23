// Public Key
// fc0e2b2bcfc273962ce941db43aa2039

$(function(){
var marvelAPI = 'https://gateway.marvel.com/v1/public/comics';
$.getJSON( marvelAPI, {
    apikey: 'dd82f49f3a2e7131b59861f87b4e40d5'
  })
    .done(function( response ) {
      var results = response.data.results;
      var resultsLen = results.length;
      var output = '<ul>';

      for(var i=0; i<resultsLen; i++){
        if(results[i].images.length > 0) {
          var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
          output += '<li><img src="' + imgPath + '"><br>'+results[i].title+'</li>';
        }
      }
      output += '</ul>'
      $('#results').append(output);
  });

});
