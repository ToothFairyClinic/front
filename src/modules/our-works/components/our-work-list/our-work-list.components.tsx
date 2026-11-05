import { GetOurWorkQuery } from "@app/core/types";
import { FC } from "react";
import { OurWorkItem } from "../our-work-item/our-work-item.component";

interface OurWorkListProps {
  works: GetOurWorkQuery["our_works"];
}

export const OurWorkList: FC<OurWorkListProps> = ({ works }) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
    {works.map((item) => (
      <li key={item.id}>
        <OurWorkItem {...item} />
      </li>
    ))}
  </ul>
);
