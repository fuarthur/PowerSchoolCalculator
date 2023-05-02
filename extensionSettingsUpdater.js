let darkModeCheckbox = document.querySelector("#container > div:nth-child(3) > label > input[type=checkbox]");
let gpaCalcCheckbox = document.querySelector("#container > div:nth-child(4) > label > input[type=checkbox]");
let hypoGradeCheckbox = document.querySelector("#container > div:nth-child(5) > label > input[type=checkbox]");

chrome.storage.local.get(["psDarkMode"], function (items) {
    if (items["psDarkMode"]) {
        darkModeCheckbox.checked = true;
    }
});

chrome.storage.local.get(["psGPACalc"], function (items) {
    if (items["psGPACalc"]) {
        gpaCalcCheckbox.checked = true;
    }
});


chrome.storage.local.get(["psHypoGradeCalc"], function (items) {
    if (items["psHypoGradeCalc"]) {
        hypoGradeCheckbox.checked = true;
    }
});

darkModeCheckbox.onclick = function () {
    updateDarkModeSetting();
}

gpaCalcCheckbox.onclick = function () {
    updateGPACalcSetting();
}

hypoGradeCheckbox.onclick = function () {
    updateHypoGradeSetting();
}

function updateDarkModeSetting() {
    if (darkModeCheckbox.checked) {
        chrome.storage.local.set({"psDarkMode": true}, function () {
        });
    } else {
        chrome.storage.local.set({"psDarkMode": false}, function () {
        });
    }
}

function updateGPACalcSetting() {
    if (gpaCalcCheckbox.checked) {
        chrome.storage.local.set({"psGPACalc": true}, function () {
        });
    } else {
        chrome.storage.local.set({"psGPACalc": false}, function () {
        });
    }
}

function updateHypoGradeSetting() {
    if (hypoGradeCheckbox.checked) {
        chrome.storage.local.set({"psHypoGradeCalc": true}, function () {
        });
    } else {
        chrome.storage.local.set({"psHypoGradeCalc": false}, function () {
        });
    }
}

function saveWeights() {
    chrome.storage.sync.set({
        'quarterExamsWeight': document.querySelector("#quarterExams").value,
        'classAndHomeWorkWeight': document.querySelector("#classAndHomeWork").value,
        'testsAndQuizzesWeight': document.querySelector("#testsAndQuizzes").value,
        'classParticipationWeight': document.querySelector("#classParticipation").value
    });
}

function loadWeights() {
    chrome.storage.sync.get(['quarterExamsWeight', 'classAndHomeWorkWeight', 'testsAndQuizzesWeight', 'classParticipationWeight'], function (weights) {
        document.querySelector("#quarterExams").value = weights.quarterExamsWeight || 0.4;
        document.querySelector("#classAndHomeWork").value = weights.classAndHomeWorkWeight || 0.2;
        document.querySelector("#testsAndQuizzes").value = weights.testsAndQuizzesWeight || 0.3;
        document.querySelector("#classParticipation").value = weights.classParticipationWeight || 0.1;
    });
}

document.querySelectorAll("input[type='number']").forEach(input => {
    input.addEventListener('change', saveWeights);
});

loadWeights();