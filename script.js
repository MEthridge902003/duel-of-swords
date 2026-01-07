// 1. CONFIGURATION & STATE
const API_KEY = "Your-Gemini-API"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

let playerPoints = 5.0;
let aiPoints = 5.0;
let aiMoveHistory = [];

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

// 2. DOM ELEMENTS
const moveInput = document.getElementById('move-input');
const chatInput = document.getElementById('chat-input');
const duelBtn = document.getElementById('duel-btn');
const callerBox = document.getElementById('caller-display');
const log = document.getElementById('duel-log');
const pScoreDisp = document.getElementById('p-score');
const aScoreDisp = document.getElementById('a-score');

// 3. CORE ENGINE LOGIC
duelBtn.addEventListener('click', async () => {
    const pMove = moveInput.value.toLowerCase().trim();
    const pChat = chatInput.value.trim();

    if (!duelRules[pMove]) {
        alert("Illegal move! Use: thrust, high-cut, low-cut, etc.");
        return;
    }

    moveInput.value = ""; 
    chatInput.value = ""; 
    callerBox.innerHTML = `THE CALLER: "Player strikes! Awaiting AI..."`;

    try {
        const rawText = await getAiMove(playerPoints, aiPoints, pChat);
        const aiData = parseAiResponse(rawText);
        executeRound(pMove, aiData.move, aiData.taunt);
    } catch (error) {
        console.error(error);
        callerBox.innerHTML = `THE CALLER: "Arena error! Try again."`;
    }
});

function executeRound(pMove, aMove, taunt) {
    const result = duelRules[pMove][aMove];
    playerPoints += result.playerChange;
    aiPoints += result.aiChange;

    pScoreDisp.innerText = playerPoints.toFixed(1);
    aScoreDisp.innerText = aiPoints.toFixed(1);
    callerBox.innerHTML = `THE CALLER: "${pMove.toUpperCase()} vs ${aMove.toUpperCase()}!"`;

    const entry = document.createElement('p');
    entry.innerHTML = `
        <span style="color: cyan">Player</span>: ${pMove}<br>
        <span style="color: magenta">AI</span>: ${aMove}<br>
        <em>"${taunt}"</em>
    `;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
    checkGameOver();
}

// 4. AI & PARSING
async function getAiMove(pScore, aScore, userChat) {
    const history = aiMoveHistory.slice(-3).join(", ");
    const promptData = {
        system_instruction: {
            parts: [{ text: `You are an RDI Master. Include move in [[brackets]]. Rules: 1. Don't repeat moves: ${history}. 2. Valid moves: thrust, high-cut, low-cut, lateral-parry, vertical-parry, stop-hit, side-step, duck, disengage.` }]
        },
        contents: [{ parts: [{ text: `Score: Player ${pScore}, AI ${aScore}. Player says: "${userChat}"` }] }]
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promptData)
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

function parseAiResponse(rawText) {
    const match = rawText.match(/\[\[(.*?)\]\]/);
    const move = match ? match[1].toLowerCase().trim() : "thrust";
    const taunt = rawText.replace(/\[\[.*?\]\]/g, "").trim();
    aiMoveHistory.push(move);
    return { move, taunt };
}

// 5. UI TOOLS (SIDEBAR FIX)
function toggleSidebar() {
    const sidebar = document.getElementById('dev-sidebar');
    const openBtn = document.getElementById('open-sidebar-btn');
    
    sidebar.classList.toggle('sidebar-hidden');
    
    // Safety check: if button exists, toggle its visibility
    if (openBtn) {
        openBtn.style.display = sidebar.classList.contains('sidebar-hidden') ? 'block' : 'none';
    }
}

// A dedicated function for pre/post game chatter
async function sendFlavorChat() {
    const pChat = chatInput.value.trim();
    if (!pChat) return;

    // Clear the input and show your text in the log immediately
    chatInput.value = "";
    const entry = document.createElement('p');
    entry.innerHTML = `<span style="color: cyan">Player:</span> ${pChat}`;
    log.appendChild(entry);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: "You are an RDI Duelist. The game is currently paused or in banter mode. Respond to the player with witty roleplay. No brackets needed." }] },
                contents: [{ parts: [{ text: pChat }] }]
            })
        });

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        const aiEntry = document.createElement('p');
        aiEntry.innerHTML = `<span style="color: magenta">AI:</span> ${aiResponse}`;
        log.appendChild(aiEntry);
        log.scrollTop = log.scrollHeight;

    } catch (e) {
        console.error("Chat error:", e);
    }
}

// Attach this to your "Send Chat" button
if (sendChatBtn) {
    sendChatBtn.addEventListener('click', sendFlavorChat);
}

function checkGameOver() {
    if (playerPoints <= 0 || aiPoints <= 0) {
        const winner = playerPoints > aiPoints ? "Player" : "The AI";
        callerBox.innerHTML = `THE CALLER: "${winner.toUpperCase()} VICTORIOUS!"`;
        duelBtn.disabled = true;
    }
}