const REFRESH_KEY = "isPageRefreshed";

export const isPageRefreshed = () => {
    const refreshed = sessionStorage.getItem(REFRESH_KEY) === "true";
    setTimeout(() => {
        sessionStorage.setItem(REFRESH_KEY, "false");
    }, 500) // Réinitialise après lecture
    return refreshed;
};

// Met à jour l'état lors du rechargement de la page
export const setPageRefreshState = () => {
    sessionStorage.setItem(REFRESH_KEY, "true");
};

// Initialisation lors du chargement du script
setPageRefreshState();
