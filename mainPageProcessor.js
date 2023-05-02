chrome.storage.local.get(["psGPACalc"], function(items){
    if(items["psGPACalc"]) {
        const ClassData = class {
            constructor(grade) {
                this.grade = grade;
            }
        }
        
        const GradingPeriod = class {
            constructor(id, identifier) {
                this.id = id;
                this.identifier = identifier;
                this.classes = [];
            }
            
            addClass(newClass) {
                this.classes.push(newClass);
            }
            
            setGPA(gpa) {
                this.gpa = gpa;
            }
        }
        
        let gradingPeriods = [];
        let gradingPeriodsHtml = document.querySelector("#quickLookup > table.linkDescList.grid > tbody > tr:nth-child(2)");
        
        
        //populate empty grading periods for each quarter and stuff
        for(let i = 4; i < gradingPeriodsHtml.cells.length; i++) {
            let cellText = gradingPeriodsHtml.cells[i].innerHTML;
            if(cellText === "Absences") {
                break; //if we reach the absenses column, we know we've iterated through all of the grades
            }
            let gradingPeriod = new GradingPeriod(i - 4, cellText);
            gradingPeriods.push(gradingPeriod);
        }
        
        let classesHtml = document.querySelector("#quickLookup > table.linkDescList.grid > tbody");
        
        for(let i = 3; i < classesHtml.rows.length; i++) { //for every row in the table that represents a class
            let classHtmlObject = classesHtml.rows[i]
            for(let j = 12; j < classHtmlObject.cells.length; j++) {
                if(classHtmlObject.cells[j].className === "notInSession") break;
                
                let gradeText = classHtmlObject.cells[j].querySelector("a").innerHTML;
                gradeText = gradeText.replace(/[^\d.]/g, '');
                let currentColumnClass = new ClassData(parseFloat(gradeText));
                if(!isNaN(currentColumnClass.grade)) 
                    gradingPeriods[j - 12].addClass(currentColumnClass);
            }
        }
        
        //now we calculate gpa's
        for(let i = 0; i < gradingPeriods.length; i++) {
            let points = 0;
            let classCount = gradingPeriods[i].classes.length;
            for(let j = 0; j < gradingPeriods[i].classes.length; j++) {
                let grade = gradingPeriods[i].classes[j].grade;
                if(grade >= 97) {points += 4.3;}
                else if(grade >= 90){points += 3.7;}
                else if(grade >= 93){points += 4.0;}
                else if(grade >= 87){points += 3.3;}
                else if(grade >= 80){points += 2.7;}
                else if(grade >= 83){points += 3.0;}
                else if(grade >= 77){points += 2.3;}
                else if(grade >= 70){points += 1.7;}
                else if(grade >= 74){points += 2.0;}
                else if(grade >= 67){points += 1.3;}
                else if(grade >= 60){points += 0.7;}
                else if(grade >= 64){points += 1.0;}
                else if((grade <= 60 && grade >= 1)){points += 0.00;}
            }
            console.log(points);
            gradingPeriods[i].setGPA(Math.round((points / classCount) * 100) / 100);
        }
        
        let gradesTable = document.querySelector("#quickLookup > table.linkDescList.grid > tbody");
        let newRow = gradesTable.insertRow(3);
        newRow.classList.add("center");
        newRow.classList.add("th2");

        let GPAAverage = 0;
        let GPAAverageCalcCounter = 0;
        for(let i = 0; i < gradingPeriods.length; i++) {
            if(!isNaN(gradingPeriods[i].gpa)) {
                GPAAverage += gradingPeriods[i].gpa;
                GPAAverageCalcCounter++;
            }
        }

        GPAAverage = Math.round((GPAAverage /= GPAAverageCalcCounter) * 100) / 100;
        
        for(let i = 0; i < 11; i++) {
            newRow.insertCell(0).outerHTML = "<th></th>";
        }
        
        newRow.insertCell(11).outerHTML = "<th>Unweighted GPA (Average: " + GPAAverage + "):</th>";
        
        for(let i = 0; i < gradingPeriods.length; i++) {
            let newCell = newRow.insertCell(i + 12);
            newCell.outerHTML = "<th>" + gradingPeriods[i].gpa + "</th>";
        }
    }
});