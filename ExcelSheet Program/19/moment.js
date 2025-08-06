const now = moment(); 
const formattedExamples = `
Current Date & Time: ${now.format()}
Custom Format: ${now.format('MMMM Do YYYY, h:mm:ss a')}
Day of Week:  ${now.format('dddd')}
Short Date: ${now.format('MM/DD/YYYY')}
Time Only: ${now.format('HH:mm:ss')}
Relative Time: ${now.fromNow()}
Start of the Day: ${now.startOf('day').format('HH:mm')}
`;
document.getElementById('output').textContent = formattedExamples;