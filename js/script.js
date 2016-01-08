function switchVideo(videoSrc) {
    videoSrc = 'http://' + videoSrc;
    document.getElementById('FeaturedVideoID').src = videoSrc;
}
function onGoogleLoad() {
    gapi.client.setApiKey('YOUR_APIKEY');
    gapi.client.load('youtube', 'v3', function() {

        var request = gapi.client.youtube.playlistItems.list({
            part: 'snippet',
            playlistId: 'PLAYLIST_ID_TO_PULL',
            maxResults: 50
        });

        request.execute(function(response) {

            var container = $(".responsive-video-list");
            if(!container[0]) {
              container = $("<div class='responsive-video-list' />")
              $(".bodytext .description").append(container);
            }

            container.append("<div class=\"featured-video\"><iframe width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/"+ response.items[0].snippet.resourceId.videoId+"?autoplay=0&amp;rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autohide=1\" frameborder=\"0\" allowfullscreen id=\"FeaturedVideoID\"></iframe></div>")


            var containerlist = $("<ul />");
            container.append(containerlist);

            for (var i = 0; i < response.items.length; i++) {
                console.log(response.items[i].snippet.title + " published at " + response.items[i].snippet.publishedAt)

                containerlist.append("<li><a onclick=\"switchVideo('www.youtube.com/embed/"+ response.items[i].snippet.resourceId.videoId+"?autoplay=1&amp;rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autohide=1');\" href=\"javascript:void(0);\"> <img src=\"http://img.youtube.com/vi/"+ response.items[i].snippet.resourceId.videoId+"/0.jpg\">"+response.items[i].snippet.title+"</a></li> ");
            }
        });
    });
}
