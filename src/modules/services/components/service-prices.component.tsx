import { FC } from "react";
import { Link } from "@app/common/router/router";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "@app/modules/main/components/section-heading/section-heading.component";
import { formatPrice } from "@app/common/utils/price-format";
import { PriceListRow } from "../graphql/service-extras";

interface ServicePricesProps {
  title: string;
  rows: PriceListRow[];
  isEn: boolean;
}

export const ServicePrices: FC<ServicePricesProps> = ({ title, rows, isEn }) => {
  const { t } = useTranslation();
  const lang = isEn ? "en" : "ua";
  if (rows.length === 0) return null;

  return (
    <section id="prices" aria-labelledby="prices-title" className="flex flex-col gap-6 scroll-mt-28">
      <SectionHeading id="prices-title" title={title} />

      <div className="overflow-hidden rounded-2xl border border-paleOlive bg-white dark:bg-white/5">
        <table className="w-full text-left text-darkGray dark:text-white">
          <thead className="bg-paleOlive/70 dark:bg-white/10">
            <tr>
              <th scope="col" className="px-4 md:px-6 py-3 md:py-4 text-base md:text-lg font-semibold">
                {t("Послуга")}
              </th>
              <th scope="col" className="px-4 md:px-6 py-3 md:py-4 text-base md:text-lg font-semibold text-right whitespace-nowrap">
                {t("Вартість")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-paleOlive/70 even:bg-palePeach/60 dark:even:bg-white/5">
                <td className="px-4 md:px-6 py-3 md:py-4 text-base md:text-lg [overflow-wrap:anywhere]">
                  {(isEn ? row.title_en : row.title)?.trim() || row.title.trim()}
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4 text-base md:text-lg font-semibold text-right whitespace-nowrap">
                  {formatPrice(row.price, isEn)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-base md:text-lg text-darkGray/80 dark:text-white/80">
        {t("Остаточну вартість лікар визначає після огляду. Усі ціни клініки - у")}{" "}
        <Link to={`/${lang}/price-list`} className="underline decoration-paleOlive decoration-2 underline-offset-4 hover:decoration-darkGray">
          {t("прайсі")}
        </Link>
        .
      </p>
    </section>
  );
};
