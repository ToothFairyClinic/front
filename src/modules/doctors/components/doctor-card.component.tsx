import { FC, useMemo } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Link } from "@app/common/router/router";
import { useCloudinaryImage } from "@app/common/hooks/use-cloudinary-image.hook";

interface DoctorCardProps {
  href: string;
  name: string;
  specialties: string;
  experience?: string;
  experienceLabel: string;
  image: string;
  alt: string;
  priority?: boolean;
}

/** Картка лікаря на сторінці команди: фото, ім'я, спеціалізації, досвід; уся картка веде на сторінку лікаря. */
export const DoctorCard: FC<DoctorCardProps> = ({ href, name, specialties, experience, experienceLabel, image, alt, priority = false }) => {
  const transformations = useMemo(() => ["c_fill", "g_auto", "w_385", "h_440", "f_auto", "q_auto"], []);
  const imageCld = useCloudinaryImage(image, transformations);

  return (
    <article className="group relative h-full flex flex-col bg-white rounded-xl sm:rounded-2xl border border-black/5 overflow-hidden">
      <AdvancedImage
        cldImg={imageCld}
        alt={alt}
        width={385}
        height={440}
        loading={priority ? "eager" : "lazy"}
        {...(priority ? { fetchpriority: "high" } : {})}
        className="block w-full h-auto aspect-[7/8] object-cover bg-white"
      />
      <div className="flex flex-col flex-1 gap-1.5 sm:gap-2 p-3 sm:p-5 md:p-6 border-t border-black/5">
        <h2 className="text-base sm:text-xl md:text-2xl font-semibold leading-snug text-darkGray [overflow-wrap:anywhere]">
          <Link
            to={href}
            className="after:absolute after:inset-0 underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-darkGray/40 transition-colors duration-150"
          >
            {name}
          </Link>
        </h2>
        {specialties && <p className="text-sm sm:text-base leading-relaxed text-darkGray/80">{specialties}</p>}
        {experience && (
          <p className="mt-auto pt-1 sm:pt-2 text-sm sm:text-base text-darkGray">
            <span className="font-semibold">{experienceLabel}:</span> {experience}
          </p>
        )}
      </div>
    </article>
  );
};
