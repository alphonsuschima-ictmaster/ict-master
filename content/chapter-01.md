<!-- ========================================== -->
<!-- ICT-MASTER RESPONSIVE QUIZ SYSTEM (ALL-IN-ONE) -->
<!-- ========================================== -->

<style>
/* Responsive Mobile-First Quiz Styling */
.quiz-container {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 16px;
    margin: 24px 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    font-family: inherit;
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

/* Designed with a minimum height of 48px for easy mobile tapping */
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

<script>
document.addEventListener("DOMContentLoaded", function () {
    // Locate the content body container on the page
    const contentElement = document.querySelector(".content-body") || document.querySelector("main") || document.body;
    if (!contentElement) return;
    
    let htmlContent = contentElement.innerHTML;
    const quizRegex = /:::quiz([\s\S]*?):::/;
    const match = htmlContent.match(quizRegex);

    if (match) {
        const quizRawText = match[1].trim();
        const questions = parseQuizText(quizRawText);

        // Replace the :::quiz placeholder block with a clean root element
        const placeholder = '<div id="interactive-quiz-wrapper"></div>';
        contentElement.innerHTML = htmlContent.replace(quizRegex, placeholder);

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
                <div class="quiz-header-title">Interactive Assessment</div>
                <div class="quiz-progress">Question ${currentIndex + 1} of ${questions.length}</div>
                <div class="quiz-question">${q.question}</div>
                <div class="quiz-options">${optionsHtml}</div>
                <div class="quiz-nav-btns">
                    <button type="button" class="quiz-btn" id="quiz-prev-btn" ${currentIndex === 0 ? 'disabled' : ''}>← Previous</button>
                    <button type="button" class="quiz-btn" id="quiz-next-btn">${currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next →'}</button>
                </div>
            </div>
        `;

        // Handle option clicks across mobile and desktop screens
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

        // Navigation button event handlers
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
