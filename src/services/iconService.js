// Custom hook to handle icon positioning logic
export const useIcon = () => {
    // Function to calculate icon position based on type, id, and theme
    const handleIconPosition = (type, id, theme) => {
        // Mapping of icon sizes to their Y-axis positions
        const yArray = { '256': 0, '128': 512, '64': 640, '32': 704, '16': 736 };
        
        // Special handling for 256px icons
        if (type === 256) {
            // Returns X and Y positions for 256px icons
            return [(256 * (id === 0 ? 7 : id )), (!theme ? 0 : 256)]; // Ignore id "0" for 256px icons, replace with 7 for empty icon
        };
        
        // Returns X and Y positions for other icon sizes
        // X position is negative to shift the icon, Y position is based on yArray
        return [`-${((256 * id) + (!theme ? (type - type) : type))}`, `-${yArray[type]}`];
    };

    // Expose the handleIconPosition function
    return { handleIconPosition };
}