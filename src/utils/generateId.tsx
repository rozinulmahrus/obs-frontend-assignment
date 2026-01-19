export const generateRandomId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};
