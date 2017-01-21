import { newWords, words } from 'words';

function createQuestions(assignment) {

    function createSpanishQuestion(word) {
        return {
            question: word.spanish + (word.spanishComment || ""),
            answer: word.english,
        };
    }

    function createEnglishQuestion(word) {
        return {
            question: word.english + (word.englishComment || ""),
            answer: word.spanish,
        };
    }

    $("#new-words").text(assignment.newWords.length);
    $("#words").text(assignment.words.length);

    let questions = [];

    for (let i = 0; i < assignment.newWords.length; i++) {
        for (let c = 0; c < assignment.newWordsRatio; c++) {
            questions.push(createSpanishQuestion(assignment.newWords[i]));
            questions.push(createEnglishQuestion(assignment.newWords[i]));
        }
    }

    for (let i = 0; i < assignment.words.length; i++) {
        for (let c = 0; c < assignment.wordsRatio; c++) {
            questions.push(createSpanishQuestion(assignment.words[i]));
            questions.push(createEnglishQuestion(assignment.words[i]));
        }
    }

    return questions;
}

function showNextQuestion(questions) {
    if (questions.length === 0) {
        showFinalGrade();
        return;
    }

    const index = Math.floor(Math.random() * questions.length);
    var question = questions.splice(index, 1)[0];

    $tr = $("<tr></tr>").appendTo("#table tbody");

    $("<th scope='row'></th>").appendTo($tr).text(($("#percent").data("total") || 0) + 1);

    $("<td></td>").appendTo($tr).text(question.question);
    
    $("<td></td>")
        .appendTo($tr)
        .append("<input type='text'></input>")

        .find("input")
        .data("answer", question.answer)
        .focus()
        .bind("keydown", function (event) { return keyDown(event); })
        .bind("keypress", function (event) { return keyPress(event); })
    ;

    $("<td></td>")
        .appendTo($tr)
        .append("<button type='button' id='button'></button>")
        .find("button")
        .text("check")
        .bind("click", function (event) { checkInput(event, questions); })
    ;
}

function keyDown(event) {
    const e = event || window.event;
    
    $(e.target).removeClass("error");

    return true;
}

function keyPress(event) {
    const e = event || window.event;
    
    if (e.keyCode === 13) {
        $(e.target).closest("tr").find("button").click();
        return false;
    }
    return true;
}

function checkInput(event, questions) {
    function isEqual(x, y) {
        return x.trim().toUpperCase() === y.trim().toUpperCase();
    }

    const $button = $((event || window.event).target);
    const $input = $button.closest("tr").find("input");

    const answer = $input.val();
    if (answer.match(/[^ A-Za-z]/)){
        $input
            .focus()
            .select()
            .addClass("error");
        return;
    }
    const correctAnswer = $input.data("answer");
    const isCorrect = isEqual(answer, correctAnswer);

    // on the table
    $input
        .closest("tr")
        .toggleClass("success", isCorrect)
        .toggleClass("danger", !isCorrect)
    ;

    $input.closest("td").text(answer);
    $button.closest("td").text(correctAnswer);

    $input.remove();
    $button.remove();

    // on the navbar
    const $percent = $("#percent");
    const correct = ($percent.data("correct") || 0) + (isCorrect ? 1 : 0);
    const total = ($percent.data("total") || 0) + 1;

    $percent
        .data("correct", correct)
        .data("total", total)
    ;

    const percent = correct / total;
    $percent.text((percent * 100).toFixed(0) + "% correct");

    $("#grade").html(
        percent >= 0.94 ? "<span class='label label-success'>A</span>" :
        percent >= 0.90 ? "<span class='label label-success'>A-</span>" :
        percent >= 0.87 ? "<span class='label label-info'>B+</span>" :
        percent >= 0.83 ? "<span class='label label-info'>B</span>" :
        percent >= 0.80 ? "<span class='label label-info'>B-</span>" :
        percent >= 0.77 ? "<span class='label label-warning'>C+</span>" :
        percent >= 0.73 ? "<span class='label label-warning'>C</span>" :
        percent >= 0.70 ? "<span class='label label-warning'>C-</span>" :
        percent >= 0.67 ? "<span class='label label-danger'>D+</span>" :
        percent >= 0.60 ? "<span class='label label-danger'>D</span>" :
                            "<span class='label label-danger'>F</span>"
    );

    setTimeout(function () { showNextQuestion(questions); }, 0);
}

function showFinalGrade(){
    const $finalGrade  = $("#final-grade");
    $("#grade")
        .clone()
        .css("font-size", "1000%")
        .appendTo($finalGrade)
    ;
    
    $("<br />")
        .appendTo($finalGrade)
    ;
    $("<br />")
        .appendTo($finalGrade)
    ;

    $("#percent")
        .clone()
        .css("font-size", "200%")
        .appendTo($finalGrade)
    ;

    $finalGrade.show();
}

function run(ratio) {
    $("#table tbody").empty();
    $("#final-grade").empty().hide();

    $("#percent")
        .data("correct", 0)
        .data("total", 0)
        .text("")
    ;

    $("#grade").empty().removeClass();

    showNextQuestion(
        createQuestions({
            newWordsRatio: ratio.newWordsRatio,
            newWords: newWords,
            wordsRatio: ratio.wordsRatio,
            words: words
        }));
}

function runNew(){
    $("#mode-new").addClass("active");
    $("#mode-mix").removeClass("active");
    $("#mode-test").removeClass("active");

    run({
        newWordsRatio: 10,
        wordsRatio: 0
    });
}

function runMix(){
    $("#mode-new").removeClass("active");
    $("#mode-mix").addClass("active");
    $("#mode-test").removeClass("active");

    run({
        newWordsRatio: 5,
        wordsRatio: 1
    });
}

function runTest(){
    $("#mode-new").removeClass("active");
    $("#mode-mix").removeClass("active");
    $("#mode-test").addClass("active");

    run({
        newWordsRatio: 1,
        wordsRatio: 1
    });
}

if (newWords.length > 0) {
    runNew();
} else {
    runTest();
}
