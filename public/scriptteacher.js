document.addEventListener("DOMContentLoaded", function() {
    var teacherName = "Mehmet"; 
    document.getElementById("teacher-name").textContent = teacherName;

    document.getElementById("logout-btn").addEventListener("click", function() {
        alert("Çıkış yapılıyor...");
    });

    var exams = [
        { id: 1, date: '2024-06-04', title: 'Mathematics for Beginners', time: '11:15 PM', duration: 90 },
        { id: 2, date: '2024-06-08', title: 'Literature Analysis', time: '11:23 AM', duration: 120 },
        { id: 3, date: '2024-06-10', title: 'History of Art', time: '3:08 AM', duration: 90 },
        { id: 4, date: '2024-06-04', title: 'Computer Science Fundamentals', time: '9:24 AM', duration: 60 },
        { id: 5, date: '2024-06-06', title: 'Literature Analysis', time: '9:32 AM', duration: 90 },
        { id: 6, date: '2024-06-11', title: 'History of Art', time: '4:03 AM', duration: 60 },
        { id: 7, date: '2024-06-03', title: 'History of Art', time: '1:33 AM', duration: 90 },
        { id: 8, date: '2024-06-12', title: 'Mathematics for Beginners', time: '8:03 AM', duration: 90 },
        { id: 9, date: '2024-06-05', title: 'History of Art', time: '7:28 PM', duration: 90 },
        { id: 10, date: '2024-06-06', title: 'Introduction to Biology', time: '3:34 AM', duration: 150 },
        { id: 11, date: '2024-06-02', title: 'History of Art', time: '1:44 AM', duration: 90 },
        { id: 12, date: '2024-06-03', title: 'Computer Science Fundamentals', time: '9:42 PM', duration: 60 },
        { id: 13, date: '2024-06-08', title: 'Mathematics for Beginners', time: '1:12 PM', duration: 60 },
        { id: 14, date: '2024-06-11', title: 'History of Art', time: '11:07 AM', duration: 150 },
        { id: 15, date: '2024-06-09', title: 'Computer Science Fundamentals', time: '9:44 PM', duration: 90 },
        { id: 16, date: '2024-06-11', title: 'Computer Science Fundamentals', time: '2:00 PM', duration: 90 },
        { id: 17, date: '2024-06-05', title: 'Literature Analysis', time: '12:16 PM', duration: 90 },
        { id: 18, date: '2024-06-03', title: 'Introduction to Biology', time: '12:24 PM', duration: 150 },
        { id: 19, date: '2024-06-06', title: 'Literature Analysis', time: '6:51 AM', duration: 90 },
        { id: 20, date: '2024-06-04', title: 'Mathematics for Beginners', time: '10:01 PM', duration: 60 },
        { id: 21, date: '2024-06-11', title: 'Literature Analysis', time: '2:52 AM', duration: 90 },
        { id: 22, date: '2024-06-03', title: 'Literature Analysis', time: '12:32 AM', duration: 90 },
        { id: 23, date: '2024-06-05', title: 'Literature Analysis', time: '5:13 AM', duration: 150 },
        { id: 24, date: '2024-06-05', title: 'History of Art', time: '11:09 PM', duration: 60 },
        { id: 25, date: '2024-06-11', title: 'History of Art', time: '3:44 AM', duration: 120 }
    ];

    var examSelect = document.getElementById("exam-select");
    var examQuestionsDiv = document.getElementById("exam-questions");
    var questionForm = document.getElementById("question-form");
    var questionsList = document.getElementById("questions");

    exams.forEach(function(exam) {
        var option = document.createElement("option");
        option.value = exam.id;
        option.textContent = '${exam.id} - ${exam.date} - ${exam.title} - ${exam.time} - ${exam.duration} min';
        examSelect.appendChild(option);
    });

    examSelect.addEventListener("change", function() {
        examQuestionsDiv.classList.remove("hidden");
    });

    document.getElementById("add-question-btn").addEventListener("click", function() {
        var question = document.getElementById("question").value;
        var choices = [
            document.getElementById("choice1").value,
            document.getElementById("choice2").value,
            document.getElementById("choice3").value,
            document.getElementById("choice4").value
        ];
        var correctChoice = document.querySelector('input[name="correct"]:checked');
        var points = document.getElementById("points").value;

        if (question && choices.every(choice => choice) && correctChoice && points) {
            var li = document.createElement("li");
            li.innerHTML = `<strong>Question:</strong> ${question} <br> <strong>Options:</strong> 
                            ${choices.map((choice, index) => {
                                var choiceId = 'choice${index + 1}';
                                if (choiceId === correctChoice.value) {
                                    return <span class="correct-answer">${choice}</span>;
                                } else {
                                    return choice;
                                }
                            }).join(", ")} <br> <strong>Point:</strong> ${points}`;

            var deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-question-btn");
            li.appendChild(deleteBtn);

            var ul = document.getElementById("questions");
            ul.appendChild(li);
            questionForm.reset();
        } else {
            alert("Please fill in all fields, choose the correct option and enter the score.");
        }
    });

    document.getElementById("questions").addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-question-btn")) {
            event.target.parentElement.remove();
        }
    });
});