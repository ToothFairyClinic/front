import { useReactiveVar } from "@apollo/client";
import { themeState } from "@app/modules/cart/store/theme-state";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface HeaderLinkItemProps {
  url: string;
}

export const LinkHeader: FC<HeaderLinkItemProps & PropsWithChildren> = ({
  url,
  children,
}) => {
  const themeStateCurrent = useReactiveVar(themeState);

  const LinkHeaderStyles = clsx(
    "text-2xl font-normal flex items-center justify-center text-darkGray   hover:text-white text-center",
    {
      "text-white": !themeStateCurrent,
    }
  );

  return (
    <Link to={url} className={LinkHeaderStyles}>
      {children}
    </Link>
  );
};
