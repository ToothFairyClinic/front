import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header.component";

const meta = {
  title: "Common/Header",
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};