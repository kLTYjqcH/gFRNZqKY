const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');
const chef = require("cyberchef");
const other_page = fs.readFileSync('./other.ejs', 'utf8');

var server = http.createServer(getFromClient);

server.listen(3001);
console.log('Server start. end:Ctl+C');


function getFromClient(request,response){
    var url_parts = url.parse(request.url, true);
    switch (url_parts.pathname){
        case '/':
                response_index(request,response);
                break;

        case '/other':
                response_other(request,response);
                break;
        case '/style.css':
                response.writeHead(200, {'Content-Type':'text/css'});
                response.write(style_css);
                response.end();
                break;
        case '/frombase64':
                var content = "fromBase64:"
                var query = url_parts.query;
                if(query.msg != undefined){
                    var query_obj =
                    content = chef.fromBase64(query.msg);
                }
                var content = ejs.render(index_page, {
                    titleHead:"Index Head",
                    titleBody:"Index Body",
                    content:content,
                });
                respons.writeHead(200, {'Content-Type':'text/html'});
                respons.write(content);
                respons.end();
                break;
        case '/tobase64':
                var content = "toBase64:"
                var query = url_parts.query;
                if(query.msg != undefined){
                    var query_obj =
                    content = chef.toBase64(query.msg);
                }
                var content = ejs.render(index_page, {
                    titleHead:"Index Head",
                    titleBody:"Index Body",
                    content:content,
                });
                respons.writeHead(200, {'Content-Type':'text/html'});
                respons.write(content);
                respons.end();
                break;
        default:
                response.writeHead(200, {'Content-Type':'text/plain'});
                response.end('no page');
                break;


    }  
}

function response_index(request,response){
    var msg = chef.toBase64("Indexpage");
    var content = ejs.render(index_page, {
        title:"Index",
        content:"key:vad5jvt52k59rspa,vi:c9fx8mqjjxwkikub",
    });
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(content);
    response.end();
}

function response_other(request,response){
    var msg = "Otherpage"
    if (request.method == 'POST'){
        var body = '';
        request.on('data', (data) => {
            body += data;
        });
        request.on('end',() => {
            var post_data = qs.parse(body);
            msg += 'ああああああ' + post_data.msg + 'おおおおおおおおおおおお';
            var content = ejs.render(other_page, {
                title:"Other",
                content:msg,
            });
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(content);
        response.end();
        });
    }
}