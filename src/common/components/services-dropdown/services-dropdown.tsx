import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { GetServicesQuery, useGetServicesQuery } from '@app/core/types';
import { useReactiveVar } from '@apollo/client';
import { themeState } from '@app/modules/cart/store/theme-state';

type ServiceItem = GetServicesQuery['services'][number];
type ChildServiceItem = ServiceItem['child_services'][number];

interface ServicesDropdownProps {
    urlLang: string;
    t: (key: string) => string;
    onLinkClick?: () => void;
}

export const ServicesDropdown: React.FC<ServicesDropdownProps> = ({
    urlLang,
    t,
    onLinkClick,
}) => {
    const themeStateCurrent = useReactiveVar(themeState);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

    const { data, loading, error } = useGetServicesQuery();
    const services = data?.services ?? [];
    const containerRef = useRef<HTMLDivElement>(null);

    const isTouchDevice = useCallback((): boolean => {
        return typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
    }, []);

    const handleCloseAll = useCallback(() => {
        setIsOpen(false);
        setActiveSubMenu(null);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                handleCloseAll();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [handleCloseAll]);

    const handleMouseEnterContainer = () => {
        if (!isTouchDevice()) setIsOpen(true);
    };

    const handleMouseLeaveContainer = () => {
        if (!isTouchDevice()) handleCloseAll();
    };

    const getServiceSlug = (slugUA?: string | null, slugEN?: string | null): string => {
        const targetSlug = urlLang === 'ua' ? slugUA : slugEN;
        return targetSlug ?? '';
    };

    if (error) {
        return null;
    }

    const LinkHeaderStyles = clsx(
        "text-2xl font-normal flex items-center justify-center text-darkGray hover:text-white dark:hover:text-paleOlive text-center",
        { "text-white": !themeStateCurrent }
    );

    return (
        <div
            ref={containerRef}
            className="relative flex justify-center"
            onMouseEnter={handleMouseEnterContainer}
            onMouseLeave={handleMouseLeaveContainer}
        >
            <button
                type="button"
                className={LinkHeaderStyles}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {t('Послуги')}
                <svg
                    className={clsx(
                        'w-4 h-4 ml-1 transition-transform duration-200',
                        isOpen && 'rotate-180'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && !loading && services.length > 0 && (
                <ul
                    role="menu"
                    className="absolute left-0 top-full w-72 bg-white dark:bg-darkGray shadow-xl rounded-lg py-2 z-[100] border dark:text-white border-gray-100 dark:border-gray-800 animate-fadeIn"
                >
                    {services.map((service) => {
                        const hasChildren = Boolean(
                            service.child_services && service.child_services.length > 0
                        );
                        const isSubMenuOpen = activeSubMenu === service.id;

                        return (
                            <li
                                key={service.id}
                                className="relative group"
                                onMouseEnter={() => !isTouchDevice() && setActiveSubMenu(service.id)}
                                onMouseLeave={() => !isTouchDevice() && setActiveSubMenu(null)}
                            >

                                <div className="flex items-stretch hover:bg-paleOlive/20 dark:hover:bg-paleOlive/10 transition-colors">
                                    <Link
                                        to={`/${urlLang}/services/${getServiceSlug(service.slug, service.slug_en)}`}
                                        className="flex-1 px-5 py-3 text-sm flex items-center"
                                        onClick={() => {
                                            handleCloseAll();
                                            onLinkClick?.();
                                        }}
                                    >
                                        <span>{urlLang === 'ua' ? service.name : service.name_en}</span>
                                    </Link>

                                    {hasChildren && (
                                        <button
                                            type="button"
                                            className="px-4 flex items-center justify-center cursor-pointer text-darkGray dark:text-white hover:bg-paleOlive/30 focus:outline-none"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveSubMenu((prev) => (prev === service.id ? null : service.id));
                                            }}
                                            aria-label={isSubMenuOpen ? 'Згорнути підменю' : 'Розгорнути підменю'}
                                            aria-expanded={isSubMenuOpen}
                                        >
                                            <svg
                                                className={clsx(
                                                    'w-4 h-4 transform transition-transform duration-200',
                                                    isSubMenuOpen ? 'rotate-0 md:-rotate-90' : 'rotate-180 md:-rotate-90',
                                                    // На десктопі стрілка завжди вказує вправо (-90), на мобілці - вниз/вгору
                                                )}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {hasChildren && isSubMenuOpen && (
                                    <ul
                                        role="menu"
                                        // ОНОВЛЕНІ КЛАСИ: Адаптивне позиціонування
                                        className="relative w-full z-10 md:absolute md:left-full md:top-0 md:pl-2 md:w-72"
                                    >
                                        <div className="bg-gray-50 dark:bg-gray-800/50 md:bg-white md:dark:bg-darkGray md:shadow-xl rounded-lg py-2 border-y md:border dark:text-white border-gray-100 dark:border-gray-800 animate-fadeIn">
                                            {service.child_services?.map((child: ChildServiceItem) => (
                                                <li key={child.id} role="none">
                                                    <Link
                                                        to={`/${urlLang}/services/${getServiceSlug(child.slug, child.slug_en)}`}
                                                        className="block px-8 md:px-5 py-3 text-sm hover:bg-paleOlive/20 dark:hover:bg-paleOlive/10 transition-colors"
                                                        onClick={() => {
                                                            handleCloseAll();
                                                            onLinkClick?.();
                                                        }}
                                                        role="menuitem"
                                                    >
                                                        {urlLang === 'ua' ? child.name : child.name_en}
                                                    </Link>
                                                </li>
                                            ))}
                                        </div>
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};