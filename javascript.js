$(document).ready(function(){
  $('#meetups').submit(function(event){
    getMeetups($('#topic').val(), $('#zipcode').val())
    return false;
  });
});

function getMeetups(topic, zipcode){
  var api_key = "get_your_own";
  var url = "https://api.meetup.com/2/";
  var method = "open_events"
  $.ajax({
    url: url + method,
    data: {key: api_key, zip: zipcode,topic: topic},
    crossDomain: true,
    dataType: 'jsonp',
    type: "GET",
    success: function (data) {
      parseMeetups(data.results)
    },
    error: function(data) {
      console.log("Error", data);
    }
  });
}

function parseMeetups(results){
  for(var i = 0; i < results.length; i ++){
    var div = $('<div></div>');
    var name = $('<div> Name: '+ results[i].name+'</div>');
    var description = $('<div> Description: '+ results[i].description+'</div>');
    var group = $('<div> Group: '+ results[i].group.name+'</div>');
    var link = $('<div> Learn More: <a href ="'+results[i].event_url+'" target = "_blank">'+results[i].event_url+'</a></div>')
    div.append(name, description, group, link);
    $('#events').append(div);
  }
}
