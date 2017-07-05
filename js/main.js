///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
$(document).ready(function() {
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
  var twitchUserName = ['johanmoney','sblindside','frogsama','vvarrenstudios',"thenutzxd",'jamaica105','michiganspartan','ritterriffic','kazzandrah','vexnextv','stonertrixx'];

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

  //Iterate through the array of usernames and call getTwitch
  twitchUserName.forEach(function(name) {
    getTwitch(name)
  });
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
  //Activate Nav Pills
  $(".selector").click(function() {
		var status = $(this).attr('id');
		if (status === "all-streams") {
			$(".online, .offline").show();
		} else if (status === "online") {
			$(".online").show();
			$(".offline").hide();
		} else {
			$(".offline").show();
			$(".online").hide();
		}
	})
  //Add Video to Top
  $('.card-link').click(function(){
		var iframeSrc = $(this).attr('src', video);
	})
});

//GET TWITCH API INFO
  function getTwitch(twitchUserName){
    $.ajax({
      type:"GET",
      url:"https://api.twitch.tv/kraken/streams/" + twitchUserName,
      headers:{
        'Client-ID': 'dhtxhmg8vey6qz5y964c3u15vmcssa'
      },
      success: function twitchData(data) {
        // Call 'streams' and if the channel is active, get stream data
        if(data.stream !== null){

          var streamImage = data.stream.preview.large;
          var streamGame = data.stream.game;
          var streamInfo = data.stream.channel.status;
          var streamLogo = data.stream.channel.logo;
          var streamURL = 'http://www.twitch.tv/'+ twitchUserName;
          var streamCard=" ";

          //IF EVERYTHING IS A SUCCESS IT BUILDS A STREAMCARD//

          streamCard = "<div class='theCard online col-xs-8 col-md-4 overlay'>" + "<a disabled class='card-link' href=" + streamURL + "><div class='card'>" + "<img class='img-fluid stream-cap' src='" + streamImage + "' alt='" + twitchUserName + " image capture'><span class='tag tag-success status-bar'>ONLINE</span>" + "<div class='card-block'>" + "<img class='round-logo img-responsive logo' src='" + streamLogo + "' alt='" + twitchUserName + "logo'>" + '<br>' + "<div class='text-padding'>" + "<h4 class='card-title'>" + twitchUserName.toUpperCase() + "</h4><p class='card-text'><strong>" + streamGame.toUpperCase() + ": </strong>" + streamInfo.toUpperCase() + "</p></div></div></div></a></div>";
          $(".card-container").append(streamCard);
       } else {
          // If the channel is offline, get channel data
          $.ajax({
            type:"GET",
            url:"https://api.twitch.tv/kraken/channels/" + twitchUserName,
            headers:{
              'Client-ID': 'dhtxhmg8vey6qz5y964c3u15vmcssa'
      },
            success: function(data){
              var streamBanner = data.video_banner;
              var streamLogo = data.logo;
              var streamError = data.status;
              var streamURL = 'http://www.twitch.tv/'+ twitchUserName;
              var streamCard = " ";

              //IF THERE IS NO CHANNEL INFO
              if (streamError == 404 || streamBanner == null || streamLogo == null){
                $.ajax({
                  type:"GET",
                  url:"https://api.twitch.tv/kraken/users/" + twitchUserName,
                  headers:{
                    'Client-ID': 'dhtxhmg8vey6qz5y964c3u15vmcssa'
      },
                  success: function(data){
                    var streamMessage = data.error;
                    // var streamBanner = data.video_banner;
                    var defaultImage = "https://media.giphy.com/media/l3q31122uBsO7hpmw/source.gif";
                    var defaultThumb = "https://media.giphy.com/media/l3q31122uBsO7hpmw/source.gif";
                    //IF ACCOUNT HAS BEEN CLOSED BUILD STREAMCARD
                    if(streamMessage == "Unprocessable Entity"){
                      streamCard = "<div class='theCard offline col-xs-8 col-md-4 overlay'>" + "<a disabled class='card-link' href=" + streamURL + "><div class='card'>" + "<img class='img-fluid stream-cap' src='" + defaultImage + "' alt='" + twitchUserName + " image capture'><span class='tag tag-default status-bar'>OFFLINE</span>" + "<div class='card-block'>" + "<img class='round-logo img-responsive logo' src='" + defaultThumb + "' alt='" + twitchUserName + "logo'>" + '<br>' + "<div class='text-padding'>" + "<h4 class='card-title'>" + twitchUserName.toUpperCase() + "</h4><p class='card-text'>This Twitch account has been closed.</p></div></div></div></a></div>";
                      $(".card-container").append(streamCard);
		                } else if (streamMessage == "Not Found"){
                        //IF IT NEVER EXISTED
                        streamCard = "<div class='theCard offline col-xs-8 col-md-4 overlay'>" + "<a disabled class='card-link' href=" + streamURL + "><div class='card'>" + "<img class='img-fluid stream-cap' src='" + defaultImage + "' alt='" + twitchUserName + " image capture'><span class='tag tag-default status-bar'>OFFLINE</span>" + "<div class='card-block'>" + "<img class='round-logo img-responsive logo' src='" + defaultThumb + "' alt='" + twitchUserName + "logo'>"+ '<br>' + "<div class='text-padding'>" + "<h4 class='card-title'>" + twitchUserName.toUpperCase() + "</h4><p class='card-text'>This Twitch account never existed.</p></div></div></div></a></div>";
                        $(".card-container").append(streamCard);
                    }else if (streamBanner == null && streamLogo == null){
                        //IF Banner AND  Logo don't Work
                        streamCard = "<div class='theCard offline col-xs-8 col-md-4 overlay'>" + "<a disabled class='card-link' href=" + streamURL + "><div class='card oro2'>" + "<img class='img-fluid stream-cap' src='" + defaultImage + "' alt='" + twitchUserName + " image capture'><span class='tag tag-default status-bar'>OFFLINE</span>" + "<div class='card-block'>" + "<img class='round-logo img-responsive logo' src='" + defaultThumb + "' alt='" + twitchUserName + "logo'>"+ '<br>' + "<div class='text-padding'>" + "<h4 class='card-title'>" + twitchUserName.toUpperCase() + "</h4><p class='card-text'>Not currently streaming.</p></div></div></div></a></div>";
                        $(".card-container").append(streamCard);
                    }
                    else if (streamBanner == null){
                        //IF Banner Doesn't Exist
                        streamCard = "<div class='theCard offline col-xs-8 col-md-4 overlay'>" + "<a disabled class='card-link' href=" + streamURL + "><div class='card oro2'>" + "<img class='img-fluid stream-cap' src='" + defaultImage + "' alt='" + twitchUserName + " image capture'><span class='tag tag-default status-bar'>OFFLINE</span>" + "<div class='card-block'>" + "<img class='round-logo img-responsive logo' src='" + defaultThumb + "' alt='" + twitchUserName + "logo'>"+ '<br>' + "<div class='text-padding'>" + "<h4 class='card-title'>" + twitchUserName.toUpperCase() + "</h4><p class='card-text'>Not currently streaming.</p></div></div></div></a></div>";
                        $(".card-container").append(streamCard);
                    }
                  }
                })
              } else { // If account exists, but user is not currently streaming, build streamCard

                streamCard = "<div class='theCard offline col-xs-8 col-md-4 overlay'>" + "<a disabled class='card-link' href=" + streamURL + "><div class='card'>" + "<img class='img-fluid stream-cap' src='" + streamBanner + "' alt='" + twitchUserName + " image capture'><span class='tag tag-default status-bar'>OFFLINE</span>" + "<div class='card-block'>" + "<img class='round-logo img-responsive logo' src='" + streamLogo + "' alt='" + twitchUserName + "logo'>"+ '<br>' + "<div class='text-padding'>" + "<h4 class='card-title'>" + twitchUserName.toUpperCase() + "</h4><p class='card-text'>Not currently streaming.</p></div></div></div></a></div>";
                $(".card-container").append(streamCard);
              }
            }
          })
        }
      }
    })

  }
