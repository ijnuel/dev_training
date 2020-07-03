$(document).ready(function() {

    document.getElementById('TPLS').addEventListener('click', function() {
        document.getElementById("TPLS").setAttribute('class', 'select');
        document.getElementById("OTISP").setAttribute('class', 'unselect');
        document.getElementById('portal_abb').innerText = 'MGPS';
        document.getElementById('portal').innerText = 'Mesmerize Grazing and Permit\nSystem';
    });

    document.getElementById('OTISP').addEventListener('click', function() {
        document.getElementById("TPLS").setAttribute('class', 'unselect');
        document.getElementById("OTISP").setAttribute('class', 'select');
        document.getElementById('portal_abb').innerText = 'AISP';
        document.getElementById('portal').innerText = 'Agriculture Industry Service\nPortal';
    });

    var coll = document.getElementsByClassName("collapse");
    var i;
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            var content = this.nextElementSibling;
            if (content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }

    function autocomplete(inp, arr) {
        console.log(arr);
        var currentFocus;
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length; i++) {
                if (arr[i].toUpperCase().includes(val.toUpperCase(), 0)) {
                    if (i === 0 || i%2 === 0) {
                        b = document.createElement("DIV");
                        b.setAttribute('class', 'search_result');
                        const head = document.createElement("p");
                        head.setAttribute('class','head');
                        const body = document.createElement("p");
                        head.innerHTML = arr[i];
                        body.innerHTML = arr[i+1];
                        b.innerHTML = head.outerHTML+body.outerHTML;
                        b.innerHTML += "<input type='hidden' value='" + arr[i] + " " + arr[i+1] + "'>";
                        b.addEventListener("click", function(e) {
                            inp.value = this.getElementsByTagName("input")[0].value;
                            closeAllLists();
                        });
                    }
                    else {
                        b = document.createElement("DIV");
                        b.setAttribute('class', 'search_result');
                        const head = document.createElement("p");
                        head.setAttribute('class','head');
                        const body = document.createElement("p");
                        head.innerHTML = arr[i-1];
                        body.innerHTML = arr[i];
                        b.innerHTML = head.outerHTML+body.outerHTML;
                        b.innerHTML += "<input type='hidden' value='" + arr[i-1] +" " + arr[i] +  "'>";
                        b.addEventListener("click", function(e) {
                            inp.value = this.getElementsByTagName("input")[0].value;
                            closeAllLists();
                        });
                    }
                    a.appendChild(b);
                    i += 1;
                }
            }
        });
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) { //up
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });
        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }
        function closeAllLists(elmnt) {
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }

    var searches = ["OTSIP","Agriculture Industry Service Portal","OTSIP","Agriculture Industry Service Portal","OTSIP","Agriculture Industry Service Portal","TPLS","Mesmerize Grazing and Permit System","TPLS","Mesmerize Grazing and Permit System","TPLS","Mesmerize Grazing and Permit System"];
    autocomplete(document.getElementById('search'), searches);
});

function collapse(arrow) {
    if (document.getElementById(arrow).className === 'angle fa fa-angle-down') {
        document.getElementById(arrow).setAttribute('class', 'angle fa fa-angle-up');
    } else {
        document.getElementById(arrow).setAttribute('class', 'angle fa fa-angle-down');
    }
}