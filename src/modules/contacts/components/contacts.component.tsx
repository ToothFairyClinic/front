import { FC } from "react";

interface ContactsMapProps {
  title: string;
  className?: string;
}

/** Карта Google з міткою клініки; висоту задає батьківський блок. */
export const ContactsMap: FC<ContactsMapProps> = ({ title, className = "" }) => (
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2574.6701308092056!2d30.105613176774078!3d49.81106897147708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d3423b8b64085d%3A0x888f51696df6de26!2z0KHRgtC-0LzQsNGC0L7Qu9C-0LPRltGPICLQl9GD0LHQvdCwINCk0LXRjyI!5e0!3m2!1suk!2sua!4v1712248945115!5m2!1suk!2sua"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title={title}
    className={`block w-full h-full border-0 ${className}`}
  />
);
