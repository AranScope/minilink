var backend_protocol = 'http://';
var backend_domain = 'localhost';
var backend_url = backend_protocol + backend_domain;

var longlink, shortlink;

$(document).ready(function() {
    longlink = $('#longlink');
    shortlink = $('#shortlink');
    shortlink.hide();
});

$(document).keyup(function(e) {
    if (e.which == 13) {
        console.log('enter hit');
        if (longlink.val().length > 0) {
            var id = get_id(2);

            var shortURL = backend_url + '/' + id;

            longlink.hide();
            shortlink.show();

            shortlink.html(backend_domain + '/' + id);
            shortlink.attr('href', shortURL);

            var data = {
                short: id,
                long: longlink.val()
            };

            $.ajax({
                type: "POST",
                url: backend_url + "/add",
                data: JSON.stringify(data),
                success: function(data) {
                    console.log('successful');
                },
                contentType: 'application/json'
            });

        }
    }
});

function get_id(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
