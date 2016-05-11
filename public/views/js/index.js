//index.js for index.hbs

$(document).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("lat: %s, lng: %s", position.coords.latitude, position.coords.longitude);

      $.post("/", {lat: position.coords.latitude, long: position.coords.longitude}, function(data){
          $("#tester")
            .append($("<div/>", {class: "mdl-card mdl-shadow--2dp"})
            .append($("<div/>", {class: "mdl-card__title"})
                .append($("<h2/>", {class: "mdl-card__title-text", text: data.temp.temp})
                  .append($("<span/>", {text: " Degrees Celsius"}))))
                  .append($("<div/>", {class: "mdl-card__supporting-text", text: data.weather[0].description}))
                .append($("<div/>", {class: "mdl-card__actions mdl-card--border"})
              .append($("<a/>", {class: "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect", text: data.wind.speed})
              .append($("<span/>", {text: "m/s"}))))
              .append($("<div/>", {class: "mdl-card__menu"})
                .append($("<button/>", {class: "mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"})
                  .append($("<i/>", {class: "material-icons", text: "places"})))));
      });
    });
  }

  function makeRelativeTime(rawDate){
    var recordedDate = new Date(rawDate);
    var currDate = new Date();

    var recordedDateMin = recordedDate.getMilliseconds() / (1000);
    var currDateMin = currDate.getMilliseconds()/(1000);
    var differenceInMin = Math.abs(recordedDateMin - currDateMin);
    return differenceInMin;
  }

  $.get("/news", function(data){
    console.log(data);

    $("#news")
      .append($("<table/>", {id: "newslist", class: "mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp"})
      .append($("<tbody/>", {id: "newslistcontainer"})));

    for(var i = 0; i < data.length; i++){
      $("#newslistcontainer")
        .append($("<tr/>")
          .append($("<td/>")
          .append($("<a/>", {href: data[i].url, target: "_blank",text: data[i].title})))
            .append($("<td/>", {text: data[i].source}))
            .append($("<td/>", {text: data[i].updatedAt.split("T")[0]})));
    }

  });

  $.get("/cl", function(roomlistings){
    console.log(roomlistings);

    $("#cl")
      .append($("<table/>", {id: "cllist", class: "mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp"})
      .append($("<tbody/>", {id: "cllistcontainer"})));

    function shortenString(text){
      return (text === "EMPTY DIMENSIONS") ? "n/a" : text;
    }

    roomlistings.map(function(room){
      $("#cllistcontainer").append($("<tr/>")
        .append($("<td/>").append($("<a/>", {href: room.url, text: room.title.substring(0,30)})))
        .append($("<td/>", {text: room.price}))
        .append($("<td/>", {text: shortenString(room.roomDim)}))
        .append($("<td/>", {text: room.area.substring(0,20)}))
        .append($("<td/>", {text: makeRelativeTime(room.date) + " seconds ago."}))
      );
    });
  });

  $.get("/reddit", function(threads){
    $("#reddit")
      .append($("<table/>", {id: "redditlist", class: "mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp"})
      .append($("<tbody/>", {id: "redditlistcontainer"})));

    threads.map(function(indivThread){
      var time = new Date(indivThread.time_created*1000).toLocaleString();
      $("#redditlistcontainer").append($("<tr/>")
        .append($("<td/>")
          .append($("<span/>", {text: indivThread.thread_score}))
          .append($("<br/>"))
          .append($("<span/>", {text: indivThread.num_comments})))
        .append($("<td/>", {text: (Math.round((indivThread.thread_score/indivThread.num_comments)*100)/100)}))
        .append($("<td/>")
          .append($("<span/>")
          .append($("<a/>", {href: "http://reddit.com"+indivThread.thread_link, text: indivThread.thread_title.substring(0,77)})))
          .append($("<br/>"))
          .append($("<a/>", {href: "http://" + indivThread.source_url, text: indivThread.source_url.split("/")[2]})))
        .append($("<td/>", {text: time })));
    });
  });
});
