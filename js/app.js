// Public Key
// fc0e2b2bcfc273962ce941db43aa2039

//Loader
$(function() {
  $(document).ajaxStart(function() {
    $('#loader').show();
    $('.title').fadeOut(800).addClass('hidden');
  });
  $(document).ajaxStop(function() {
    $('#loader').hide();
    $('.title').fadeIn(800).removeClass('hidden');
    $(".title").trigger('click');
  });
});

  //parallax fluff
  $(document).on('scroll', function(){
        if ($(document).scrollTop() > 70){
            $('.title').fadeOut();
        } else {
            $('.title').fadeIn();
        }
  });



//Collection for the Collage
$(function(){
var marvelAPI = 'https://gateway.marvel.com/v1/public/comics';
$.getJSON( marvelAPI, {
    limit: 43,
    apikey: 'dd82f49f3a2e7131b59861f87b4e40d5'
  }).done(function( response ) {
      var results = response.data.results;

        results.sort(function(){
          return 0.5 - Math.random();
        });

      var resultsLen = results.length;
      var output = '<ul>';

      for(var i=0; i < resultsLen; i++){
        if(results[i].images.length > 0) {
          var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
          output += '<li><img src="' + imgPath + '"></li>';
        }
      }
      output += '</ul>';
      $('#results').append(output);
  });
});

//Data
$(function data(){
var marvelAPI = 'https://gateway.marvel.com/v1/public/events';

var events = $('#events').val();
var order = $('#order').val();
var orderText = $('#order option:selected').text();

var media = $('#media').val();

      $('#events, #order, #media').on('change', function(e){
        e.stopImmediatePropagation();

        //clicks out input so user doesn't cause another load during load
        $(".title").trigger('click');

        $('#results2 > ul').remove();
        $('#results3 > ul').remove();
        $('.type').remove();
        $('.desc > h3').remove();
        $('.desc > p').remove();
        $('.feat > span > p').remove();
        $('.hc > h2').remove();
        console.log("test");
        data();
      });

$.getJSON( marvelAPI, {
    name: events, //Hooks into the dropdown
    limit: 99,
    apikey: 'dd82f49f3a2e7131b59861f87b4e40d5'
  }).done(function( response ) {
      var results = response.data.results;
      var resultsLen = results.length;

      var output = '<ul>';
      var title = '<h2>';
      var desc = '<h3>Description:</h3><p>';
      var feat = '<p style="display:inline;">';
      var typeTxt = '<span class="type">';

      //Char collector
      var characters = _.pluck(results["0"].characters.items, 'name');

      for (var y=0; y < characters.length; y++) {

        var featPath = characters[y];
        feat += featPath + '<span>,</span> ';

      }

      //collect event ID
      var helper;

      for(var i=0; i < resultsLen; i++){

          var imgPath = results[i].thumbnail.path + '/portrait_incredible.' + results[i].thumbnail.extension;
          var titlePath = results[i].title;
          var descPath = results[i].description;
          var urlPath;

          //For newer events Marvel does not add a wiki entry
          if(results[i].urls.length > 1){
            urlPath = results[i].urls[1].url;
          } else{
            urlPath = results[i].urls[0].url;
          }

          output += '<li><a href="' + urlPath + '" target="_blank"><img src="' + imgPath + '"></a></li>';
          desc += descPath;
          title += titlePath;
          typeTxt += orderText;

          //Event Id collection
          helper = results[i].id;
          console.log(helper);

          //comic iterator
          var comicPath = results[i].comics.available;
          for(var x=0; x < comicPath; x++){
            var comicArray = results[0].comics.items[x];
          }
      }
      typeTxt += '</span>';
      desc += '</p>';
      feat += '</p>';
      title += '</h2>';
      output += '</ul>';

      $('.type').append(typeTxt);
      //$('.hc').append(title);
      $('.desc').append(desc);
      $('.feat > span').append(feat);
      $('#results2').append(output);

      var marvelEvents = 'https://gateway.marvel.com/v1/public/events/' + helper + '/comics?format=' + media + '&noVariants=true&orderBy=' + order;

      $.getJSON( marvelEvents, {
          limit: 20, //Load Time Affected
          apikey: 'dd82f49f3a2e7131b59861f87b4e40d5'
        }).done(function(response){
          var results = response.data.results;
          var resultsLen = results.length;

          var output = '<ul>';

          for(var i=0; i < resultsLen; i++){

              var imgPath = results[i].thumbnail.path + '/portrait_incredible.' + results[i].thumbnail.extension;
              var titlePath = results[i].title;
              var descPath = results[i].description;
              var urlPath;

              //For newer events Marvel does not add a wiki entry
              if(results[i].urls.length > 1){
                urlPath = results[i].urls[1].url;
              } else{
                urlPath = results[i].urls[0].url;
              }

              output += '<li><a href="' + urlPath + '" target="_blank"><img src="' + imgPath + '"></a><br><p class="sub-title">' + titlePath + '</p></li>';
              desc += descPath;
              title += titlePath;
          }

          output += '</ul>';

          $('#results3').append(output);

        });
  });
});

// $(function creator(){
// var marvelAPI = 'https://gateway.marvel.com/v1/public/creators';
// var events = $('#events').val();
//
// $.getJSON( marvelAPI, {
//     events: helper, //hooks into events helper id
//     limit: 99,
//     apikey: 'dd82f49f3a2e7131b59861f87b4e40d5'
//   })
//     .done(function( response ) {
//       var results = response.data.results;
//       var resultsLen = results.length;
//       var creatorOutput = '<ul>';
//       for(var i=0; i < resultsLen; i++){
//           // creators
//           var creator = results[i].fullName;
//           creatorOutput += '<li>' + creator + '</li>';
//       }
//       creatorOutput += '</ul>';
//       $('.creator').append(creatorOutput);
//   });
// });
