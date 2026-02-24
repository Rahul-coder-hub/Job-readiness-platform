import React from 'react';

const ProgressBar = ({ value, max = 100, className = "" }) => (
    <div className={`w-full bg-gray-100 rounded-full h-2 overflow-hidden ${className}`}>
        <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(value / max) * 100}%` }}
        />
    </div>
);

export default ProgressBar;
