import { ComponentProps, FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface UserDropdownLinkProps {
  to?: ComponentProps<typeof Link>["to"];
  onClick?: ComponentProps<typeof Link>["onClick"];
}

export const UserDropdownLink: FC<PropsWithChildren<UserDropdownLinkProps>> = ({
  children,
  to = "",
  ...props
}) => {
  return (
    <Link
      {...props}
      className="h-15 sm:h-9 px-4 flex items-center text-lg sm:text-sm transition-all hover:bg-gray-100  "
      to={to}
    >
      {children}
    </Link>
  );
};
