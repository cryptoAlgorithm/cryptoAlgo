function openCity(a,b){var c,d,e;for(d=document.getElementsByClassName("tabcontent"),c=0;c<d.length;c++)d[c].style.display="none";for(e=document.getElementsByClassName("tablinks"),c=0;c<e.length;c++)e[c].className=e[c].className.replace(" active","");document.getElementById(b).style.display="block",a.currentTarget.className+=" active"}