const SKILL_CATEGORIES = {
    "Core CS": ["DSA", "OOP", "DBMS", "OS", "Networks"],
    "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    "Web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    "Data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    "Testing": ["Selenium", "Cypress", "Playwright", "JUnit", "Pytest"]
};

export const analyzeJD = (company, role, jdText) => {
    const extractedSkills = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };
    const skillConfidenceMap = {};
    const allSkills = [];
    let detectedCategoriesCount = 0;

    const categoryMap = {
        "Core CS": "coreCS",
        "Languages": "languages",
        "Web": "web",
        "Data": "data",
        "Cloud/DevOps": "cloud",
        "Testing": "testing"
    };

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const matched = skills.filter(skill =>
            new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(jdText)
        );
        if (matched.length > 0) {
            const schemaKey = categoryMap[category];
            extractedSkills[schemaKey] = matched;
            matched.forEach(s => skillConfidenceMap[s] = 'practice');
            allSkills.push(...matched);
            detectedCategoriesCount++;
        }
    });

    // Default behavior if no skills detected
    if (allSkills.length === 0) {
        extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
        extractedSkills.other.forEach(s => {
            skillConfidenceMap[s] = 'practice';
            allSkills.push(s);
        });
    }

    // Company Intel Heuristics
    const enterpriseList = ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Netflix", "TCS", "Infosys", "Wipro", "HCL", "Accenture", "IBM", "Oracle", "Salesforce", "Cisco", "Intel"];
    const isEnterprise = enterpriseList.some(e => new RegExp(e, 'i').test(company));

    const companyIntel = {
        industry: jdText.match(/finance|fintech|bank/i) ? "FinTech" :
            jdText.match(/health|medical/i) ? "HealthTech" :
                jdText.match(/e-commerce|retail/i) ? "E-commerce" : "Technology Services",
        size: isEnterprise ? "Enterprise (2000+)" : (company.length > 0 ? "Startup (<200)" : "N/A"),
        hiringFocus: isEnterprise ? "Structured DSA + Core Fundamentals" : "Practical Problem Solving + Stack Depth",
        isEnterprise
    };

    // Dynamic Round Mapping
    let rounds = [];
    if (isEnterprise) {
        rounds = [
            {
                roundTitle: "Round 1: OA & Aptitude",
                whyItMatters: "To filter candidates based on logical reasoning and basic coding speed.",
                focusAreas: ["Speed-coding DSA", "Aptitude MCQs", "Core CS Basics"]
            },
            {
                roundTitle: "Round 2: Technical Interview I",
                whyItMatters: "Deep dive into Data Structures and Algorithm efficiency.",
                focusAreas: ["Array/String Logic", "Tree/Graph Traversal", "Complexity Analysis"]
            },
            {
                roundTitle: "Round 3: Technical Interview II",
                whyItMatters: "Evaluates project knowledge and core engineering principles like DBMS/OS.",
                focusAreas: ["Project Architecture", "System Design Basics", "Core CS (Database/OS)"]
            },
            {
                roundTitle: "Round 4: Managerial/HR",
                whyItMatters: "Assesses cultural fit and alignment with company core values.",
                focusAreas: ["Behavioral (STAR)", "Conflict Resolution", "Salary/Logistics"]
            }
        ];
    } else {
        rounds = [
            {
                roundTitle: "Round 1: Machine Coding / Practical",
                whyItMatters: "Startups value build speed and your ability to write clean, working code.",
                focusAreas: [`Build a small ${allSkills[0] || 'Feature'}`, "API Integration", "State Management"]
            },
            {
                roundTitle: "Round 2: Technical Discussion",
                whyItMatters: "Evaluates depth in chosen stack and architectural thinking.",
                focusAreas: ["Stack-specific deep dive", "Framework internals", "Debugging Skills"]
            },
            {
                roundTitle: "Round 3: Founder / Culture Round",
                whyItMatters: "Ensures you can thrive in a fast-paced, high-ownership environment.",
                focusAreas: ["Vision alignment", "Product thinking", "High-ownership mindset"]
            }
        ];
    }

    // Scoring logic (baseScore computed only once)
    let score = 35;
    score += Math.min(detectedCategoriesCount * 5, 30);
    if (company.trim()) score += 10;
    if (role.trim()) score += 10;
    if (jdText.length > 800) score += 10;
    score = Math.min(score, 100);

    // 7-Day Plan
    const plan = [
        { day: "Day 1-2", focus: "Core CS Fundamentals", tasks: ["Basics of Programming", "Core CS Fundamentals (OS/DBMS)", "Aptitude Brush-up"] },
        { day: "Day 3-4", focus: "DSA Topic-wise Practice", tasks: ["DSA Topic-wise Practice", "Coding Problem Solving (LeetCode)", "Algorithm Revision"] },
        { day: "Day 5", focus: "Projects & Portfolio", tasks: ["Project Review", "Resume Alignment", "Stack Deep-dive"] },
        { day: "Day 6", focus: "Mock Drills", tasks: ["Mock Interview Questions", "Behavioral Prep", "Company Research"] },
        { day: "Day 7", focus: "Final Revision", tasks: ["Full Revision", "Weak Area Focus", "Logistics Check"] }
    ];

    // Adapt plan
    if (extractedSkills.web.length > 0) {
        plan[2].tasks.push("Frontend/Backend Framework revision");
    }
    if (extractedSkills.cloud.length > 0) {
        plan[3].tasks.push("Cloud Infrastructure & CI/CD pipeline basics");
    }

    // Interview Questions
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
        updatedAt: new Date().toISOString(),
        company: company || "",
        role: role || "",
        jdText,
        extractedSkills,
        roundMapping: rounds,
        checklist: rounds.map(r => ({ roundTitle: r.roundTitle, items: r.focusAreas })),
        plan7Days: plan,
        questions: questions.slice(0, 10),
        baseScore: score,
        finalScore: score,
        skillConfidenceMap,
        companyIntel
    };
};

export const saveToHistory = (analysis) => {
    const { list: history } = getHistory();
    history.unshift(analysis);
    localStorage.setItem('placement_prep_history', JSON.stringify(history));
};

export const updateHistoryEntry = (id, updates) => {
    const { list: history } = getHistory();
    const index = history.findIndex(item => item.id === id);
    if (index !== -1) {
        const updatedEntry = {
            ...history[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        history[index] = updatedEntry;
        localStorage.setItem('placement_prep_history', JSON.stringify(history));
        return updatedEntry;
    }
    return null;
};

export const getHistory = () => {
    const rawData = localStorage.getItem('placement_prep_history');
    if (!rawData) return { list: [], corrupted: false };

    try {
        const parsed = JSON.parse(rawData);
        if (!Array.isArray(parsed)) throw new Error("Not an array");

        const validList = parsed.filter(entry => {
            return entry && typeof entry === 'object' && entry.id && entry.jdText;
        });

        return {
            list: validList,
            corrupted: validList.length !== parsed.length
        };
    } catch (e) {
        return { list: [], corrupted: true };
    }
};

export const getAnalysisById = (id) => {
    const { list: history } = getHistory();
    return history.find(item => item.id === id);
};
