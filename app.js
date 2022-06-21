const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//this line asks express to start using ejs module that we installed
//we need to create a folder "views" where we store a .ejs file that will store
// a html template of the page which we want 
app.set('view engine', 'ejs');
app.use(express.static("public"));

var items=["List1", "List2", "List3"];
var works=[];

app.get("/", function(req,res){
    
    //date and day can be extracted like this...
    var date=new Date();
    var currday=date.getDay();
    var day="";
    switch(currday){
        case 0:day="Sunday";
            break;
        case 1:day="Monday";
            break;
        case 2:day="Tuesday";
            break;
        case 3:day="Wednesday";
            break;
        case 4:day="Thursday";
            break;
        case 5:day="Friday";
            break;
        case 7:day="Saturday";
            ;
        default:;
            break;
    }

    var today=new Date();
    //type of format in which we want the date
    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    var day=today.toLocaleDateString("en-us", options);
    
    //this line looks for "list.ejs" file in views folder and send all variable of "dayinlist" with "day" of this file
    res.render("list",{listTitle:day, lists:items})
})

app.get("/work", function(req,res){
    //"/work" will render same list.ejs but with different values of arrays as notes
    res.render("list",{listTitle: "Work",lists:works})
})

app.post("/", function(req,res){
    var item=req.body.new;
    
    //we can use that pair in submit button to decide on which array and on whiuchb page bwill it gwt updated 
    if(req.body.list==="Work"){
        works.push(item);
        //we can't use the following line because we also want to send it to home page where the newly added this gets added up at the bottom of the list
        //res.send(item);

        //instead we can redirect it to "get" page where res.render() is present to send this newly added item
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }    
})

app.listen(3000, function(){
    console.log("SERVER running..!")
})