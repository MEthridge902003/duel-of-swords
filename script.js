const duelRules = {
    "thrust": {
        "thrust": { playerChange: -1, aiChange: -1 },
        "high-cut": { playerChange: 0, aiChange: -1 },
        "low-cut": { playerChange: 0, aiChange: -1 },
        "duck": { playerChange: 0, aiChange: -1 },
        "lateral-parry": { playerChange: -0.5, aiChange: 0 },
        "vertical-parry": { playerChange: -0.5, aiChange: 0 },
        "side-step": { playerChange: -0.5, aiChange: 0 },
        "disengage": { playerChange: -0.5, aiChange: 0 },
        "stop-hit": { playerChange: -1, aiChange: 0 }
    },
    "high-cut": {
        "high-cut": { playerChange: 0, aiChange: 0 },
        "low-cut": { playerChange: -1, aiChange: -1 },
        "thrust": { playerChange: -1, aiChange: 0 },
        "vertical-parry": { playerChange: 0, aiChange: -1 },
        "side-step": { playerChange: 0, aiChange: -1 },
        "stop-hit": { playerChange: 0, aiChange: -1 },
        "disengage": { playerChange: 0, aiChange: -1 },
        "lateral-parry": { playerChange: -0.5, aiChange: 0 },
        "duck": { playerChange: -1, aiChange: 0 }
    },
    "low-cut": {
        "low-cut": { playerChange: 0, aiChange: 0 },
        "duck": { playerChange: 0, aiChange: -1 },
        "high-cut": { playerChange: -1, aiChange: -1 },
        "thrust": { playerChange: -1, aiChange: 0 },
        "lateral-parry": { playerChange: 0, aiChange: -1 },
        "side-step": { playerChange: 0, aiChange: -1 },
        "stop-hit": { playerChange: 0, aiChange: -1 },
        "disengage": { playerChange: 0, aiChange: -1 },
        "vertical-parry": { playerChange: -0.5, aiChange: 0 }
    },
    "lateral-parry": {
        "high-cut": { playerChange: 0, aiChange: -0.5 },
        "thrust": { playerChange: 0, aiChange: -0.5 },
        "stop-hit": { playerChange: 0, aiChange: 0 },
        "disengage": { playerChange: 0, aiChange: 0 },
        "low-cut": { playerChange: -1, aiChange: 0 },
        "lateral-parry": { playerChange: 0, aiChange: 0 },
        "vertical-parry": { playerChange: 0, aiChange: 0 },
        "side-step": { playerChange: -0.5, aiChange: 0 },
        "duck": { playerChange: 0, aiChange: 0 }
    },
    "vertical-parry": {
        "low-cut": { playerChange: 0, aiChange: -0.5 },
        "thrust": { playerChange: -0.5, aiChange: 0 },
        "high-cut": { playerChange: -1, aiChange: 0 },
        "side-step": { playerChange: -0.5, aiChange: 0 },
        "stop-hit": { playerChange: 0, aiChange: 0 },
        "lateral-parry": { playerChange: 0, aiChange: 0 },
        "vertical-parry": { playerChange: 0, aiChange: 0 },
        "duck": { playerChange: 0, aiChange: 0 },
        "disengage": { playerChange: 0, aiChange: 0 }
    },
    "stop-hit": {
        "thrust": { playerChange: 0, aiChange: -1 },
        "high-cut": { playerChange: -1, aiChange: 0 },
        "low-cut": { playerChange: -1, aiChange: 0 },
        "side-step": { playerChange: -0.5, aiChange: 0 },
        "stop-hit": { playerChange: 0, aiChange: 0 },
        "lateral-parry": { playerChange: 0, aiChange: 0 },
        "vertical-parry": { playerChange: 0, aiChange: 0 },
        "duck": { playerChange: 0, aiChange: 0 },
        "disengage": { playerChange: 0, aiChange: 0 }
    },
    "side-step": {
        "thrust": { playerChange: 0, aiChange: -0.5 },
        "lateral-parry": { playerChange: 0, aiChange: -0.5 },
        "vertical-parry": { playerChange: 0, aiChange: -0.5 },
        "duck": { playerChange: 0, aiChange: -0.5 },
        "high-cut": { playerChange: -1, aiChange: 0 },
        "low-cut": { playerChange: -1, aiChange: 0 },
        "side-step": { playerChange: 0, aiChange: 0 },
        "stop-hit": { playerChange: 0, aiChange: 0 },
        "disengage": { playerChange: 0, aiChange: 0 }
    },
    "duck": {
        "high-cut": { playerChange: 0, aiChange: -0.5 },
        "thrust": { playerChange: -1, aiChange: 0 },
        "low-cut": { playerChange: -1, aiChange: 0 },
        "side-step": { playerChange: -0.5, aiChange: 0 },
        "duck": { playerChange: 0, aiChange: 0 },
        "stop-hit": { playerChange: 0, aiChange: 0 },
        "lateral-parry": { playerChange: 0, aiChange: 0 },
        "vertical-parry": { playerChange: 0, aiChange: 0 },
        "disengage": { playerChange: 0, aiChange: 0 }
    },
    "disengage": {
        "thrust": { playerChange: 0, aiChange: -0.5 },
        "high-cut": { playerChange: -1, aiChange: 0 },
        "low-cut": { playerChange: -1, aiChange: 0 },
        "disengage": { playerChange: 0, aiChange: 0 },
        "side-step": { playerChange: 0, aiChange: 0 },
        "duck": { playerChange: 0, aiChange: 0 },
        "stop-hit": { playerChange: 0, aiChange: 0 },
        "lateral-parry": { playerChange: 0, aiChange: 0 },
        "vertical-parry": { playerChange: 0, aiChange: 0 }
    }
};

// 1. GAME STATE (Only define these once!)
let playerPoints = 5.0;
let aiPoints = 5.0;
let lastMove = "";
const API_KEY = "YOUR_ACTUAL_KEY_HERE"; // Remember to pull this before pushing to GitHub!

// 2. DOM ELEMENTS (Matches your cleaned-up HTML)
const moveInput = document.getElementById('move-input');
const chatInput = document.getElementById('chat-input');
const duelBtn = document.getElementById('duel-btn');
const sendChatBtn = document.getElementById('send-chat-btn');
const callerBox = document.getElementById('caller-display');
const log = document.getElementById('duel-log');
const pScoreDisp = document.getElementById('p-score');
const aScoreDisp = document.getElementById('a-score');

// 3. THE CORE GAME ENGINE
duelBtn.addEventListener('click', async () => {
    const pMove = moveInput.value.toLowerCase().trim();
    const pChat = chatInput.value.trim(); // Grab your "priming" text

    if (!duelRules[pMove]) {
        alert("Illegal move!");
        return;
    }

    lastMove = pMove;
    moveInput.value = ""; 
    chatInput.value = ""; // Clear both after sending

    callerBox.innerHTML = `THE CALLER: "Michael speaks... and strikes! Awaiting AI..."`;

    // Pass the chat message into the AI call
    const aiRaw = await getAiMove(playerPoints, aiPoints, pChat);
    const aiData = parseAiResponse(aiRaw);
    
    executeRound(pMove, aiData.move, aiData.taunt);
});

function executeRound(pMove, aMove, taunt) {
    const result = duelRules[pMove][aMove];

    // Update Math
    playerPoints += result.playerChange;
    aiPoints += result.aiChange;

    // Update UI Scores
    pScoreDisp.innerText = playerPoints.toFixed(1);
    aScoreDisp.innerText = aiPoints.toFixed(1);

    // Update Caller Bar
    callerBox.innerHTML = `THE CALLER: "${pMove.toUpperCase()} vs ${aMove.toUpperCase()}!"`;

    // Add result and Taunt to Chat Log
    const entry = document.createElement('p');
    entry.innerHTML = `
        <span style="color: cyan">Michael</span>: ${pMove}<br>
        <span style="color: magenta">AI Duelist</span>: ${aMove}<br>
        <em>"${taunt}"</em><br>
        <strong>Result:</strong> P(${result.playerChange}) | A(${result.aiChange})
    `;
    log.appendChild(entry);
    
    // Check for "Faceplant" (Special Flavor)
    if (pMove === "duck" && aMove === "low-cut") {
        const fp = document.createElement('p');
        fp.style.color = "orange";
        fp.innerText = "THE CALLER: 'A brutal faceplant by Michael!'";
        log.appendChild(fp);
    }

    log.scrollTop = log.scrollHeight;
    checkGameOver();
}

// 4. THE KNOCKOUT CHECK
function checkGameOver() {
    if (playerPoints <= 0 || aiPoints <= 0) {
        const winner = playerPoints > aiPoints ? "Michael" : "The AI Duelist";
        callerBox.innerHTML = `THE CALLER: "HALT! ${winner.toUpperCase()} VICTORIOUS!"`;
        callerBox.style.color = "#ff0000";
        duelBtn.disabled = true;
        duelBtn.innerText = "MATCH OVER";
    }
}

// 5. THE AI CONNECTION
async function getAiMove(pScore, aScore, userChat) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    // If you didn't type anything in chat, we give it a default instruction
    const chatContext = userChat ? `Michael says: "${userChat}"` : "The duel continues in silence.";

    const promptData = {
        contents: [{
            parts: [{
                text: `Game: RDI Duel of Swords. 
                Scores: Michael ${pScore}, AI ${aScore}. 
                Context: ${chatContext}
                
                Instruction: Choose your next move from the matrix. 
                Then, respond to Michael's chat in character as a witty RDI duelist.
                
                Respond ONLY in JSON: {"move": "[[move]]", "taunt": "your response to him"}`
            }]
        }]
    };
    // ... rest of fetch code ...
}


function parseAiResponse(rawText) {
    try {
        // Clean up markdown code blocks if Gemini includes them
        const cleanJson = rawText.replace(/```json|```/g, "");
        const data = JSON.parse(cleanJson);
        const moveMatch = data.move.match(/\[\[(.*?)\]\]/);
        return {
            move: moveMatch ? moveMatch[1].toLowerCase().trim() : data.move.toLowerCase().trim(),
            taunt: data.taunt
        };
    } catch (e) {
        return { move: "thrust", taunt: "En garde!" };
    }
}
function copyNote(id) {
    const text = document.getElementById(id).value;
    navigator.clipboard.writeText(text);
    
    // Quick visual feedback on the button
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "COPIED!";
    setTimeout(() => btn.innerText = originalText, 1000);
}
function toggleSidebar() {
    const sidebar = document.getElementById('dev-sidebar');
    const main = document.getElementById('main-container'); // Change this to your main div's ID
    const openBtn = document.getElementById('open-sidebar-btn');

    sidebar.classList.toggle('sidebar-hidden');
    
    if (main) {
        main.classList.toggle('full-width');
    }

    // Show/Hide the tiny open button
    if (sidebar.classList.contains('sidebar-hidden')) {
        openBtn.style.display = 'block';
    } else {
        openBtn.style.display = 'none';
    }
}