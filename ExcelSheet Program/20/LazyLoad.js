const button = document.getElementById('loadBtn')
const output = document.getElementById('output')
 button.addEventListener('click', async () => {
 output.textContent = "Loading moment.js..."
 const momentModule = await import('https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js')
 const moment = momentModule.default || momentModule;
const now = moment()
output.textContent = ` loaded lazily!
Formatted Date: ${now.format('MMMM Do YYYY, h:mm:ss a')}
Relative Time:  ${now.fromNow()}`});