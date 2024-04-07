import { FC } from "react";
import { OurWorkList } from "../components/our-work-list/our-work-list.components";

interface OurWorkPageProps {}

export const OurWorkPage: FC<OurWorkPageProps> = ({}) => {
  return (
    <div className="">
      <OurWorkList />
    </div>
  );
};
