var lastResponse = "";
var list = document.getElementById("song-list");
var playerContainer = document.getElementById("player-container");
var player;

update();
setInterval(update, 1000);

window.addEventListener("keydown", function (event)
{
    if (event.keyCode === 32 && player)
    {
        if (player.getPlayerState() === 1)
            player.pauseVideo();
        else
            player.playVideo();
    }
});

function update()
{
    get("https://jsonblob.com/api/jsonBlob/56c3e68ee4b01190df4f7138", function (body)
    {
        if (body !== lastResponse)
        {
            lastResponse = body;
            list.innerHTML = "";
            var requested = JSON.parse(body);
            for (var i = 0; i < requested.length; i++)
            {
                var request = requested[i];
                var tr = document.createElement("tr");
                tr.innerHTML = "<td>" + request.rid + "</td><td>" + request.title + "</td><td>" + formatLength(request.length) + "</td><td>" + request.user + "</td>";
                tr.addEventListener("click", function (id)
                {
                    player.loadVideoById(id);
                }.bind(null, request.id));
                list.appendChild(tr);
            }
        }
    })
}

function get(url, cb)
{
    var req = new XMLHttpRequest();
    req.onreadystatechange = function ()
    {
        if (req.readyState === 4 && req.status === 200)
        {
            cb(req.responseText);
        }
    };
    req.open("GET", url);
    req.send();
}

function formatLength(length)
{
    var minutes = Math.floor(length / 60);
    var seconds = ("0" + length % 60).slice(-2);
    return minutes + ":" + seconds;
}

function onYouTubeIframeAPIReady()
{
    var options = {
        width: 640,
        height: 360,
        videoId: "",
        events: {},
        playerVars: {
            showinfo: 0,
            rel: 0,
            controls: 1
        }
    };
    player = new YT.Player("player", options);
    playerContainer.style.height = "360px";
}