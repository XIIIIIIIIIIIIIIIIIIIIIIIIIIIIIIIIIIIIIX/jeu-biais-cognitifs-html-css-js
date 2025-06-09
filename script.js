const questions = [
            {
                scenario: "Marie ignore les critiques négatives sur son film préféré, ne se souvenant que des éloges.",
                bias: "Biais de confirmation",
                explanation: "On retient préférentiellement les informations confirmant nos croyances existantes.",
                options: [
                    "Effet de halo", 
                    "Biais de confirmation", 
                    "Effet Dunning-Kruger", 
                    "Biais d'autocomplaisance"
                ]
            },
            {
                scenario: "Paul est persuadé qu'un événement rare se produira car il n'est jamais arrivé récemment.",
                bias: "Sophisme du joueur",
                explanation: "Croire qu'une probabilité est influencée par des événements passés indépendants (ex: pile ou face).",
                options: [
                    "Biais de disponibilité", 
                    "Biais de négativité", 
                    "Sophisme du joueur", 
                    "Biais de cadrage"
                ]
            },
            {
                scenario: "Julie refuse de vendre ses actions en perte, espérant qu'elles remonteront, même face à des preuves contraires.",
                bias: "Effet de dotation",
                explanation: "On accorde plus de valeur à ce qu'on possède déjà qu'à ce qu'on ne possède pas.",
                options: [
                    "Effet de dotation", 
                    "Biais de statu quo", 
                    "Ancrage mental", 
                    "Biais d'optimisme"
                ]
            },
            {
                scenario: "Lors des embauches, Marc favorise les candidats diplômés de sa propre université.",
                bias: "Biais d'appartenance",
                explanation: "Préférer les personnes appartenant au même groupe social que soi.",
                options: [
                    "Biais de représentativité", 
                    "Biais d'autorité", 
                    "Biais d'appartenance", 
                    "Effet de simple exposition"
                ]
            },
            {
                scenario: "Sophie est convaincue que ses mauvaises notes sont dues à des professeurs injustes, pas à son manque de travail.",
                bias: "Biais d'autocomplaisance",
                explanation: "Attribuer ses succès à son mérite personnel, et ses échecs à des facteurs externes.",
                options: [
                    "Biais égocentrique", 
                    "Biais d'autocomplaisance", 
                    "Illusion de contrôle", 
                    "Erreur fondamentale d'attribution"
                ]
            },
            {
                scenario: "Alex croit que son équipe perd car l'arbitre est partial, mais jamais lorsqu'elle gagne.",
                bias: "Biais de croyance",
                explanation: "Interpréter les informations en fonction de ses convictions préexistantes.",
                options: [
                    "Biais de croyance", 
                    "Biais émotionnel", 
                    "Effet de faux consensus", 
                    "Biais de confirmation"
                ]
            },
            {
                scenario: "Thomas pense que les accidents d'avion sont fréquents car ils font la une des journaux.",
                bias: "Biais de disponibilité",
                explanation: "Surcharger l'importance d'informations récentes ou saillantes.",
                options: [
                    "Heuristique de disponibilité", 
                    "Biais de disponibilité", 
                    "Effet de récence", 
                    "Biais d'ancrage"
                ]
            },
            {
                scenario: "Émilie juge un candidat politique principalement sur sa dernière déclaration.",
                bias: "Effet de récence",
                explanation: "Accorder plus d'importance aux informations les plus récentes.",
                options: [
                    "Effet de récence", 
                    "Biais de primauté", 
                    "Effet de halo", 
                    "Biais de cadrage"
                ]
            },
            {
                scenario: "Nicolas achète un produit après avoir vu '9 personnes sur 10 recommandent' sans vérifier la source.",
                bias: "Appel à la popularité",
                explanation: "Croire qu'une chose est vraie simplement parce que beaucoup de gens le croient.",
                options: [
                    "Biais de conformisme", 
                    "Appel à la popularité", 
                    "Effet de groupe", 
                    "Biais de consensus"
                ]
            },
            {
                scenario: "Laura persiste dans un projet coûteux juste pour 'ne pas perdre son investissement initial'.",
                bias: "Coûts irrécupérables",
                explanation: "Poursuivre une action non rentable à cause des ressources déjà investies.",
                options: [
                    "Ancrage mental", 
                    "Coûts irrécupérables", 
                    "Biais de cadrage", 
                    "Biais de statu quo"
                ]
            }
        ];

        const GAME_SETTINGS = {
            totalQuestions: 5
        };

        let currentQuestionIndex = 0;
        let score = 0;
        let gameQuestions = [];

        // DOM elements
        const introScreen = document.getElementById('intro-screen');
        const gameScreen = document.getElementById('game-screen');
        const resultScreen = document.getElementById('result-screen');
        const startBtn = document.getElementById('start-btn');
        const restartBtn = document.getElementById('restart-btn');
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const currentScore = document.getElementById('current-score');
        const currentQuestion = document.getElementById('current-question');
        const totalQuestions = document.getElementById('total-questions');
        const feedback = document.getElementById('feedback');
        const finalScore = document.getElementById('final-score');
        const performanceComment = document.getElementById('performance-comment');

        // Initialize game
        function initGame() {
            gameQuestions = [...questions].sort(() => 0.5 - Math.random()).slice(0, GAME_SETTINGS.totalQuestions);
            currentQuestionIndex = 0;
            score = 0;
            currentScore.textContent = score;
            totalQuestions.textContent = GAME_SETTINGS.totalQuestions;
            showQuestion();
        }

        // Display current question
        function showQuestion() {
            const question = gameQuestions[currentQuestionIndex];
            currentQuestion.textContent = currentQuestionIndex + 1;
            questionText.textContent = question.scenario;
            feedback.textContent = "Sélectionnez votre réponse";
            
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.classList.add('option');
                optionElement.innerHTML = `
                    <div class="icon">${getIcon(index)}</div>
                    <div class="option-text">${option}</div>
                `;
                optionElement.addEventListener('click', () => checkAnswer(option, question.bias));
                optionsContainer.appendChild(optionElement);
            });
        }

        function getIcon(index) {
            return ['➊', '➋', '➌', '➍'][index];
        }

        // Check if selected answer is correct
        function checkAnswer(selected, correctAnswer) {
            const options = document.querySelectorAll('.option');
            options.forEach(option => {
                if (option.querySelector('.option-text').textContent === correctAnswer) {
                    option.classList.add('correct');
                }
                if (option.querySelector('.option-text').textContent === selected && selected !== correctAnswer) {
                    option.classList.add('incorrect');
                }
                option.style.pointerEvents = 'none';
            });

            if (selected === correctAnswer) {
                score += 2;
                currentScore.textContent = score;
                feedback.textContent = "✅ Correct!";
            } else {
                feedback.textContent = `❌ Faux! La réponse était: ${correctAnswer}`;
            }

            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < gameQuestions.length) {
                    showQuestion();
                } else {
                    showResults();
                }
            }, 2000);
        }

        function showResults() {
            gameScreen.classList.add('hidden');
            resultScreen.classList.remove('hidden');
            finalScore.textContent = score;
            
            const percentage = (score / (GAME_SETTINGS.totalQuestions * 2)) * 100;
            let comment = "Impressionnant ! Vous maîtrisez bien les biais cognitifs.";
            
            if (percentage < 70) {
                comment = "Continue comme ça ! Quelques révisions et vous allez exceller.";
            }
            if (percentage < 50) {
                comment = "Bon début ! Familiarisez-vous davantage avec les biais pour progresser.";
            }
            
            performanceComment.textContent = comment;
        }

        // Event Listeners
        startBtn.addEventListener('click', () => {
            introScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            initGame();
        });

        restartBtn.addEventListener('click', () => {
            resultScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            initGame();
        });