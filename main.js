const express = require("express");
const httpProxy = require("http-proxy");
const app = express();
const proxy = httpProxy.createProxyServer();

app.all("/user/*", function (req, res) {
  console.log("Redirecting to user service");
  proxy.web(req, res, {
    target: "http://localhost:80",
  });
});

app.all("/chat/*", function (req, res) {
  console.log("Redirecting to chat service");
  proxy.web(req, res, {
    target: "http://localhost:81",
  });
});

app.all("/*", function (req, res) {
  console.log("Redirecting to socket");
  proxy.web(req, res, {
    target: "http://localhost:3000",
  });
});

app.listen(8080);
