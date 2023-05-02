chrome.storage.local.get(["psHypoGradeCalc"], function(items){
    if(items["psHypoGradeCalc"]) {
        let gradeEdited = false;
        let firstRun = true;
        // todo
        function calculateGrade() {
            const Grade = class {
                constructor(pointsEarned, pointsPossible) {
                    this.ptE = pointsEarned;
                    this.ptP = pointsPossible;
                }
            }

            let grades = [];
            let gradesTable = document.querySelector("#scoreTable");
            for(let i = 1; i < gradesTable.rows.length - 1; i++) {
                let element = gradesTable.rows[i].cells[10].querySelector("span");
                let gradeSplit = [];
                if(element.innerHTML.includes("input")) {
                    gradeSplit.push(element.querySelector("input[type=text]:nth-child(1)").value);
                    gradeSplit.push(element.querySelector("input[type=text]:nth-child(2)").value);
                } else {
                    gradeSplit = element.innerHTML.trim().split("/");
                }
                if(firstRun) {
                element.ondblclick = function() {
                    let newElement = changeElementToInput(element);
                    newElement.ondblclick = null;
                }
            }

                element.style.cursor = "pointer";
                if(gradeSplit[0] !== "--") {
                    let newGrade = new Grade(parseFloat(gradeSplit[0]), parseFloat(gradeSplit[1]));
                    grades.push(newGrade);
                }
            }

            let gradePtE = 0;
            let gradePtP = 0;

            for(let i = 0; i < grades.length; i++) {
                gradePtE += grades[i].ptE;
                gradePtP += grades[i].ptP;
            }

            firstRun = false;
            return Math.round((gradePtE / gradePtP) * 10000) / 100;
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