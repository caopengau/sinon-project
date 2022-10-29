const api = require('./api.js');

/**
 * It takes a name as an argument and returns a greeting with the name and the current date
 * @param name - The name of the person to greet.
 * @returns Hello, ! Today is 
 */
async function greet(name = undefined) {    
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const now  = new Date();
  const formattedDate = now.toLocaleDateString("en-US", options);
  return `Hello, ${name || await api.callApi()}! Today is ${formattedDate}`;
}


module.exports = { greet };