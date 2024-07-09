const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'examination'
});

const studentId = 'your_student_id'; // Replace 'your_student_id' with the actual student ID

db.query('SELECT * FROM Register WHERE student_id = ?', [studentId], (err, results) => {
    if (err) {
        console.error('Database Query Error:', err);
        return;
    }

    if (results.length > 0) {
        const studentPassword = results[0].password;
        console.log('Student Password:', studentPassword);
    } else {
        console.log('Student not found');
    }
});
