// Placeholder for npm scripts whose work belongs to a later phase.
// Exits 0 so `npm run check` and CI stay green until the real script lands.
const [, , name, reason] = process.argv;
console.log(`${name}: nothing to run yet (${reason}).`);
