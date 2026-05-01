import { useReactiveVar } from "@apollo/client";
import { FC, useEffect, useState } from "react";
import { priceListCurrent } from "../../store/price-list-state";
import {
  GetPriceListCategoryByIdQuery,
  GetPriceListQuery,
} from "@app/core/types";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import { useTranslation } from 'react-i18next';

interface PriceListTabelProps {
  data: GetPriceListQuery;
}

const columnHelper =
  createColumnHelper<GetPriceListCategoryByIdQuery["price_list"][0]>();

export const PriceListTabel: FC<PriceListTabelProps> = ({ data: DataPriceList }) => {
  const { t } = useTranslation();
  const selection = useReactiveVar(priceListCurrent);

  const [foundObject, setFoundObject] = useState(
    DataPriceList?.price_list_categories[0]?.price_list_items || []
  );

  useEffect(() => {
    const foundObject_local = DataPriceList?.price_list_categories.find(
      (item) => item.id === selection // Використовуємо selection з useReactiveVar
    );

    if (foundObject_local) {
      setFoundObject(foundObject_local.price_list_items);
    }
  }, [selection, DataPriceList]); // Залежимо від змінної та вхідних даних

  const columns = [
    columnHelper.accessor("title", {
      header: () => t("Назва"),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
      header: () => t("Ціна"),
      cell: (info) => `${info.getValue()} ${t("грн.")}`,
    }),
  ];

  const table = useReactTable({
    data: foundObject,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto"> {/* Додаємо контейнер для горизонтального скролу на мобілках */}
      {foundObject.length !== 0 ? (
        <table className="w-full text-left border-collapse">
          {/* Семантичний заголовок таблиці для скринрідерів */}
          <caption className="sr-only">{t("Детальний прайс-лист послуг клініки")}</caption>

          <thead className="bg-gray-50 border-t border-b border-gray-200 h-11 text-gray-900 dark:bg-darkGray dark:text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col" // Вказуємо область дії заголовка
                    className="font-semibold py-3 px-6"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white text-gray-900 text-sm dark:bg-darkGray dark:text-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 px-6">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center py-10">
          <p className="text-2xl text-gray-500">{t("Тут поки порожньо")} 🥲</p>
        </div>
      )}
    </div>
  );
};