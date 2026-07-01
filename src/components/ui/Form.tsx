'use client';

import { useState, useEffect, useRef } from "react";
import { ChevronDown, CircleDollarSign, ArrowLeftRight } from "lucide-react";
import { Rates } from "@/shared/data/exchangeRate.data";

type CurrencyField = {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    value: number | '';
    onChange: (value: string) => void;
    currency: string;
    setCurrency: React.Dispatch<React.SetStateAction<string>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type ContactField = {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
};

type FormField = CurrencyField | ContactField;

export default function Form() {
    const [send, setSend] = useState<number | ''>('');
    const [receive, setReceive] = useState<number | ''>('');
    const [number, setNumber] = useState('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const [sendCurrency, setSendCurrency] = useState('RUB');
    const [receiveCurrency, setReceiveCurrency] = useState('VND');
    const [openSend, setOpenSend] = useState(false);
    const [openReceive, setOpenReceive] = useState(false);

    const sendRef = useRef<HTMLDivElement>(null);
    const receiveRef = useRef<HTMLDivElement>(null);

    // Форматирование с точкой (300.000)
    const formatNumber = (num: number | ''): string => {
        if (num === '' || num === 0) return '';
        return num.toLocaleString('de-DE');
    };

    const parseNumber = (value: string): number => {
        return Number(value.replace(/\./g, ''));
    };

    // Получаем курс
    const getRate = (from: string, to: string): number => {
        if (from === to) return 1;
        return Rates[from]?.[to] || 1;
    };

    // Пересчёт при смене валют
    useEffect(() => {
        if (send === '' || send === 0) return;
        const rate = getRate(sendCurrency, receiveCurrency);
        setReceive(Math.round(send * rate));
    }, [sendCurrency, receiveCurrency, send]);

    const handleSendChange = (value: string) => {
        if (value === '') {
            setSend('');
            setReceive('');
            return;
        }

        const num = parseNumber(value);
        if (isNaN(num)) return;

        setSend(num);
        const rate = getRate(sendCurrency, receiveCurrency);
        setReceive(Math.round(num * rate));
    };

    const handleReceiveChange = (value: string) => {
        if (value === '') {
            setSend('');
            setReceive('');
            return;
        }

        const num = parseNumber(value);
        if (isNaN(num)) return;

        setReceive(num);
        const rate = getRate(sendCurrency, receiveCurrency);
        setSend(Math.round(num / rate));
    };

    // Закрытие дропдаунов
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sendRef.current && !sendRef.current.contains(event.target as Node)) setOpenSend(false);
            if (receiveRef.current && !receiveRef.current.contains(event.target as Node)) setOpenReceive(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formFields: FormField[] = [
        {
            label: "You Send",
            type: "text",
            name: "give",
            placeholder: "Обмен от 5000 рублей",
            value: send,
            onChange: handleSendChange,
            currency: sendCurrency,
            setCurrency: setSendCurrency,
            open: openSend,
            setOpen: setOpenSend,
        },
        {
            label: "You Receive",
            type: "text",
            name: "receive",
            placeholder: "0",
            value: receive,
            onChange: handleReceiveChange,
            currency: receiveCurrency,
            setCurrency: setReceiveCurrency,
            open: openReceive,
            setOpen: setOpenReceive,
        },
    ];

    // Валидация ТОЛЬКО контакта
    const validateForm = (): boolean => {
        if (!number || number.trim() === '') {
            setError('Пожалуйста, укажите ваш WhatsApp или Telegram');
            return false;
        }

        const trimmed = number.trim();
        const isValid = trimmed.startsWith('@') || 
                       trimmed.startsWith('+') || 
                       /^\d/.test(trimmed);

        if (!isValid) {
            setError('Укажите корректный контакт: @username или номер телефона');
            return false;
        }

        setError('');
        return true;
    };

    // Отправка боту
    const sendToBot = async () => {
        const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
        const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            alert('Ошибка: проверьте NEXT_PUBLIC_TELEGRAM_BOT_TOKEN и CHAT_ID в .env');
            return false;
        }

        const message = `
🔔 *Новая заявка на обмен*

💰 Отправляете: ${formatNumber(send)} ${sendCurrency}
💰 Получаете: ${formatNumber(receive)} ${receiveCurrency}

📍 Курс: 1 ${sendCurrency} = ${getRate(sendCurrency, receiveCurrency)} ${receiveCurrency}

👤 Контакт: ${number}

🕒 ${new Date().toLocaleString('ru-RU')}
        `.trim();

        try {
            const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });
            return res.ok;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        const success = await sendToBot();
        setIsLoading(false);

        if (success) {
            alert('Заявка успешно отправлена!');
            setSend('');
            setReceive('');
            setNumber('');
        } else {
            alert('Ошибка отправки заявки. Попробуйте позже.');
        }
    };

    return (
        <form>

            {/* Поля валют в одну строку */}
            <div className="flex flex-col md:flex-row gap-4 mb-4 max-md:gap-3">
                {/* Поле "Вы отдаёте" */}
                <div className="flex-1">
                    <div className="relative" ref={sendRef}>
                        <input
                            id="send"
                            name="send"
                            maxLength={16}
                            type="text"
                            placeholder="От 5000 руб."
                            value={formatNumber(send)}
                            onChange={(e) => handleSendChange(e.target.value)}
                            onFocus={() => setOpenSend(false)}
                            className="
                                w-full
                                bg-[#FFF9E8]
                                rounded-2xl 
                                py-3 
                                pl-4 pr-24
                                placeholder:text-gray-400 
                                text-black
                                outline-none
                                transition
                                focus:ring-2
                                focus:ring-accent
                            "
                        />
                        <div
                            className="flex items-center gap-2 absolute right-2 top-1/2 -translate-y-1/2 z-10 
                                        border border-gray-400 rounded-2xl text-black px-3 py-1.5 cursor-pointer hover:bg-gray-100"
                            onClick={() => setOpenSend(!openSend)}
                        >
                            <CircleDollarSign size={18} />
                            <span className="font-medium">{sendCurrency}</span>
                            <ChevronDown
                                size={16}
                                className={`transition ${openSend ? 'rotate-180' : ''}`}
                            />
                        </div>
                        <div className={`
                            ${openSend ? "" : "opacity-0 -translate-y-2 pointer-events-none"}
                            absolute right-0 z-20 top-full mt-2 bg-white rounded-2xl p-2 shadow-xl w-40 transition duration-300
                        `}>
                            {Object.keys(Rates).map((cur) => (
                                <div
                                    key={cur}
                                    className="px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer text-black"
                                    onClick={() => {
                                        setSendCurrency(cur);
                                        setOpenSend(false);
                                    }}
                                >
                                    {cur}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Иконка обмена */}
                <div className="flex items-end justify-center ">
                    <button
                        type="button"
                        className="
                            p-3 rounded-full border-2 border-[#B38E35] 
                            text-[#B38E35] 
                            transition-all duration-300 max-md:p-2 max-md:border-1.5
                        "
                    >
                        <ArrowLeftRight size={24} className="max-md:rotate-90"/>
                    </button>
                </div>

                {/* Поле "Вы получаете" */}
                <div className="flex-1">
                    <div className="relative" ref={receiveRef}>
                        <input
                            id="receive"
                            name="receive"
                            maxLength={16}
                            type="text"
                            placeholder="0"
                            value={formatNumber(receive)}
                            onChange={(e) => handleReceiveChange(e.target.value)}
                            onFocus={() => setOpenReceive(false)}
                            className="
                                w-full
                                bg-[#FFF9E8]
                                rounded-2xl 
                                py-3 
                                pl-4 pr-24
                                placeholder:text-gray-400 
                                text-black
                                outline-none
                                transition
                                focus:ring-2
                                focus:ring-accent
                            "
                        />
                        <div
                            className="flex items-center gap-2 absolute right-2 top-1/2 -translate-y-1/2 z-10 
                                        border border-gray-400 rounded-2xl text-black px-3 py-1.5 cursor-pointer hover:bg-gray-100"
                            onClick={() => setOpenReceive(!openReceive)}
                        >
                            <CircleDollarSign size={18} />
                            <span className="font-medium">{receiveCurrency}</span>
                            <ChevronDown
                                size={16}
                                className={`transition ${openReceive ? 'rotate-180' : ''}`}
                            />
                        </div>
                        <div className={`
                            ${openReceive ? "" : "opacity-0 -translate-y-2 pointer-events-none"}
                            absolute right-0 z-20 top-full mt-2 bg-white rounded-2xl p-2 shadow-xl w-40 transition duration-300
                        `}>
                            {Object.keys(Rates).map((cur) => (
                                <div
                                    key={cur}
                                    className="px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer text-black"
                                    onClick={() => {
                                        setReceiveCurrency(cur);
                                        setOpenReceive(false);
                                    }}
                                >
                                    {cur}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Курсы обмена */}
            <div className="mb-6">
                <p className="text-[#B38E35] text-sm font-medium ">
                    1 {sendCurrency} = {getRate(sendCurrency, receiveCurrency).toFixed(6).replace(/0+$/, '').replace(/\.$/, '')} {receiveCurrency}
                    <br />
                    1 {receiveCurrency} = {(1 / getRate(sendCurrency, receiveCurrency)).toFixed(8).replace(/0+$/, '').replace(/\.$/, '')} {sendCurrency}
                </p>
            </div>

            {/* Поле контактов */}
            <div className="flex flex-col mb-6">
                <label className="mb-1.5 text-gray-400 text-sm hidden" htmlFor="contact">
                    <span className="text-[#B38E35]">*</span> Ваш WhatsApp / Telegram
                </label>
                <input
                    id="contact"
                    name="contact"
                    maxLength={60}
                    type="text"
                    placeholder="@username или +79999999999"
                    value={number}
                    onChange={(e) => {
                        setNumber(e.target.value);
                        if (error) setError('');
                    }}
                    className={`
                        w-full
                        bg-[#FFF9E8]
                        rounded-2xl 
                        py-3 
                        px-4 
                        placeholder:text-gray-400 
                        text-black
                        outline-none
                        transition
                        ${error ? 'border-2 border-red-500' : 'focus:ring-2 focus:ring-accent'}
                    `}
                />
                {error && (
                    <p className="text-red-600 text-sm mt-1.5 font-medium">
                        {error}
                    </p>
                )}
            </div>

            {/* Кнопка отправки */}
            <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="
                    w-full
                    rounded-2xl py-4 px-10 text-black font-semibold uppercase tracking-wide relative overflow-hidden
                    bg-[linear-gradient(90deg,#B38E35_0%,#E6BB79_40%)]
                    shadow-[0_0_15px_rgba(255,223,122,0.35)]
                    transition-all duration-300 hover:scale-[1.03]
                    before:absolute before:top-0 before:left-[-120%]
                    before:h-full before:w-[120%]
                    before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
                    hover:before:left-[120%]
                    before:transition-all before:duration-700
                "
            >
                {isLoading ? 'Отправляем...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
            </button>
        </form>
    );
}