function getRemainingHours(deadline) {
  const diff = deadline.getTime() - Date.now();
  return Math.floor(diff / (1000 * 60 * 60));
}

function isFuture(date) {
  return date.getTime() > Date.now();
}

module.exports = {
  getRemainingHours,
  isFuture,
};
