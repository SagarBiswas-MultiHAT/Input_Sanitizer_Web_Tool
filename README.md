# Input Sanitizer Web Tool

## Overview
The Input Sanitizer Web Tool is designed to help users sanitize potentially malicious HTML/JS input. It removes dangerous tags and attributes, providing a safe and clean output.

## Features
- **Sanitize Input**: Removes `<script>` tags and dangerous attributes like `onclick`, `onerror`, etc.
- **Suggestions**: Provides recommendations for safer input practices.
- **Clear Input/Output**: Reset the input and output fields with a single click.
- **Download Output**: Save the sanitized output as a text file.
- **Character Count**: Displays the number of characters in the input and output fields.
- **Dark Mode**: Toggle between light and dark themes for better accessibility.

## How to Use
1. Paste your potentially malicious input in the input field.
2. Click the "Sanitize" button to see the sanitized output.
3. Review the suggestions for improving input safety.
4. Use the "Clear" button to reset the fields or "Download" to save the output.

## Technologies Used
- **HTML**: Structure of the web tool.
- **CSS**: Styling for a professional and responsive design.
- **JavaScript**: Logic for sanitization, suggestions, and additional features.

## Examples
Refer to the `example.txt` file for input examples and their expected sanitized outputs.

## Screenshots
![Screenshot of Input Sanitizer Web Tool](https://imgur.com/oggV4Bf.png)
![Dark MODE](https://imgur.com/X31yEEC.png)


## Future Enhancements
- Add support for more advanced sanitization using libraries like DOMPurify.
- Include a dark mode for better accessibility.
- Add unit tests for various input scenarios.

## License
This project is open-source and available under the MIT License.
