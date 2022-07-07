function lockHotKey(theEvent)
{
    //Lock Ctrl�BAlt
    if (event.ctrlKey || event.altKey )
    {
        event.returnValue=false;
    }
    // Lock F2 ~ F12
    else if (event.keyCode >=112 && event.keyCode <=123)
    {
        event.keyCode = 0;
        return false;
    }
}

function lockOther(theEvent)
{
    event.returnValue=false;
}
document.oncontextmenu=lockOther;
document.onselectstart=lockOther;
document.ondragstart=lockOther;
document.onkeydown = lockHotKey;
document.onhelp = function () {return false;}  //Lock F1