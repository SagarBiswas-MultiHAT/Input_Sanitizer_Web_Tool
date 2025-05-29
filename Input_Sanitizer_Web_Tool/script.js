document.getElementById('sanitizeButton').addEventListener('click', () => {
    const input = document.getElementById('input').value;
    const outputElement = document.getElementById('output');
    const suggestionsList = document.getElementById('suggestionsList');

    // Clear previous suggestions
    suggestionsList.innerHTML = '';

    // Sanitize input
    const sanitizedOutput = sanitizeInput(input);
    outputElement.value = sanitizedOutput;

    // Update input character count
    document.getElementById('inputCharCount').textContent = input.length;

    // Update output character count
    document.getElementById('outputCharCount').textContent = sanitizedOutput.length;

    // Provide suggestions
    const suggestions = generateSuggestions(input);
    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionsList.appendChild(li);
    });
});

document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('input').value = '';
    document.getElementById('output').value = '';
    document.getElementById('inputCharCount').textContent = '0';
    document.getElementById('outputCharCount').textContent = '0';
    document.getElementById('suggestionsList').innerHTML = '';
});

document.getElementById('downloadButton').addEventListener('click', () => {
    const output = document.getElementById('output').value;
    const blob = new Blob([output], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'sanitized_output.txt';
    a.click();
    URL.revokeObjectURL(a.href);
});

function sanitizeInput(input) {
    // Remove <script> tags
    let sanitized = input.replace(/<script.*?>.*?<\/script>/gi, '');

    // Remove dangerous attributes like onerror, onclick, etc.
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*(['"]).*?\1/gi, '');

    // Remove javascript: URLs
    sanitized = sanitized.replace(/javascript:/gi, '#');

    // Remove inline styles with dangerous content
    sanitized = sanitized.replace(/style\s*=\s*(['"]).*?javascript:.*?\1/gi, '');

    // Retain <style> tags but provide suggestions for untrusted CSS
    sanitized = sanitized.replace(/<style.*?>.*?javascript:.*?\(.*?\).*?<\/style>/gi, '<style>/* sanitized */</style>');

    // Ensure <style> tags are sanitized but retain safe content
    sanitized = sanitized.replace(/<style>(.*?)<\/style>/gi, (match, content) => {
        // Remove potentially malicious URLs in CSS
        const sanitizedContent = content.replace(/url\(['"]?javascript:.*?['"]?\)/gi, 'url(#)');
        return `<style>${sanitizedContent}</style>`;
    });

    // Remove hidden malicious content
    sanitized = sanitized.replace(/style\s*=\s*(['"]).*?display\s*:\s*none.*?\1/gi, '');

    // Remove dangerous href attributes
    sanitized = sanitized.replace(/href\s*=\s*(['"])javascript:.*?\1/gi, 'href="#"');

    // Remove any remaining dangerous patterns
    sanitized = sanitized.replace(/<.*?on\w+\s*=\s*(['"]).*?\1.*?>/gi, '');

    // Remove iframe tags
    sanitized = sanitized.replace(/<iframe.*?>.*?<\/iframe>/gi, '');

    // Remove embed tags
    sanitized = sanitized.replace(/<embed.*?>.*?<\/embed>/gi, '');

    // Remove object tags
    sanitized = sanitized.replace(/<object.*?>.*?<\/object>/gi, '');

    // Trim extra spaces left after sanitization
    sanitized = sanitized.replace(/>\s+</g, '><');

    // Trim unnecessary spaces in tag attributes
    sanitized = sanitized.replace(/<\s*(\w+)\s+>/g, '<$1>');

    return sanitized;
}

function generateSuggestions(input) {
    const suggestions = [];

    if (/<script.*?>.*?<\/script>/gi.test(input)) {
        suggestions.push('Avoid using <script> tags in your input.');
    }

    if (/\s*on\w+\s*=\s*(['"]).*?\1/gi.test(input)) {
        suggestions.push('Avoid using inline event handlers like onclick, onerror, etc.');
    }

    if (/javascript:/gi.test(input)) {
        suggestions.push('Avoid using javascript: URLs in your input.');
    }

    if (/style\s*=\s*(['"]).*?javascript:.*?\1/gi.test(input)) {
        suggestions.push('Avoid using dangerous inline styles.');
    }

    if (/<style.*?>.*?<\/style>/gi.test(input)) {
        suggestions.push('Avoid embedding untrusted CSS.');
    }

    if (/style\s*=\s*(['"]).*?display\s*:\s*none.*?\1/gi.test(input)) {
        suggestions.push('Avoid using styles that hide malicious content.');
    }

    if (/document\.body\.innerHTML/gi.test(input)) {
        suggestions.push('Avoid directly manipulating the DOM with untrusted input.');
    }

    if (/localStorage|sessionStorage|document\.cookie/gi.test(input)) {
        suggestions.push('Avoid executing untrusted JavaScript that accesses sensitive data.');
    }

    if (/['"].*?['"].*?=.*?['"].*?['"]/gi.test(input)) {
        suggestions.push('Use parameterized queries to prevent SQL injection.');
    }

    if (/<iframe.*?>.*?<\/iframe>/gi.test(input)) {
        suggestions.push('Avoid using <iframe> tags to prevent embedding malicious content.');
    }

    if (/<embed.*?>.*?<\/embed>/gi.test(input)) {
        suggestions.push('Avoid using <embed> tags to prevent embedding malicious content.');
    }

    if (/<object.*?>.*?<\/object>/gi.test(input)) {
        suggestions.push('Avoid using <object> tags to prevent embedding malicious content.');
    }

    return suggestions;
}

