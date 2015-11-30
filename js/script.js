
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    var streetStr = $('#street').val()
    var cityStr = $('#city').val()
    var address = streetStr + ',' + cityStr
    // load streetvie
    console.log(address)
    $greeting.text('So , you want to live at ' + address + '?')
    // YOUR CODE GOES HERE!
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ address + '&heading=151.78&pitch=-0.76';
    console.log(streetviewUrl)
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?='+ cityStr + '&sort=newest&api-key=871f02ec9fb07ffabcde7a5ba3582211:11:73621859'
    $.getJSON(nytimesUrl, function(data) {
      $nytHeaderElem.text('New York time articles about ' + cityStr )
      articles = data.response.docs
      for(var i=0;i<articles.length;i++) {
        var article = articles[i]
        $nytElem.append('<li class="article">'+ '<a href="' + article.web_url+'">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
      }
    })
    .error(function() {
      $nytHeaderElem.text('New York time articles Could Not we Show')
    })
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback'
    var wikiRequestTimeOut = setTimeout(function(){
      $wikiElem.append('failed to get wikipedia resources')
    }, 8000) 
    $.ajax({
      url: wikiUrl,
      dataType: 'jsonp',
      success: function(response) {
        var articleList = response[1]

        for(var i=0;i<articleList.length;i++) {
          articleStr = articleList[i] 
          var url = 'http://en.wikipedia.org/wiki/' + articleStr
          $wikiElem.append('<li><a href="'+ url +'">' + articleStr + '</a></li>') 
        }
      }
    })
    return false;
};

$('#form-container').submit(loadData);
