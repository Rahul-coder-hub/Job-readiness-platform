const SKILL_CATEGORIES = {
    "Core CS": ["DSA", "OOP", "DBMS", "OS", "Networks"],
    "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    "Web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    "Data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    "Testing": ["Selenium", "Cypress", "Playwright", "JUnit", "Pytest"]
};

export const analyzeJD = (company, role, jdText) => {
    const extractedSkills = {};
    const skillConfidenceMap = {};
    const allSkills = [];
    let detectedCategoriesCount = 0;

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const matched = skills.filter(skill =>
            new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(jdText)
        );
        if (matched.length > 0) {
            extractedSkills[category] = matched;
            matched.forEach(s => skillConfidenceMap[s] = 'practice');
            allSkills.push(...matched);
            detectedCategoriesCount++;
        }
    });

    if (allSkills.length === 0) {
        extractedSkills["General"] = ["General fresher stack"];
        skillConfidenceMap["General fresher stack"] = 'practice';
    }

    // Scoring
    let score = 35;
    score += Math.min(detectedCategoriesCount * 5, 30);
    if (company.trim()) score += 10;
    if (role.trim()) score += 10;
    if (jdText.length > 800) score += 10;
    score = Math.min(score, 100);

    // Round-wise Checklist
    const checklist = [
        { round: "Round 1: Aptitude / Basics", items: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Basic Programming MCQs", "Company Culture MCQ"] },
        { round: "Round 2: DSA + Core CS", items: ["Data Structures (Arrays, Trees, Graphs)", "Algorithm Complexity Analysis", "OOP Principles", "DBMS Joins and Normalization", "OS Semaphores/Paging basics"] },
        { round: "Round 3: Tech Interview", items: ["Project Deep-dive (Architecture)", "Stack specific deep-dive", ...allSkills.map(s => `${s} Implementation Questions`), "Debugging exercise", "System Design (Scalability)"] },
        { round: "Round 4: Managerial / HR", items: ["Situation-based questions (STAR)", "Why this company?", "Relocation/Contract discussion", "Strength/Weakness analysis", "Long-term goals alignment"] }
    ];

    // 7-Day Plan
    const plan = [
        { day: "Day 1-2", topics: ["Basics of Programming", "Core CS Fundamentals (OS/DBMS)", "Aptitude Brush-up"] },
        { day: "Day 3-4", topics: ["DSA Topic-wise Practice", "Coding Problem Solving (LeetCode)", "Algorithm Revision"] },
        { day: "Day 5", topics: ["Project Review", "Resume Alignment", "Stack Deep-dive"] },
        { day: "Day 6", topics: ["Mock Interview Questions", "Behavioral Prep", "Company Research"] },
        { day: "Day 7", topics: ["Full Revision", "Weak Area Focus", "Logistics Check"] }
    ];

    // Adapt plan based on detected categories
    if (extractedSkills["Web"]) {
        plan[2].topics.push("Frontend/Backend Framework revision");
    }
    if (extractedSkills["Cloud/DevOps"]) {
        plan[3].topics.push("Cloud Infrastructure & CI/CD pipeline basics");
    }

    // Interview Questions (Top 10)
    const questionTemplates = {
        "SQL": "Explain indexing and how it helps in optimizing queries.",
        "React": "Explain state management options in React and their trade-offs.",
        "DSA": "How would you optimize search in sorted versus unsorted data?",
        "Java": "Explain the difference between final, finally, and finalize.",
        "Python": "How are lists and tuples different in terms of memory?",
        "Node.js": "How does the event loop work in Node.js?",
        "Networks": "Explain the 7 layers of the OSI model and where HTTP resides.",
        "DBMS": "What are ACID properties and why are they important?",
        "OS": "Explain the difference between a process and a thread.",
        "Docker": "What is the difference between an image and a container?",
        "REST": "What are the common HTTP status codes and their meanings?",
        "Next.js": "What is the difference between SSR and SSG?",
        "MongoDB": "What are the advantages of NoSQL over traditional SQL databases?"
    };

    const questions = [];
    allSkills.forEach(skill => {
        if (questionTemplates[skill]) {
            questions.push(questionTemplates[skill]);
        }
    });

    // Fill up to 10 questions if we don't have enough
    const defaultQuestions = [
        "Tell me about a challenging project you've worked on.",
        "How do you handle disagreements in a team setting?",
        "What is your approach to learning a new technology rapidly?",
        "Explain the Time and Space complexity of your most used algorithm.",
        "How do you ensure code quality in your projects?"
    ];

    while (questions.length < 10 && defaultQuestions.length > 0) {
        const q = defaultQuestions.shift();
        if (!questions.includes(q)) questions.push(q);
    }

    return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        company,
        role,
        jdText,
        extractedSkills,
        plan,
        checklist,
        questions: questions.slice(0, 10),
        readinessScore: score,
        baseReadinessScore: score,
        skillConfidenceMap
    };
};

export const saveToHistory = (analysis) => {
    const history = JSON.parse(localStorage.getItem('placement_prep_history') || '[]');
    history.unshift(analysis);
    localStorage.setItem('placement_prep_history', JSON.stringify(history));
};

export const updateHistoryEntry = (id, updates) => {
    const history = getHistory();
    const index = history.findIndex(item => item.id === id);
    if (index !== -1) {
        history[index] = { ...history[index], ...updates };
        localStorage.setItem('placement_prep_history', JSON.stringify(history));
        return history[index];
    }
    return null;
};

export const getHistory = () => {
    return JSON.parse(localStorage.getItem('placement_prep_history') || '[]');
};

export const getAnalysisById = (id) => {
    const history = getHistory();
    return history.find(item => item.id === id);
};
