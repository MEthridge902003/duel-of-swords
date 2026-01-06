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