chrome.storage.local.get(["psDarkMode"], function(items){
    if(items["psDarkMode"]) {
        let body = document.getElementsByTagName("body")[0]
        
        body.style.backgroundColor = "black";
        body.style.color = "white";
        
        let gradesTab = document.querySelector("#nav-secondary > li");
        gradesTab.style.backgroundColor = "black";
        document.querySelector("#nav-secondary > li > a").style.color = "white";
        
        document.querySelector("#content-main > div.box-round").style.border = "1px solid #000000";
        
        let tableEvens = document.querySelectorAll("tr:nth-child(even)>td");
        for(let i = 0; i < tableEvens.length; i++) {
            tableEvens[i].style.backgroundColor = "black";
            tableEvens[i].style.color = "white";
        }
        
        let tableOdds = document.querySelectorAll("table.grid tbody tr:nth-child(odd)>td, table.linkDescList tbody tr:nth-child(odd)>td, table.zebra tbody tr:nth-child(odd)>td");
        for(let i = 0; i < tableOdds.length; i++) {
            tableOdds[i].style.backgroundColor = "#011119";
            tableOdds[i].style.color = "white";
        }
        
        let headerRows = document.querySelectorAll("th, td.th, tableEvens.grid td.th, tableEvens.grid tbody tr:nth-child(odd)>td.th, tableEvens.grid tbody.tbody tr:nth-child(odd) th.th");
        for(let i = 0; i < headerRows.length; i++) {
            headerRows[i].style.backgroundColor = "#00334a";
            headerRows[i].style.color = "white";
        }
        
        document.querySelector("#nav-main").style.color = "#444"; //fix sidebar header text
        document.querySelector("#header").style.color = "black"; //fix header text color
    }
});