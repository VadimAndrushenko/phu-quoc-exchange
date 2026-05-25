'use client';

import { useState, useEffect, useRef } from "react";
import { ChevronDown, CircleDollarSign } from "lucide-react";
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
            <div>
                {formFields.map((field, index) => {
                    const isCurrencyField = 'setOpen' in field;
                    const dropdownRef = index === 0 ? sendRef : receiveRef;
                    const isOpen = index === 0 ? openSend : openReceive;
                    const setOpenFn = index === 0 ? setOpenSend : setOpenReceive;

                    const displayValue = isCurrencyField 
                        ? formatNumber((field as CurrencyField).value) 
                        : field.value;

                    return (
                        <div key={field.name} className="flex flex-col">
                            <label className="mb-1.5" htmlFor={field.name}>
                                {field.label}
                            </label>

                            <div className="relative mb-5" ref={isCurrencyField ? dropdownRef : undefined}>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    maxLength={16}
                                    type="text"
                                    placeholder={field.placeholder}
                                    value={displayValue}
                                    onChange={(e) => (field as CurrencyField).onChange(e.target.value)}
                                    onFocus={() => setOpenFn(false)}
                                    className="
                                        w-full
                                        bg-[#FFF9E8]
                                        rounded-2xl 
                                        py-4 
                                        px-3 
                                        placeholder:text-gray-400 
                                        text-black
                                        outline-none
                                        transition
                                        focus:ring-2
                                        focus:ring-accent
                                        max-lg:placeholder:text-xs
                                        max-[480px]:text-xs
                                    "
                                />

                                {isCurrencyField && (
                                    <>
                                        <div
                                            className="flex items-center gap-2 absolute right-3 top-1/2 -translate-y-1/2 z-10 
                                                        border border-gray-400 rounded-2xl text-black px-3 py-1 cursor-pointer hover:bg-gray-100"
                                            onClick={() => setOpenFn((isOpen) => !isOpen)}
                                        >
                                            <CircleDollarSign size={18} />
                                            <span className="font-medium">{field.currency}</span>
                                            <ChevronDown
                                                size={16}
                                                className={`transition ${isOpen ? 'rotate-180' : ''}`}
                                            />
                                        </div>

                                        
                                        <div className={`
                                            ${isOpen ? "" : "opacity-0 -translate-y-10 pointer-events-none"}
                                            absolute right-0 z-20 top-17.5 bg-white rounded-2xl p-2 shadow-xl  w-40 transition duration-300
                                        `}>
                                            {Object.keys(Rates).map((cur) => (
                                                <div
                                                    key={cur}
                                                    className="px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer text-black"
                                                    onClick={() => {
                                                        (field as CurrencyField).setCurrency(cur);
                                                        setOpenFn(false);
                                                    }}
                                                >
                                                    {cur}
                                                </div>
                                            ))}
                                        </div>
                                        
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-col gap-5">

                <p className="text-accent text-sm font-medium">
                    1 {sendCurrency} = {getRate(sendCurrency, receiveCurrency).toFixed(6).replace(/0+$/, '').replace(/\.$/, '')} {receiveCurrency}
                    <br />
                    1 {receiveCurrency} = {(1 / getRate(sendCurrency, receiveCurrency)).toFixed(8).replace(/0+$/, '').replace(/\.$/, '')} {sendCurrency}
                </p>

                <p className="text-sm text-gray-300">
                    Наша условная акция: свяжитесь с нами и покажите, что где-то есть курс выгодней — мы сделаем обмен на +1 донг.
                </p>

                <div className="flex flex-col">
                    <label className="mb-1.5" htmlFor="contact">
                        <span className="text-red-600">*</span> Your WhatsApp / Telegram
                    </label>

                    <input
                        id="contact"
                        name="contact"
                        maxLength={60}
                        type="text"
                        placeholder="@username or +79999999999"
                        value={number}
                        onChange={(e) => {
                            setNumber(e.target.value);
                            if (error) setError('');
                        }}
                        className={`
                            w-full
                            bg-[#FFF9E8]
                            rounded-2xl 
                            py-4 
                            px-3 
                            placeholder:text-gray-400 
                            text-black
                            outline-none
                            transition
                            ${error ? 'border-2 border-red-500' : 'focus:ring-2 focus:ring-accent'}
                        `}
                    />

                    {error && (
                        <p className="text-red-600 text-sm mt-1.5 font-medium md:max-lg:text-xs">
                            {error}
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="
                        rounded-2xl py-5 px-10 text-black font-semibold relative overflow-hidden
                        bg-[linear-gradient(90deg,#B38E35_0%,#E6BB79_40%)]
                        shadow-[0_0_15px_rgba(255,223,122,0.35)]
                        transition-all duration-300 hover:scale-105
                        before:absolute before:top-0 before:left-[-120%]
                        before:h-full before:w-[120%]
                        before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
                        hover:before:left-[120%]
                        before:transition-all before:duration-700
                    "
                >
                    {isLoading ? 'Отправляем...' : 'Отправить заявку'}
                </button>
            </div>
        </form>
    );
}