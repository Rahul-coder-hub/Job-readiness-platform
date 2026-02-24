const STORAGE_KEY = 'prp_test_checklist';

const DEFAULT_TESTS = [
    { id: 'jd-req', label: 'JD required validation works', hint: 'Try submitting with empty JD.', passed: false },
    { id: 'short-jd', label: 'Short JD warning shows for <200 chars', hint: 'Paste "hello" and see if amber warning appears.', passed: false },
    { id: 'skills-group', label: 'Skills extraction groups correctly', hint: 'Ensure React is in "Web", Java in "Languages".', passed: false },
    { id: 'round-mapping', label: 'Round mapping changes based on company + skills', hint: 'Compare Enterprise vs Startup mappings.', passed: false },
    { id: 'score-det', label: 'Score calculation is deterministic', hint: 'Same JD should yield same base score.', passed: false },
    { id: 'live-score', label: 'Skill toggles update score live', hint: 'Click a skill and see score change ±2.', passed: false },
    { id: 'persistence', label: 'Changes persist after refresh', hint: 'Toggle a skill, refresh page, verify state.', passed: false },
    { id: 'history-res', label: 'History saves and loads correctly', hint: 'Check if new analysis appears in History list.', passed: false },
    { id: 'export-copy', label: 'Export buttons copy the correct content', hint: 'Click export and paste in notepad.', passed: false },
    { id: 'no-console', label: 'No console errors on core pages', hint: 'Open DevTools (F12) and check for red logs.', passed: false }
];

export const getChecklist = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TESTS;
    try {
        return JSON.parse(raw);
    } catch (e) {
        return DEFAULT_TESTS;
    }
};

export const updateChecklist = (tests) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tests));
};

export const resetChecklist = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TESTS));
    return DEFAULT_TESTS;
};

export const isChecklistComplete = () => {
    const tests = getChecklist();
    return tests.every(t => t.passed);
};

export const getChecklistSummary = () => {
    const tests = getChecklist();
    const passed = tests.filter(t => t.passed).length;
    return { passed, total: tests.length };
};
