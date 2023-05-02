chrome.storage.local.get(["psHypoGradeCalc"], function(items){
    if(items["psHypoGradeCalc"]) {
        let gradeEdited = false;
        let firstRun = true;
        function calculateGrade() {
            const Grade = class {
                constructor(pointsEarned, pointsPossible, category) {
                    this.ptE = pointsEarned;
                    this.ptP = pointsPossible;
                    this.category = category;
                }
            }

            const categoryWeights = {
                "Quarter Exams 期中期末考试": 0.4,
                "Class and Home Work 课堂及家庭作业": 0.2,
                "Tests and Quizzes 考试及测验": 0.3,
                "Class Participation 课堂参与": 0.1
            };

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
            return Math.round((gradeWeightedSum / totalWeights) * 10000) / 100;
        }


        function changeElementToInput(element) {
            let currentScore = element.innerHTML.trim();
            let splitScore = currentScore.split("/");
            element.outerHTML = "<span style=\"display: flex;\"><input size='3' type='text' value='" + splitScore[0] + "'>/<input size='3' type='text' value='" + splitScore[1] + "'>";
            gradeEdited = true;
            return element;
        }
        
        function changeElementToSpan(element) {
            let currentScore = element.value;
            element.outerHTML = '<span data-ng-if=\"studentAssignment._assignmentsections[0]._assignmentscores[0].scorepoints != null &amp;&amp; (studentAssignment._assignmentsections[0]._assignmentscores[0].scorepoints % 1) == 0 &amp;&amp; studentAssignment._assignmentsections[0].scoretype !== \'COLLECTED\'\" class=\"ng-binding ng-scope\"> ' + currentScore + ' </span>';
        }

        setInterval(function() {
            if (document.hasFocus()) {
                const gradeDisplay = document.evaluate('//*[@id="content-main"]/div[3]/table/tbody/tr[2]/td[5]/text()[2]', document, null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (gradeDisplay) {
                    gradeDisplay.textContent = calculateGrade() + "%" + (gradeEdited ? " (Edited)" : "");
                }
            }
        }, 250);
    }
})