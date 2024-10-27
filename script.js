// Initialize quiz questions and variables
let quizQuestions = [
    { question: "What does '1' represent in binary?", answer: "1" },
    { question: "What does '0' represent in binary?", answer: "0" },
    { question: "How many bits are in a byte?", answer: "8" },
    { question: "What is the binary representation of the decimal number 2?", answer: "10" },
    { question: "What is the binary representation of the decimal number 255?", answer: "11111111" },
];

let currentQuestionIndex = 0;
let score = 0;
let questionsAttempted = 0;

// Convert button click event listener
document.getElementById('convertButton').addEventListener('click', function() {
    const inputField = document.getElementById('inputField').value.trim();
    const resultDiv = document.getElementById('result');
    const messageDiv = document.getElementById('message');
    const learningPrompt = document.getElementById('learningPrompt');

    // Clear previous results
    resultDiv.innerText = '';
    messageDiv.innerText = '';
    learningPrompt.classList.add('hidden');

    // Check if the input is binary
    if (/^[01\s]+$/.test(inputField)) {
        const binaryArray = inputField.split(' ');
        const isValidBinary = binaryArray.every(bin => bin.length === 8 && /^[01]+$/.test(bin));

        if (isValidBinary) {
            // Convert binary to text
            const textOutput = binaryArray.map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
            resultDiv.innerText = textOutput;
        } else {
            // Invalid binary
            messageDiv.innerText = "It seems you've entered invalid binary.";
            messageDiv.classList.remove('hidden');
            learningPrompt.classList.remove('hidden');
        }
    } else {
        // Convert text to binary
        const binaryOutput = inputField.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        resultDiv.innerText = binaryOutput;
    }
});

// Handle user response to learning prompt
document.getElementById('yesButton').addEventListener('click', function() {
    // Redirect to an educational resource
    window.location.href = "https://www.instructables.com/How-to-understand-binary-code/";
});

document.getElementById('noButton').addEventListener('click', function() {
    // Hide learning prompt and start the quiz
    document.getElementById('learningPrompt').classList.add('hidden');
    startQuiz(); // Start the quiz when the user declines to learn
});

// Start Quiz Function
function startQuiz() {
    document.getElementById('quizSection').classList.remove('hidden');
    showQuestion();
}

// Show Current Question
function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    document.getElementById('quizQuestion').innerText = currentQuestion.question;
}

// Submit Answer
document.getElementById('submitAnswerButton').addEventListener('click', function() {
    const userAnswer = document.getElementById('quizAnswer').value.trim();
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
        score++;
        document.getElementById('quizMessage').innerText = "Correct!";
    } else {
        document.getElementById('quizMessage').innerText = `Incorrect! The correct answer was: ${currentQuestion.answer}`;
    }

    questionsAttempted++;
    document.getElementById('quizScore').innerText = score;
    document.getElementById('questionsAttempted').innerText = questionsAttempted;

    // Clear input and message
    document.getElementById('quizAnswer').value = '';
    document.getElementById('quizMessage').classList.remove('hidden');

    // Move to the next question or end the quiz
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        document.getElementById('quizQuestion').innerText = "Quiz complete!";
        document.getElementById('submitAnswerButton').disabled = true; // Disable the button after quiz completion
    }
});
