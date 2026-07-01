export const Rates: Record<string, Record<string, number>> = {
    RUB: { 
        USD: 0.0098, 
        USDT: 0.0098, 
        VND: 320 
    },
    USD: { 
        RUB: 102, 
        USDT: 1, 
        VND: 25400 
    },
    USDT: { 
        RUB: 102, 
        USD: 1, 
        VND: 25400 
    },
    VND: { 
        RUB: 0.00312, 
        USD: 0.000039, 
        USDT: 0.000039 
    },
};