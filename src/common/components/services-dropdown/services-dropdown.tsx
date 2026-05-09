import { useReactiveVar } from '@apollo/client';
import { useGetServicesQuery } from '@app/core/types';
import { themeState } from '@app/modules/cart/store/theme-state';
import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import clsx from "clsx";

export const ServicesDropdown = ({ urlLang, t, onLinkClick }: { urlLang: string, t: any, onLinkClick?: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { data } = useGetServicesQuery();
    const containerRef = useRef<HTMLDivElement>(null);

    const sortedServices = useMemo(() => {
        if (!data?.services) return [];
        const order = [
            "Консультація",
            "Дитяча стоматологія",
            "Терапія",
            "Імплантація",
            "Ентодонтія",
            "Ортодонтія",
            "Спеціаліст з грудного вигодовування",
            "Наркоз",
            "Хірургія",
            "Ортопедія",
            "Естетична стоматологія",
            "Кабінет комп'ютерної томографії, ТРГ, ОПТГ"
        ];
        return [...data.services].sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
    }, [data]);

    const themeStateCurrent = useReactiveVar(themeState);

    // Закриваємо dropdown при кліку поза компонентом
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

    const handleMouseEnter = () => {
        if (!isTouchDevice()) setIsOpen(true);
    };

    const handleMouseLeave = () => {
        if (!isTouchDevice()) setIsOpen(false);
    };

    const handleButtonClick = () => {
        // На десктопі клік не потрібен (є hover), але додаємо для надійності
        setIsOpen(prev => !prev);
    };

    const LinkHeaderStyles = clsx(
        "text-2xl font-normal flex items-center justify-center text-darkGray hover:text-white dark:hover:text-paleOlive text-center",
        { "text-white": !themeStateCurrent }
    );

    return (
        <div
            ref={containerRef}
            className="relative flex justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className={LinkHeaderStyles}
                onClick={handleButtonClick}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                {t("Послуги")}
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && sortedServices.length > 0 && (
                <ul
                    role="listbox"
                    className="absolute left-0 top-full w-64 bg-white dark:bg-darkGray shadow-xl rounded-lg py-2 z-[100] border dark:text-white border-gray-100 dark:border-gray-800 animate-fadeIn"
                >
                    {sortedServices.map((service) => (
                        <li key={service.id}>
                            <Link
                                to={`/${urlLang}/services/${service.id}`}
                                className="block px-5 py-3 text-sm hover:bg-paleOlive/20 dark:hover:bg-paleOlive/10 transition-colors"
                                onClick={() => {
                                    setIsOpen(false);
                                    onLinkClick?.();
                                }}
                            >
                                {t(service.name)}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};