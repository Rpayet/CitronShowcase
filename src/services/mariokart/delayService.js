export function getTimeRemaining(date) {
    const targetDate = new Date(date);
    const currentDate = new Date();

    const timeRemaining = targetDate - currentDate;

    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const hours = Math.floor(((timeRemaining / (1000 * 60 * 60)) % 24) - 1);
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);

    if (months > 0) {
        return `${months} mois restant`;
    } else if (days > 0) {
        return `${days} jours restant`;
    } else if (hours > 0) {
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
    } else if (minutes > 0) {
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    } else {
        return `${seconds} s`;
    }
}