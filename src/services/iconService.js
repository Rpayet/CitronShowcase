export const useIcon = () => {
    const handleIconPosition = (type, id, theme) => {
        const yArray = { '256': 0, '128': 512, '64': 640, '32': 704, '16': 736 };
        if (type === 256) {
            return [(256 * id), (!theme ? 0 : 256)];
        };
        return [`-${((256 * id) + (!theme ? (type - type) : type))}`,`-${yArray[type]}`];
    };

    return { handleIconPosition };
} 