function convertFromISO8601(isoDuration) {
    const minutesMatch = isoDuration.match(/(\d+)M/);
    const secondsMatch = isoDuration.match(/(\d+)S/);

    // Extract minutes (default to 0 if not found)
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

    // Extract seconds (default to 0 if not found)
    const seconds = secondsMatch ? parseInt(secondsMatch[1]) : 0;

    // Format to m:ss (ensure seconds are always 2 digits)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const formatNumberWithCommas = (number) => {
    if (number >= 1_000_000) {
        // For millions, keep one decimal place
        return `${(number / 1_000_000).toFixed(2).replace(/\.0+$/, '')}M`;
    } else if (number >= 1_000) {
        // For thousands, keep no decimal places
        return `${(number / 1_000).toFixed(0)}K`;
    } else {
        // If less than a thousand, show the number as is
        return number.toString();
    }
  };


export { convertFromISO8601, formatNumberWithCommas };