var list = document.getElementById("list");

update();
setInterval(update, 1000);

function update()
{
    get("https://jsonblob.com/api/jsonBlob/56c3e68ee4b01190df4f7138", function (body)
    {
        list.innerHTML = "";
        var requested = JSON.parse(body);
        for (var i = 0; i < requested.length; i++)
        {
            var request = requested[i];
            var div = document.createElement("div");
            div.innerHTML = '<a target="_blank" href="https://www.youtube.com/watch?v=' + request.id + '">' + request.title + '</a> - ' + request.user + ' [' + request.rid + ']';
            list.appendChild(div);
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