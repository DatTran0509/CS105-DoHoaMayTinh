import { Painter } from "./dda.js";
import { PainterBre } from "./bresenham.js";
import { PainterMid } from "./midpoint.js";
var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");


var width=800;
var height=600;

var bgRgba=[240,240,200,255];
var pointRgba=[0,0,255,255];
var lineRgba=[38,38,99,255];
var vlineRgba= [101,96,194,255];

var select = document.getElementById("algo-sel");
select.onchange = function(event) { doSelectionChange(event)};

var painterDDA=new Painter(context, width, height, lineRgba, vlineRgba);
var painterMid = new PainterMid(context, width, height, lineRgba, vlineRgba);
var painterBre = new PainterBre(context, width, height, lineRgba, vlineRgba);

var painter = painterDDA;
function doSelectionChange(e)
{
    var x = e.target.value;
    if (x == 1)
    {
        painter = painterDDA;
    }
    if (x == 3)
    {
        painter = painterMid;
    }
    if (x == 2)
    {
        painter = painterBre;  
    }
}

canvas.setAttribute("width",width);
canvas.setAttribute("height",height);

function getPosOnCanvas(x, y)
{
        var bbox = canvas.getBoundingClientRect();
        return [Math.floor(x - bbox.left * (canvas.width / bbox.width)+0.5),
                Math.floor(y - bbox.top * (canvas.height / bbox.height)+0.5)];
};

var state = 0;
function doMouseMove(e)
{
        if (state==0 || state==2)
        {return;}
        var p = getPosOnCanvas(e.clientX, e. clientY);
        painter.draw(p);
};


function doMouseDown(e)
{
        if (state==2 || e.button!=0)
        {
            return;
        }
        var p = getPosOnCanvas (e.clientX, e.clientY);
        painter.addPoint(p);
        painter.draw(p);
        if (state == 0)
        {
            state=1;
        }
};
function doKeyDown(e)
{
        if (state ==2) { return;}
        var keyId = e.keyCode ? e.keyCode : e.which;
        if (keyId ==27 && state ==1)
        {
            state=2;
            painter.draw (painter.point[painter.point.length-1]);
        }
};


canvas.onmousemove = function(event) {doMouseMove(event)};
canvas.onmousedown = function(event) {doMouseDown(event)};
document.onkeydown = function(event) {doKeyDown(event)};
