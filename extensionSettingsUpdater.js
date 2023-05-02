let darkModeCheckbox = document.querySelector("#container > div:nth-child(3) > label > input[type=checkbox]");
let gpaCalcCheckbox = document.querySelector("#container > div:nth-child(4) > label > input[type=checkbox]");
let hypoGradeCheckbox = document.querySelector("#container > div:nth-child(5) > label > input[type=checkbox]");

chrome.storage.local.get(["psDarkMode"], function(items){
    if(items["psDarkMode"]) {
        darkModeCheckbox.checked = true;
    }
});

chrome.storage.local.get(["psGPACalc"], function(items){
    if(items["psGPACalc"]) {
        gpaCalcCheckbox.checked = true;
    }
});


chrome.storage.local.get(["psHypoGradeCalc"], function(items){
    if(items["psHypoGradeCalc"]) {
        hypoGradeCheckbox.checked = true;
    }
});

darkModeCheckbox.onclick = function() {
    updateDarkModeSetting();
}

gpaCalcCheckbox.onclick = function() {
    updateGPACalcSetting();
}

hypoGradeCheckbox.onclick = function() {
    updateHypoGradeSetting();
}

function updateDarkModeSetting() {
    if(darkModeCheckbox.checked) {
        chrome.storage.local.set({ "psDarkMode": true }, function(){});
    } else {
        chrome.storage.local.set({ "psDarkMode": false }, function(){});
    }
}

function updateGPACalcSetting() {
    if(gpaCalcCheckbox.checked) {
        chrome.storage.local.set({ "psGPACalc": true }, function(){});
    } else {
        chrome.storage.local.set({ "psGPACalc": false }, function(){});
    }
}

function updateHypoGradeSetting() {
    if(hypoGradeCheckbox.checked) {
        chrome.storage.local.set({ "psHypoGradeCalc": true }, function(){});
    } else {
        chrome.storage.local.set({ "psHypoGradeCalc": false }, function(){});
    }
}