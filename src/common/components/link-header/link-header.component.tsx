import { useReactiveVar } from "@apollo/client";
import { themeState } from "@app/modules/cart/store/theme-state";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import { Link } from "@app/common/router/router";

interface HeaderLinkItemProps {
  url: string;
}

export const LinkHeader: FC<HeaderLinkItemProps & PropsWithChildren> = ({
  url,
  children,
}) => {
  const themeStateCurrent = useReactiveVar(themeState);

  const LinkHeaderStyles = clsx(
    "text-lg xl:text-xl 2xl:text-2xl whitespace-nowrap font-normal flex items-center justify-center text-darkGray hover:text-white dark:hover:text-paleOlive text-center",
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
