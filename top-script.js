var lastResponse = "";
var timeList = document.getElementById("time-list");
var pointList = document.getElementById("point-list");

update();
setInterval(update, 60000);

function update()
{
    get("https://gnome.firebaseio.com/top.json", function (body)
    {
        if (body !== lastResponse)
        {
            lastResponse = body;
            timeList.innerHTML = "";
            pointList.innerHTML = "";
            var i, tr;
            var top = JSON.parse(body);
            for (i = 0; i < top.time.length; i++)
            {
                tr = document.createElement("tr");
                tr.innerHTML = "<td>" + (i + 1) + "</td><td>" + top.time[i].user + "</td><td>" + formatTime(top.time[i].time) + "</td>";
                timeList.appendChild(tr);
            }
            for (i = 0; i < top.time.length; i++)
            {
                tr = document.createElement("tr");
                tr.innerHTML = "<td>" + (i + 1) + "</td><td>" + top.points[i].user + "</td><td>" + top.points[i].points + "</td>";
                pointList.appendChild(tr);
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