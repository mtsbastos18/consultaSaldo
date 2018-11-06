var cheerio = require("cheerio");
var querystring = require("querystring");
var request = require("request");
var express = require("express"); // Web Framework
var app = express();

// Start server and listen on http://localhost:8081/
var server = app.listen(8081, function() {
  var host = "127.0.0.1"; //server.address().address
  var port = server.address().port;

  console.log("Aplicação de verificação de saldo http://%s:%s ...", host, port);
});

var form = {
  campoLogin: "6087180031011531",
  senha: "Mateus1807"
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
  function(err, res, body) {
    var $ = cheerio.load(body);

    var saldoDisponivel = $("#disponivel").val();

    console.log("Saldo Disponível: " + saldoDisponivel);
  }
);
