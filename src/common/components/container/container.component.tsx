import { FC, PropsWithChildren } from "react";

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return <section className="max-w-5xl mx-auto ">{children}</section>;
};
