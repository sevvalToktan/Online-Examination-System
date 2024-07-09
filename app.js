const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const session = require('express-session');
const Sequelize = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const port = 3000;

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'examination'
});

db.connect(err => {
    if (err) {
        console.error('MySQL Connection Error:', err);
        throw err;
    }
    console.log('MySQL Connected...');
});

// Sequelize setup for session store
const sequelize = new Sequelize('examination', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

// Session store
const sessionStore = new SequelizeStore({
    db: sequelize
});

app.use(session({
    secret: 'your_secret_key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1800000 } // 30 minutes
}));

// Sync session store
sessionStore.sync();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Debugging middleware
app.use((req, res, next) => {
    console.log('Received request:', req.method, req.url);
    console.log('Request body:', req.body);
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server Error', details: err.message });
});

// Serve static files
app.use(express.static('public'));

// Registration Route for Students
app.post('/studentregister', (req, res) => {
    const { email, Pnumber, password } = req.body;

    console.log('Received student registration data:', req.body);

    // Check if the student exists in the Students table
    const studentQuery = 'SELECT * FROM Students WHERE e_mail = ?';
    db.query(studentQuery, [email], (err, studentResult) => {
        if (err) {
            console.error('Database Query Error:', err);
            return res.status(500).json({ error: 'Server Error', details: err });
        }

        if (studentResult.length === 0) {
            console.log('Student not found with email:', email);
            return res.status(404).json({ error: 'Student not found' });
        }

        const student = studentResult[0];
        console.log('Found student:', student);

        if (student.Pnumber !== Pnumber) {
            console.log('Provided phone number does not match the student record:', Pnumber);
            return res.status(400).json({ error: 'Phone number does not match' });
        }

        // Insert the student registration details into the Register table
        const registerQuery = 'INSERT INTO register (student_id, email, password, user_type) VALUES (?, ?, ?, ?)';
        db.query(registerQuery, [student.student_id, email, password, 'student'], (err, result) => {
            if (err) {
                console.error('Database Insert Error:', err);
                return res.status(500).json({ error: 'Server Error', details: err });
            }
            console.log('Student registration successful:', result);
            res.status(200).json({ message: 'Student registered successfully' });
        });
    });
});

// Registration Route for Teachers
app.post('/teacherregister', (req, res) => {
    const { email, Pnumber, password } = req.body;

    console.log('Received teacher registration data:', req.body);

    // Check if the teacher exists in the Teacher table
    const teacherQuery = 'SELECT * FROM Teacher WHERE e_mail = ?';
    db.query(teacherQuery, [email], (err, teacherResult) => {
        if (err) {
            console.error('Database Query Error:', err);
            return res.status(500).json({ error: 'Server Error', details: err });
        }

        if (teacherResult.length === 0) {
            console.log('Teacher not found with email:', email);
            return res.status(404).json({ error: 'Teacher not found' });
        }

        const teacher = teacherResult[0];
        console.log('Found teacher:', teacher);

        if (teacher.Pnumber !== Pnumber) {
            console.log('Provided phone number does not match the teacher record:', Pnumber);
            return res.status(400).json({ error: 'Phone number does not match' });
        }

        // Insert the teacher registration details into the Register table
        const registerQuery = 'INSERT INTO Register (teacher_id, email, password, user_type) VALUES (?, ?, ?, ?)';
        db.query(registerQuery, [teacher.teacher_id, email, password, 'teacher'], (err, result) => {
            if (err) {
                console.error('Database Insert Error:', err);
                return res.status(500).json({ error: 'Server Error', details: err });
            }
            console.log('Teacher registration successful:', result);
            res.status(200).json({ message: 'Teacher registered successfully' });
        });
    });
});



// Login Route for Students
app.post('/studentlogin', (req, res) => {
    const { email, password } = req.body;

    // Check if the email and password match a record in the Register table
    const loginQuery = 'SELECT * FROM Register WHERE email = ? AND password = ? AND user_type = ?';
    db.query(loginQuery, [email, password, 'student'], (err, result) => {
        if (err) {
            console.error('Database Query Error:', err);
            return res.status(500).json({ success: false, message: 'Server Error', details: err.message });
        }

        if (result.length === 0) {
            // No matching student found
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const studentId = result[0].student_id;

        // Fetch student details
        const studentQuery = 'SELECT Fname, Lname FROM Students WHERE student_id = ?';
        db.query(studentQuery, [studentId], (err, studentResult) => {
            if (err) {
                console.error('Database Query Error:', err);
                return res.status(500).json({ success: false, message: 'Server Error', details: err.message });
            }

            if (studentResult.length === 0) {
                return res.status(404).json({ success: false, message: 'Student details not found' });
            }

            // Store user details in session
            req.session.user = {
                ...result[0],
                name: `${studentResult[0].Fname} ${studentResult[0].Lname}`
            };

            // Student successfully authenticated
            res.status(200).json({ success: true });
        });
    });
});

// Login Route for Teachers
app.post('/teacherlogin', (req, res) => {
    const { email, password } = req.body;

    // Check if the email and password match a record in the Register table for teacher
    const loginQuery = 'SELECT * FROM Register WHERE email = ? AND password = ? AND user_type = ?';
    db.query(loginQuery, [email, password, 'teacher'], (err, result) => {
        if (err) {
            console.error('Database Query Error:', err);
            return res.status(500).json({ success: false, message: 'Server Error', details: err.message });
        }

        if (result.length === 0) {
            // No matching teacher found
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Store user details in session
        req.session.user = result[0];

        // Teacher successfully authenticated
        res.status(200).json({ success: true });
    });
});


// Serve HTML files
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/studentregister", (req, res) => {
    res.sendFile(__dirname + "/public/studentregister.html");
});

app.get("/teacherregister", (req, res) => {
    res.sendFile(__dirname + "/public/teacherregister.html");
});

app.get("/studentlogin", (req, res) => {
    res.sendFile(__dirname + "/public/studentlogin.html");
});

app.get("/teacherlogin", (req, res) => {
    res.sendFile(__dirname + "/public/teacherlogin.html");
});

// Route to serve studentscreen.html and fetch student's name
app.get("/studentscreen", (req, res) => {
    if (!req.session.user || req.session.user.user_type !== 'student') {
        return res.redirect('/studentlogin.html');
    }

    res.sendFile(__dirname + "/public/studentscreen.html");
});

// API to fetch student's name
app.get("/getStudentName", (req, res) => {
    if (!req.session.user || req.session.user.user_type !== 'student') {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    res.status(200).json({ success: true, name: req.session.user.name });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Session destroy error:', err);
            return res.status(500).json({ success: false, message: 'Logout failed' });
        }
        res.redirect('/');
    });
});
// Fetch all exams
app.get('/getExams', (req, res) => {
    const examsQuery = 'SELECT * FROM Exam';
    db.query(examsQuery, (err, exams) => {
        if (err) {
            console.error('Database Query Error:', err);
            return res.status(500).json({ success: false, message: 'Server Error', details: err.message });
        }
        res.status(200).json({ success: true, exams });
    });
});

// Add a new question to an exam
app.post('/addQuestion', (req, res) => {
    const { exam_id, question, choice1, choice2, choice3, choice4, points } = req.body;

    const addQuestionQuery = `
        INSERT INTO exam_questions (exam_id, Qtest, CorAnswer, op_a, op_b, op_c, op_d, points)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(addQuestionQuery, [exam_id, question, 'A', choice1, choice2, choice3, choice4, points], (err, result) => {
        if (err) {
            console.error('Database Insert Error:', err);
            return res.status(500).json({ success: false, message: 'Server Error', details: err.message });
        }
        res.status(200).json({ success: true, message: 'Question added successfully' });
    });
});

// Assign exam to a student
app.post('/assignExam', (req, res) => {
    const { student_id, exam_id } = req.body;

    const assignQuery = 'INSERT INTO ExamAssignments (student_id, exam_id) VALUES (?, ?)';
    db.query(assignQuery, [student_id, exam_id], (err, result) => {
        if (err) {
            console.error('Database Insert Error:', err);
            return res.status(500).json({ success: false, message: 'Server Error', details: err.message });
        }
        res.status(200).json({ success: true, message: 'Exam assigned successfully' });
    });
});

// Fetch exams assigned to the logged-in student
// Fetch assigned exams for the logged-in student
app.get('/getAssignedExams', (req, res) => {
    if (!req.session.user || req.session.user.user_type !== 'student') {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const studentId = req.session.user.student_id;

    const assignedExamsQuery = `
        SELECT e.exam_id, e.date, e.subject, e.time, e.duration 
        FROM ExamAssignments ea 
        JOIN Exam e ON ea.exam_id = e.exam_id 
        WHERE ea.student_id = ?
    `;

    db.query(assignedExamsQuery, [studentId], (err, exams) => {
        if (err) {
            console.error('Database Query Error:', err);
            return res.status(500).json({ success: false, message: 'Server Error', details: err.message });
        }
        res.status(200).json({ success: true, exams });
    });
});

app.get("/teacherscreen", (req, res) => {
    if (!req.session.user || req.session.user.user_type !== 'teacher') {
        return res.redirect('/teacherlogin');
    }

    res.sendFile(__dirname + "/public/teacherscreen.html");
});

app.get("/studentscreen", (req, res) => {
    if (!req.session.user || req.session.user.user_type !== 'student') {
        return res.redirect('/studentlogin');
    }

    res.sendFile(__dirname + "/public/studentscreen.html");
});
// Fetch all students
app.get('/getStudents', (req, res) => {
    const studentsQuery = 'SELECT * FROM Students';
    db.query(studentsQuery, (err, students) => {
        if (err) {
            console.error('Database Query Error:', err);
            return res.status(500).json({ success: false, message: 'Server Error', details: err.message });
        }
        res.status(200).json({ success: true, students });
    });
});
// Fetch students and populate the dropdown
fetch('/getStudents')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            var studentSelect = document.getElementById("student-select");
            studentSelect.innerHTML = '<option value="" disabled selected>Choose Student</option>'; // Clear existing options and add default option
            data.students.forEach(function (student) {
                var option = document.createElement("option");
                option.value = student.student_id;
                option.textContent = `${student.Fname} ${student.Lname} (${student.e_mail})`;
                studentSelect.appendChild(option);
            });
        } else {
            alert('Failed to fetch students');
        }
    })
    .catch(error => {
        console.error('Error fetching students:', error);
    });
// Assign exam to a student
app.post('/assignStudentToExam', (req, res) => {
    const { student_id, exam_id } = req.body;

    const assignQuery = 'INSERT INTO ExamAssignments (student_id, exam_id) VALUES (?, ?)';
    db.query(assignQuery, [student_id, exam_id], (err, result) => {
        if (err) {
            console.error('Database Insert Error:', err);
            return res.status(500).json({ success: false, message: 'Server Error', details: err.message });
        }
        res.status(200).json({ success: true, message: 'Exam assigned successfully' });
    });
});
// Fetch questions for a specific exam
app.get('/getQuestions/:examId', (req, res) => {
    const { examId } = req.params;

    const questionsQuery = 'SELECT * FROM exam_questions WHERE exam_id = ?';
    db.query(questionsQuery, [examId], (err, questions) => {
        if (err) {
            console.error('Database Query Error:', err);
            return res.status(500).json({ success: false, message: 'Server Error', details: err.message });
        }
        res.status(200).json({ success: true, questions });
    });
});



// Submit answers and calculate the score
app.post('/submitExam', (req, res) => {
    const { examId, answers } = req.body;
    const studentId = req.session.user.student_id;

    // Fetch questions and correct answers
    const questionsQuery = 'SELECT question_id, CorAnswer, points FROM exam_questions WHERE exam_id = ?';
    db.query(questionsQuery, [examId], (err, questions) => {
        if (err) {
            console.error('Database Query Error:', err);
            return res.status(500).json({ success: false, message: 'Server Error', details: err.message });
        }

        let totalPoints = 0;
        let score = 0;

        questions.forEach(question => {
            totalPoints += question.points;
            const userAnswer = answers[`question_${question.question_id}`] ? answers[`question_${question.question_id}`][0] : null;
            if (userAnswer === question.CorAnswer) {
                score += question.points;
            }
        });

        const percentage = (score / totalPoints) * 100;

        // Store the result in the database
        const resultQuery = 'INSERT INTO ExamResults (student_id, exam_id, score) VALUES (?, ?, ?)';
        db.query(resultQuery, [studentId, examId, percentage], (err, result) => {
            if (err) {
                console.error('Database Insert Error:', err);
                return res.status(500).json({ success: false, message: 'Server Error', details: err.message });
            }
            res.status(200).json({ success: true, score: percentage });
        });
    });
});


