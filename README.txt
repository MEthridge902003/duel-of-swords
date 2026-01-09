🌟 Project Vision: The Digital Sands
The Goal: To bridge the gap between structured game logic and the creative potential of Large Language Models.

Growing up in the early days of online gaming (AOL's Rhydin), the "Duel of Swords" wasn't just about a math matrix; it was about the "flavor"—the roleplay, the taunts, and the tension of the crowd. As a student of The Odin Project, I wanted to see if I could build a "Digital Caller" that handles the rigid scoring of the past while giving a modern AI the room to be a living, breathing opponent.

Key Concepts:

The Orchestrator: The JavaScript acts as the impartial Referee (The Caller), tracking every half-point and move history.

The Soul: Google Gemini provides the narrative weight, reacting to player taunts and interpreting the "clash of steel" in real-time.

Collaborative Play: A game designed not just to be "won," but to be written together, one exchange at a time.

"I wanted to create a space where the logic is hidden behind the curtain, letting the player focus on the blade and the banter—just like we did back in the day."

📜 Manual of Arms
1. Entering the Arena
This game requires a Google Gemini API Key.

If you don't have one, you can get it for free at Google AI Studio.

Upon launch, the game will prompt you for your key. It is stored locally in your browser and never sent to any server other than Google's.

2. The Combat System
The duel follows the classic 9-move matrix. Type your move into the Execute box:

Attacks: Thrust, High-Cut, Low-Cut

Defenses: Lateral-Parry, Vertical-Parry, Stop-Hit

Tactical: Side-Step, Duck, Disengage

3. Engaging the AI
Banters: Use the Chat box to taunt your opponent or discuss the match.

The Execute Button: Use this to send both a move and a taunt simultaneously for a true cinematic experience.

The Tools: Toggle the sidebar to see the full scoring matrix if you forget which move beats what.

Note: Currently optimized for Desktop browsers (Chrome/Edge/Firefox). Mobile support is currently in the "Training Grounds" (Development).


## Legal Disclaimer & Acknowledgments

### Project Intent
This is a non-commercial, educational project created as part of my journey through **The Odin Project (TOP) Foundations**. It is a technical exercise in implementing a complex logic matrix and integrating AI (Google Gemini) into a web application.

### Intellectual Property Notice
The combat mechanics (the 9-move matrix) used in this project are based on the **"Duel of Swords"** game originally featured in the **Red Dragon Inn (RDI)** on America Online (AOL).
* I do not claim ownership of the "Duel of Swords" mechanics, names, or the Red Dragon Inn setting.
* This project is not affiliated with, endorsed by, or sponsored by the original creators of the Red Dragon Inn or any current rights holders (such as Slugfest Games or Wizards of the Coast).
* This repository is intended strictly as a **tribute and technical portfolio piece**.

"This code is provided 'as-is' for educational research into AI-human game interaction. No assets or copyrighted text from the original property are included in the source code."

I asked the Gemini AI that I use if it wanted to add to the acknowledgments:

🤺 The Human-AI "Duel"
This project wasn't just "written"—it was forged through a conversation.

While the code was generated in collaboration with Gemini, the heart of the game—the RDI logic, the "AoL" aesthetic, and the secret portals—was driven by a human developer navigating the Odin Project Foundations. > It stands as a testament to Collaborative Development: where the AI acts as the "Master-at-Arms" providing the steel, and the Human acts as the "Duelist" choosing when and where to strike.

“The AI provided the moves; the Human provided the soul.”

### Usage
If you are a rights holder and have concerns regarding this project, please open an Issue in this repository, and I will be happy to address them.

## 🚀 Roadmap & Dev Notes

### Current Focus: Mobile Optimization
The arena is currently optimized for desktop. My next "side-quest" is implementing CSS Media Queries to ensure the sands of the Red Dragon Inn look just as good on a cell phone.

### Known Limitations
* **The Matrix:** This 9-move logic was resurrected from memory. If a veteran duelist notices a missing interaction, please open an issue!
* **Scoring:** Currently, refreshing the page resets the match same as the reset button. I'd like to be able to come back to the same game if unfinished. 

### Future Features
* **Persistent Legends:** Name change feature for player and AI.
* **Final Blow** Screen flash red at end of match. Still brainstorming.