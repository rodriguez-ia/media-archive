export const getDailyRandom = (min = 0, max = 5) => {
    const date = new Date();
    const seed = date.getFullYear() * 10000
        + (date.getMonth() + 1) * 100
        + date.getDate();

    // Deterministic pseudo-random number
    const random = Math.sin(seed) * 10000;
    const normalized = random - Math.floor(random);

    return Math.floor(normalized * (max - min + 1)) + min;
}
