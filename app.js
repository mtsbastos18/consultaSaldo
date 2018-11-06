var cheerio = require("cheerio");
var querystring = require("querystring");
var request = require("request");
var express = require("express"); // Web Framework
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

// Start server and listen on http://localhost:8081/
var server = app.listen(8081, function() {
  var host = "127.0.0.1"; //server.address().address
  var port = server.address().port;

  console.log("Aplicação de verificação de saldo http://%s:%s ...", host, port);
});

app.post("/", function(req, res) {
  var form = {
    campoLogin: req.body["login"],
    senha: req.body["senha"]
  };

  var formData = querystring.stringify(form);
  var contentLength = formData.length;
  request(
    {
      headers: {
        "Content-Length": contentLength,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      uri:
        "https://portador.banricard.com.br/banricard/LoginModuloCliente?acao=login",
      body: formData,
      method: "POST"
    },
    function(err, response, body) {
      var $ = cheerio.load(body);

      var saldoDisponivel = $("#disponivel").val();
      res.json(saldoDisponivel);
    }
  );
});
