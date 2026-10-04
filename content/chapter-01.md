<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module 1: Computer Basics & Functions | ICT Master</title>
    <style>
        /* General Page Styling */
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #334155;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f8fafc;
        }
        .content-body {
            background: #ffffff;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        h1, h2, h3 {
            color: #0f172a;
        }
        img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 15px 0;
        }

        /* Responsive Mobile-First Quiz Styling */
        .quiz-container {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px;
            margin: 30px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            box-sizing: border-box;
            width: 100%;
        }

        @media (min-width: 768px) {
            .quiz-container {
                padding: 28px;
            }
        }

        .quiz-header-title {
            font-size: 1.15rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 6px;
        }

        .quiz-progress {
            font-size: 0.9rem;
            color: #64748b;
            margin-bottom: 16px;
            font-weight: 600;
        }

        .quiz-question {
            font-size: 1.05rem;
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 16px;
            line-height: 1.5;
        }

        .quiz-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 24px;
        }

        .quiz-option-label {
            display: flex;
            align-items: center;
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            padding: 12px 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 1rem;
            color: #334155;
            min-height: 48px;
            box-sizing: border-box;
        }

        .quiz-option-label:hover {
            background: #f1f5f9;
            border-color: #cbd5e1;
        }

        .quiz-option-label input[type="radio"] {
            margin-right: 12px;
            transform: scale(1.2);
            accent-color: #2563eb;
        }

        .quiz-option-label.selected {
            background: #eff6ff;
            border-color: #2563eb;
            color: #1d4ed8;
            font-weight: 500;
        }

        .quiz-nav-btns {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            margin-top: 20px;
        }

        .quiz-btn {
            background: #2563eb;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            flex: 1;
            text-align: center;
            min-height: 48px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
            box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
        }

        .quiz-btn:hover {
            background: #1d4ed8;
        }

        .quiz-btn:disabled {
            background: #e2e8f0;
            color: #94a3b8;
            cursor: not-allowed;
            box-shadow: none;
        }

        .quiz-review-item {
            margin-bottom: 16px;
            padding: 14px;
            border-radius: 8px;
            background: #f8fafc;
            border-left: 5px solid #2563eb;
        }

        .quiz-review-item.correct {
            border-left-color: #16a34a;
            background: #f0fdf4;
        }

        .quiz-review-item.incorrect {
            border-left-color: #dc2626;
            background: #fef2f2;
        }
    </style>
</head>
<body>

<div class="content-body">
    <h1>MODULE 1: COMPUTER BASICS & FUNCTIONS</h1>

    <h2>1.1 What Is a Computer?</h2>
    <p>A <strong>computer</strong> is an electronic device that accepts data (input), processes it according to a set of instructions (a program), produces meaningful information (output), and can store that information for future use.</p>
    <p>Put simply: <strong>a computer is a machine that turns raw data into useful information.</strong></p>
    <p><strong>Data</strong> = raw, unorganised facts. Example: <code>75, 80, 90, 60</code></p>
    <p><strong>Information</strong> = processed, meaningful data. Example: <code>The class average is 76%</code></p>

    <h3>Key Characteristics of a Computer</h3>
    <ul>
        <li><strong>Speed:</strong> A computer performs millions (even billions) of calculations per second.</li>
        <li><strong>Accuracy:</strong> Computers do not make mistakes — errors come from wrong input ("GIGO").</li>
        <li><strong>Diligence (Consistency):</strong> A computer never gets tired, bored, or distracted.</li>
        <li><strong>Storage Capacity:</strong> Can hold millions of books, photos, and songs.</li>
        <li><strong>Versatility:</strong> Can type letters, play music, edit video, and browse the internet.</li>
        <li><strong>Automation:</strong> Works without human assistance once running.</li>
    </ul>

    <h3>Limitations</h3>
    <ul>
        <li><strong>No intelligence:</strong> Cannot think, only follows instructions.</li>
        <li><strong>No emotions:</strong> Has no feelings, judgment, or common sense.</li>
        <li><strong>Depends on power:</strong> Cannot function without electricity or battery.</li>
        <li><strong>GIGO principle:</strong> Wrong input = wrong output.</li>
    </ul>

    <hr>

    <h2>1.2 The Four Core Functions of a Computer</h2>
    <ol>
        <li><strong>INPUT</strong> — Accepting data from the user or environment.</li>
        <li><strong>PROCESSING</strong> — Transforming data into useful information.</li>
        <li><strong>OUTPUT</strong> — Presenting the processed information.</li>
        <li><strong>STORAGE</strong> — Saving data and information for future use.</li>
    </ol>

    <h3>The Computer Block Diagram</h3>
    <img src="https://ict-master.onrender.com/images/1790429997745.png" alt="Computer Block Diagram">
    <p><strong>How to remember it:</strong> Think of a bank. Input = deposit slip. Processing = cashier counting money. Output = receipt. Storage = bank records.</p>

    <hr>

    <h2>1.5 Interactive Quiz — Module 1</h2>

    <!-- Hidden raw quiz template parsed by script -->
    <div id="quiz-source" style="display:none;">
        :::quiz
        Question 1: What is the correct order of the four core functions of a computer?
        A) Output → Input → Storage → Processing
        B) Input → Processing → Output → Storage
        C) Storage → Input → Output → Processing
        D) Processing → Storage → Input → Output
        Answer: B
        Explanation: Data enters as input, is transformed by processing, is presented as output, then saved in storage.

        Question 2: Which of the following is NOT a characteristic of a computer?
        A) Speed
        B) Accuracy
        C) Emotion
        D) Diligence
        Answer: C
        Explanation: Computers have no emotions. Speed, accuracy, and diligence are all genuine characteristics.

        Question 3: The term GIGO in computing stands for:
        A) General Input General Output
        B) Garbage In Garbage Out
        C) Gigabyte In Gigabyte Out
        D) Graphic Interface Graphic Output
        Answer: B
        Explanation: Garbage In, Garbage Out — wrong input always produces wrong output.

        Question 4: Which type of computer is used in weather forecasting and space research?
        A) Mainframe
        B) Mini computer
        C) Supercomputer
        D) Microcomputer
        Answer: C
        Explanation: Supercomputers handle the most complex calculations, including weather and space simulation.

        Question 5: A POS terminal in a supermarket is best described as:
        A) A general-purpose computer
        B) A special-purpose (embedded) computer
        C) A supercomputer
        D) A mainframe
        Answer: B
        Explanation: A POS does one specialised job (process payments), so it is a special-purpose computer.

        Question 6: What is the raw, unorganised fact that a computer accepts called?
        A) Information
        B) Data
        C) Program
        D) Output
        Answer: B
        Explanation: Data is raw, unorganised facts. When processed, it becomes information.

        Question 7: Which of these is a limitation of a computer?
        A) It can calculate very fast
        B) It never gets tired
        C) It has no emotions
        D) It can store large amounts of data
        Answer: C
        Explanation: A computer has no emotions, no judgment, and no common sense. This is a limitation.

        Question 8: Which of the following devices is a computer?
        A) A calculator
        B) A smartphone
        C) A wristwatch
        D) All of the above
        Answer: D
        Explanation: A modern calculator, smartphone, and even a smartwatch all process data and perform the four functions of a computer.

        Question 9: The computer's four core functions in order are:
        A) Input, Output, Processing, Storage
        B) Input, Processing, Output, Storage
        C) Storage, Processing, Output, Input
        D) Processing, Input, Storage, Output
        Answer: B
        Explanation: The correct order is: Input → Processing → Output → Storage.

        Question 10: Which of these is NOT a general-purpose computer?
        A) A desktop PC
        B) A laptop
        C) A smartphone
        D) An ATM machine
        Answer: D
        Explanation: An ATM is a special-purpose (embedded) computer — it is built for one task only: banking transactions.
        :::
    </div>
    
    <div id="interactive-quiz-wrapper"></div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function () {
    const sourceEl = document.getElementById("quiz-source");
    if (!sourceEl) return;

    let textContent = sourceEl.innerText || sourceEl.textContent;
    const quizRegex = /:::quiz([\s\S]*?):::/;
    const match = textContent.match(quizRegex);

    if (match) {
        const quizRawText = match[1].trim();
        const questions = parseQuizText(quizRawText);
        renderQuizApp(questions, document.getElementById("interactive-quiz-wrapper"));
    }
});

function parseQuizText(text) {
    const blocks = text.split(/Question \d+:/).filter(Boolean);
    let questions = [];

    blocks.forEach((block) => {
        let lines = block.trim().split("\n").map(l => l.trim()).filter(Boolean);
        let qText = lines[0];
        let options = [];
        let answer = "";
        let explanation = "";

        lines.slice(1).forEach((line) => {
            if (/^[A-D]\)/.test(line)) {
                options.push(line);
            } else if (line.startsWith("Answer:")) {
                answer = line.replace("Answer:", "").trim();
            } else if (line.startsWith("Explanation:")) {
                explanation = line.replace("Explanation:", "").trim();
            }
        });

        questions.push({ question: qText, options, answer, explanation });
    });

    return questions;
}

function renderQuizApp(questions, root) {
    let currentIndex = 0;
    let userAnswers = {};

    function updateUI() {
        if (currentIndex >= questions.length) {
            renderScoreSummary();
            return;
        }

        let q = questions[currentIndex];
        let optionsHtml = q.options.map(opt => {
            let letter = opt.charAt(0);
            let isChecked = userAnswers[currentIndex] === letter;
            return `
                <label class="quiz-option-label ${isChecked ? 'selected' : ''}">
                    <input type="radio" name="quiz-q" value="${letter}" ${isChecked ? 'checked' : ''}>
                    <span>${opt}</span>
                </label>
            `;
        }).join("");

        root.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-header-title">Interactive Assessment — Module 1</div>
                <div class="quiz-progress">Question ${currentIndex + 1} of ${questions.length}</div>
                <div class="quiz-question">${q.question}</div>
                <div class="quiz-options">${optionsHtml}</div>
                <div class="quiz-nav-btns">
                    <button type="button" class="quiz-btn" id="quiz-prev-btn" ${currentIndex === 0 ? 'disabled' : ''}>← Previous</button>
                    <button type="button" class="quiz-btn" id="quiz-next-btn">${currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next →'}</button>
                </div>
            </div>
        `;

        root.querySelectorAll(".quiz-option-label").forEach((label) => {
            label.addEventListener("click", function() {
                root.querySelectorAll(".quiz-option-label").forEach(l => l.classList.remove("selected"));
                this.classList.add("selected");
                let radio = this.querySelector("input[type='radio']");
                if (radio) {
                    radio.checked = true;
                    userAnswers[currentIndex] = radio.value;
                }
            });
        });

        document.getElementById("quiz-prev-btn").addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateUI();
                window.scrollTo({ top: root.offsetTop - 50, behavior: 'smooth' });
            }
        });

        document.getElementById("quiz-next-btn").addEventListener("click", () => {
            currentIndex++;
            updateUI();
            window.scrollTo({ top: root.offsetTop - 50, behavior: 'smooth' });
        });
    }

    function renderScoreSummary() {
        let score = 0;
        questions.forEach((q, idx) => {
            if (userAnswers[idx] === q.answer) score++;
        });

        let reviewList = questions.map((q, idx) => {
            let userAns = userAnswers[idx] || "Not answered";
            let isCorrect = userAns === q.answer;
            return `
                <div class="quiz-review-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <p><strong>Q${idx + 1}:</strong> ${q.question}</p>
                    <p style="margin-top: 4px;">Your answer: <strong>${userAns}</strong> | Correct answer: <strong>${q.answer}</strong></p>
                    <p style="margin-top: 6px; font-size: 0.9rem; color: #475569;"><em>${q.explanation}</em></p>
                </div>
            `;
        }).join("");

        root.innerHTML = `
            <div class="quiz-container" style="text-align: center;">
                <h2 style="color: #1e293b; margin-bottom: 8px;">Quiz Completed!</h2>
                <p style="font-size: 1.25rem; font-weight: 700; color: #2563eb; margin-bottom: 12px;">Your Score: ${score} / ${questions.length}</p>
                <p style="color: #64748b; margin-bottom: 24px;">${score >= 7 ? 'Excellent work! You have a solid grasp of this module.' : 'Good effort! Review the detailed answers below and try again.'}</p>
                <button type="button" class="quiz-btn" id="quiz-retake-btn" style="margin-bottom: 24px;">🔄 Retake Quiz</button>
                <div style="text-align: left; margin-top: 20px;">
                    <h3 style="font-size: 1.1rem; color: #1e293b; margin-bottom: 12px;">Detailed Review</h3>
                    ${reviewList}
                </div>
            </div>
        `;

        document.getElementById("quiz-retake-btn").addEventListener("click", () => {
            currentIndex = 0;
            userAnswers = {};
            updateUI();
            window.scrollTo({ top: root.offsetTop - 50, behavior: 'smooth' });
        });
    }

    updateUI();
}
</script>

</body>
</html>
