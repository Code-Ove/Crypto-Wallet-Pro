export const translations = {
    en: {
        welcome: "Welcome to Crypto Wallet Pro",
        balance: "Total Balance",
        wallet: "Wallet",
        swap: "Swap",
        buySell: "Buy/Sell",
        networks: "Networks",
        connect: "Connect Wallet",
        disconnect: "Disconnect",
        receive: "Receive",
        send: "Send",
        buy: "Buy",
        sell: "Sell",
        price: "Price",
        fee: "Fee",
        confirm: "Confirm",
        cancel: "Cancel",
        bridge: "Bridge",
        stake: "Stake",
        farm: "Farm",
        lend: "Lend",
        borrow: "Borrow"
    },
    es: {
        welcome: "Bienvenido a Crypto Wallet Pro",
        balance: "Saldo Total",
        wallet: "Cartera",
        swap: "Intercambiar",
        buySell: "Comprar/Vender",
        networks: "Redes",
        connect: "Conectar Cartera",
        disconnect: "Desconectar",
        receive: "Recibir",
        send: "Enviar",
        buy: "Comprar",
        sell: "Vender",
        price: "Precio",
        fee: "Tarifa",
        confirm: "Confirmar",
        cancel: "Cancelar",
        bridge: "Puente",
        stake: "Apostar",
        farm: "Cultivar",
        lend: "Prestar",
        borrow: "Pedir Prestado"
    },
    fr: {
        welcome: "Bienvenue sur Crypto Wallet Pro",
        balance: "Solde Total",
        wallet: "Portefeuille",
        swap: "Échanger",
        buySell: "Acheter/Vendre",
        networks: "Réseaux",
        connect: "Connecter le Portefeuille",
        disconnect: "Déconnecter",
        receive: "Recevoir",
        send: "Envoyer",
        buy: "Acheter",
        sell: "Vendre",
        price: "Prix",
        fee: "Frais",
        confirm: "Confirmer",
        cancel: "Annuler",
        bridge: "Pont",
        stake: "Jalonner",
        farm: "Ferme",
        lend: "Prêter",
        borrow: "Emprunter"
    }
};

export const getLanguage = () => {
    return localStorage.getItem('language') || 'en';
};

export const setLanguage = (lang) => {
    localStorage.setItem('language', lang);
    window.location.reload(); // Refresh to apply language
};

export const t = (key) => {
    const lang = getLanguage();
    return translations[lang]?.[key] || key;
};