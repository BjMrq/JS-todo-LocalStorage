var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine", "ejs");


// Routes
// Index
app.get("/", function(req, res){
  res.redirect("/todo");
});

app.get("/todo", function(req, res){
  console.log("People here!");
  res.render("index");
});

// 404
app.get("*", function (req, res){
  res.send("404 sorry we didn't find what you where looking for, go back!");
});

// Listen
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server has started on port 3000! Let's go!");
});
