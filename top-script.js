var lastResponse = "";
var list = document.getElementById("top-list");

update();
setInterval(update, 60000);

function update()
{
    get("https://gnome.firebaseio.com/top.json", function (body)
    {
        if (body !== lastResponse)
        {
            lastResponse = body;
            list.innerHTML = "";
            var top = JSON.parse(body);
            for (var i = 0; i < top.time.length; i++)
            {
                var user = top.time[i];
                var tr = document.createElement("tr");
                tr.innerHTML = "<td>" + (i + 1) + "</td><td>" + user.user + "</td><td>" + formatTime(user.time) + "</td>";
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

function formatTime(time)
{
    if (time < 60) return time + "m";
    if (time < 1440) return Math.floor(time / 60) + "h " + time % 60 + "m";
    return Math.floor(time / 1440) + "d " + Math.floor((time % 1440) / 60) + "h " + time % 60 + "m";
}