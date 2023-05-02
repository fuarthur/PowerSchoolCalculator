chrome.storage.local.get(["psHypoGradeCalc"], function (items) {
    if (items["psHypoGradeCalc"]) {
        let gradeEdited = false;
        let firstRun = true;

        function calculateGrade() {
            return new Promise((resolve) => {
                chrome.storage.sync.get(['quarterExamsWeight', 'classAndHomeWorkWeight', 'testsAndQuizzesWeight', 'classParticipationWeight'], function (weights) {
                    let categoryWeights = {
                        "Quarter Exams 期中期末考试": parseFloat(weights.quarterExamsWeight),
                        "Class and Home Work 课堂及家庭作业": parseFloat(weights.classAndHomeWorkWeight),
                        "Tests and Quizzes 考试及测验": parseFloat(weights.testsAndQuizzesWeight),
                        "Class Participation 课堂参与": parseFloat(weights.classParticipationWeight)
                    };

                const Grade = class {
                    constructor(pointsEarned, pointsPossible, category) {
                        this.ptE = pointsEarned;
                        this.ptP = pointsPossible;
                        this.category = category;
                    }
                }

                let grades = [];
                let gradesTable = document.querySelector("#scoreTable");
                for (let i = 1; i < gradesTable.rows.length - 1; i++) {
                    let categoryElement = gradesTable.rows[i].querySelector("td.categorycol > span.psonly");
                    let category = categoryElement.innerHTML.trim();

                    let gradeElement = gradesTable.rows[i].cells[10].querySelector("span");
                    let gradeSplit = [];
                    if (gradeElement.innerHTML.includes("input")) {
                        gradeSplit.push(gradeElement.querySelector("input[type=text]:nth-child(1)").value);
                        gradeSplit.push(gradeElement.querySelector("input[type=text]:nth-child(2)").value);
                    } else {
                        gradeSplit = gradeElement.innerHTML.trim().split("/");
                    }

                    if (firstRun) {
                        gradeElement.ondblclick = function () {
                            let newElement = changeElementToInput(gradeElement);
                            newElement.ondblclick = null;
                        }
                    }

                    gradeElement.style.cursor = "pointer";
                    if (gradeSplit[0] !== "--") {
                        let newGrade = new Grade(parseFloat(gradeSplit[0]), parseFloat(gradeSplit[1]), category);
                        grades.push(newGrade);
                    }
                }

                    let gradeWeightedSum = 0;
                    let totalWeights = 0;

                    for (let i = 0; i < grades.length; i++) {
                        let gradeWeight = categoryWeights[grades[i].category];
                        gradeWeightedSum += (grades[i].ptE / grades[i].ptP) * gradeWeight;
                        totalWeights += gradeWeight;
                    }

                    firstRun = false;
                    resolve(Math.round((gradeWeightedSum / totalWeights) * 10000) / 100);
                });
            });
        }



        function changeElementToInput(element) {
            let currentScore = element.innerHTML.trim();
            let splitScore = currentScore.split("/");
            element.outerHTML = "<span style=\"display: flex;\"><input size='3' type='text' value='" + splitScore[0] + "'>/<input size='3' type='text' value='" + splitScore[1] + "'>";
            gradeEdited = true;
            return element;
        }

        setInterval(async function () {
            if (document.hasFocus()) {
                const gradeDisplay = document.evaluate('//*[@id="content-main"]/div[3]/table/tbody/tr[2]/td[5]/text()[2]', document, null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (gradeDisplay) {
                    const gradeValue = await calculateGrade();
                    gradeDisplay.textContent = gradeValue + "%" + (gradeEdited ? " (Edited)" : "");
                }
            }
        }, 250);

    }
})