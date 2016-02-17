var list = document.getElementById("song-list");
var lastResponse = "";

update();
setInterval(update, 1000);

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