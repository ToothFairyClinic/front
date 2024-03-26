import { GetPriceListCategoriesQuery } from "@app/core/types";
import { FC, useEffect } from "react";
import Select, { ActionMeta } from "react-select";
import { priceListCurrent } from "../../store/price-list-state";
import { useReactiveVar } from "@apollo/client";
import { themeState } from "@app/modules/cart/store/theme-state";
import {
  darkColorStyles,
  lightColorStyles,
} from "./price-list-selector-styles";

interface PriceListSelectProps {
  data: GetPriceListCategoriesQuery | undefined;
}

const handlerChange = (newValue: any, actionMeta: ActionMeta<unknown>) => {
  priceListCurrent(newValue?.value);
};

export const PriceListSelect: FC<PriceListSelectProps> = ({ data }) => {
  const options = [
    data?.price_list_categories?.map((item) => ({
      value: `${item.id}`,
      label: `${item.title}`,
    })) || [],
  ];

  useEffect(() => {
    if (options[0].length > 0 && priceListCurrent() === null) {
      priceListCurrent(options[0][0].value);
    }
  }, [options]);

  useEffect(() => {
    if (options[0].length > 0 && priceListCurrent() === undefined) {
      priceListCurrent(options[0][0].value);
    }
  }, [options]);

  const themeStateCurrent = useReactiveVar(themeState);

  const colorStyles = themeStateCurrent ? lightColorStyles : darkColorStyles;

  return (
    <div>
      <Select
        options={options[0]}
        onChange={handlerChange}
        styles={colorStyles}
        defaultValue={options[0].find(
          (opt) => opt.value === priceListCurrent()
        )}
      />
    </div>
  );
};
