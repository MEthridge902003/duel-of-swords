// 1. CONFIGURATION & STATE
let API_KEY = localStorage.getItem('gemini_key');
if (!API_KEY) {
    const userEntry = prompt("WELCOME TO THE ARENA\n1. Get key at: https://aistudio.google.com/app/apikey\n2. Paste below:");
    if (userEntry) {
        API_KEY = userEntry.trim();
        localStorage.setItem('gemini_key', API_KEY);
    }
}

const getApiUrl = () => `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;



// 2. DOM ELEMENTS (Moved to the top so the rest of the script can "see" them)
const moveInput = document.getElementById('move-input');
const chatInput = document.getElementById('chat-input');
const duelBtn = document.getElementById('duel-btn');
const sendChatBtn = document.getElementById('send-chat-btn'); // Ensure this ID exists in HTML
const callerBox = document.getElementById('caller-display');
const log = document.getElementById('duel-log');
const pScoreDisp = document.getElementById('p-score');
const aScoreDisp = document.getElementById('a-score');

// Load scores from memory, or default to 5.0 if new game
let playerPoints = parseFloat(localStorage.getItem('pScore')) || 5.0;
let aiPoints = parseFloat(localStorage.getItem('aScore')) || 5.0;
let aiMoveHistory = JSON.parse(localStorage.getItem('aiHistory')) || [];

// Update the display immediately on load
pScoreDisp.innerText = playerPoints.toFixed(1);
aScoreDisp.innerText = aiPoints.toFixed(1);


// 3. THE RULES MATRIX
const duelRules = {
    "thrust": { 
        "thrust": { playerChange: -1, aiChange: -1 }, 
        "high-cut": { playerChange: 0, aiChange: -1 }, 
        "low-cut": { playerChange: 0, aiChange: -1 }, 
        "duck": { playerChange: 0, aiChange: -1 }, 
        "lateral-parry": { playerChange: -0.5, aiChange: 0 }, 
        "vertical-parry": { playerChange: 0, aiChange: 0 }, 
        "side-step": { playerChange: -0.5, aiChange: 0 }, 
        "disengage": { playerChange: -0.5, aiChange: 0 }, 
        "stop-hit": { playerChange: -1, aiChange: 0 },
        "slash": { playerChange: 0, aiChange: -1 } 
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
        "duck": { playerChange: -1, aiChange: 0 },
        "slash": { playerChange: 0, aiChange: -1 }
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
        "vertical-parry": { playerChange: -0.5, aiChange: 0 },
        "slash": { playerChange: 0, aiChange: -1 }
    },
    "slash": {
        "thrust": { playerChange: -1, aiChange: 0 },
        "high-cut": { playerChange: -1, aiChange: 0 },
        "low-cut": { playerChange: -1, aiChange: 0 },
        "stop-hit": { playerChange: -1, aiChange: 0 },
        "lateral-parry": { playerChange: 0, aiChange: -1 },
        "vertical-parry": { playerChange: 0, aiChange: -1 },
        "duck": { playerChange: 0, aiChange: -1 },
        "side-step": { playerChange: -0.5, aiChange: 0 },
        "disengage": { playerChange: -0.5, aiChange: 0 },
        "slash": { playerChange: -1, aiChange: -1 }
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
        "duck": { playerChange: -0.5, aiChange: 0 },
        "slash": { playerChange: -1, aiChange: 0 }
    },
    "vertical-parry": { 
        "low-cut": { playerChange: 0, aiChange: -0.5 }, 
        "thrust": { playerChange: 0, aiChange: -0.5 }, 
        "high-cut": { playerChange: -1, aiChange: 0 }, 
        "side-step": { playerChange: -0.5, aiChange: 0 }, 
        "stop-hit": { playerChange: 0, aiChange: 0 }, 
        "lateral-parry": { playerChange: 0, aiChange: 0 }, 
        "vertical-parry": { playerChange: 0, aiChange: 0 }, 
        "duck": { playerChange: 0, aiChange: 0 }, 
        "disengage": { playerChange: 0, aiChange: 0 },
        "slash": { playerChange: -1, aiChange: 0 }
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
        "disengage": { playerChange: 0, aiChange: 0 },
        "slash": { playerChange: 0, aiChange: -1 }
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
        "disengage": { playerChange: 0, aiChange: 0 },
        "slash": { playerChange: 0, aiChange: -0.5 }
    },
    "duck": { 
        "high-cut": { playerChange: 0, aiChange: -0.5 }, 
        "thrust": { playerChange: -1, aiChange: 0 }, 
        "low-cut": { playerChange: -1, aiChange: 0 }, 
        "side-step": { playerChange: -0.5, aiChange: 0 }, 
        "duck": { playerChange: 0, aiChange: 0 }, 
        "stop-hit": { playerChange: 0, aiChange: 0 }, 
        "lateral-parry": { playerChange: 0, aiChange: -0.5 }, 
        "vertical-parry": { playerChange: 0, aiChange: 0 }, 
        "disengage": { playerChange: 0, aiChange: 0 },
        "slash": { playerChange: -1, aiChange: 0 }
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
        "vertical-parry": { playerChange: 0, aiChange: 0 },
        "slash": { playerChange: 0, aiChange: -0.5 }
    }
};

// 4. CORE FUNCTIONS
async function talkToGemini(customPrompt, systemInstruction) {
    const url = getApiUrl();
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: systemInstruction }] },
                contents: [{ parts: [{ text: customPrompt }] }]
            })
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (e) {
        console.error("API Error:", e);
        return "[[thrust]] The connection flickers...";
    }
}

function parseAiResponse(rawText) {
    const match = rawText.match(/\[\[(.*?)\]\]/);
    const move = match ? match[1].toLowerCase().trim() : "thrust";
    const taunt = rawText.replace(/\[\[.*?\]\]/g, "").trim();
    aiMoveHistory.push(move);
    return { move, taunt };
}

function executeRound(pMove, aMove, taunt, pChat) {
    // 1. Logic: Math stays in the background
    const result = duelRules[pMove][aMove];
    playerPoints += result.playerChange;
    aiPoints += result.aiChange;

    // Save to memory
    localStorage.setItem('pScore', playerPoints);
    localStorage.setItem('aScore', aiPoints);
    localStorage.setItem('aiHistory', JSON.stringify(aiMoveHistory));

    // 2. Scoreboard
    pScoreDisp.innerText = playerPoints.toFixed(1);
    aScoreDisp.innerText = aiPoints.toFixed(1);
    
    // 3. The Caller: The technical "Referee" announcement
    callerBox.innerHTML = `THE CALLER: "${pMove.toUpperCase()} vs ${aMove.toUpperCase()}!"`;

    // 4. The Log: Conversational History
    // If the player typed a message, show that. Otherwise, show the move.
    if (pChat) {
        postToLog("Player", `"${pChat}"`, "cyan");
    } else {
        postToLog("Player", `(Strikes with ${pMove})`, "cyan");
    }
    
    postToLog("AI", taunt, "magenta"); 
    
    checkGameOver();
}

function postToLog(sender, text, color) {
    const entry = document.createElement('p');
    entry.innerHTML = `<span style="color: ${color}">${sender}</span>: ${text}`;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}

function checkGameOver() {
    if (playerPoints <= 0 || aiPoints <= 0) {
        const winner = playerPoints > aiPoints ? "Player" : "The AI";
        callerBox.innerHTML = `THE CALLER: "${pMove.toUpperCase()} vs ${aMove.toUpperCase()}!"`;
        duelBtn.disabled = true;
    }
}

// 5. EVENT LISTENERS (Placed at the bottom so they can reference everything above)
duelBtn.addEventListener('click', async () => {
    const pMove = moveInput.value.toLowerCase().trim();
    const pChat = chatInput.value.trim(); // Capture chat first

    if (!duelRules[pMove]) {
        alert("Illegal move! Use: thrust, high-cut, low-cut, etc.");
        return;
    }

    // Clear inputs immediately for a better "feel"
    moveInput.value = ""; 
    chatInput.value = ""; 
    callerBox.innerHTML = `THE CALLER: "Player strikes! Awaiting AI..."`;

    const history = aiMoveHistory.slice(-3).join(", ");
    const systemPrompt = `You are role playing a Wise Sword Master. Include move in [[brackets]]. History: ${history}. No chaining same move back to back. Valid moves: thrust, high-cut, low-cut, lateral-parry, vertical-parry, stop-hit, side-step, duck, disengage, slash.`;
    
    // We send the pChat to Gemini so it can respond to the banter
    const userPrompt = `Score: P:${playerPoints} AI:${aiPoints}. Player Message: "${pChat}". (The player has sent their move, now you make yours!)`;

    const rawText = await talkToGemini(userPrompt, systemPrompt);
    const aiData = parseAiResponse(rawText);

    // Pass pChat to the executor so it can be logged alongside the AI's taunt
    executeRound(pMove, aiData.move, aiData.taunt, pChat);
});

if (sendChatBtn) {
    sendChatBtn.addEventListener('click', async () => {
        const pChat = chatInput.value.trim();
        if (!pChat) return;
        chatInput.value = "";
        postToLog("Player", pChat, "cyan");

        const response = await talkToGemini(pChat, "You are a role play Duelist in banter mode. No brackets needed.");
        postToLog("AI", response, "magenta");
    });
}

// Sidebar & Modal Functions
function toggleSidebar() {
    const sidebar = document.getElementById('dev-sidebar');
    sidebar.classList.toggle('sidebar-hidden');
}

function resetGame() {
    if (confirm("Reset match? This wipes the scores from memory!")) {
        localStorage.removeItem('pScore');
        localStorage.removeItem('aScore');
        localStorage.removeItem('aiHistory');
        location.reload(); 
    }
}

async function openReadmeModal() {
    let modal = document.getElementById('readme-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'readme-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <button onclick="closeReadmeModal()" style="float:right; background:red; color:white;">CLOSE</button>
                <h2 style="color:gold;">Arena Information & Legal</h2>
                <div id="readme-text" style="white-space: pre-wrap; text-align: left; font-size: 0.9rem; color: #00ff00;">Loading...</div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.style.display = 'flex';
    try {
        const response = await fetch('https://raw.githubusercontent.com/MEthridge902003/duel-of-swords/main/README.txt');
        const text = await response.text();
        document.getElementById('readme-text').innerText = text;
    } catch (e) {
        document.getElementById('readme-text').innerText = "Visit GitHub for details.";
    }
}

function closeReadmeModal() {
    document.getElementById('readme-modal').style.display = 'none';
}