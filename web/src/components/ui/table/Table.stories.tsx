import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Table } from "./Table";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table>
      <thead>
        <tr className="bg-[#f3efe8]">
          <th className="border-b border-neutral-300 px-[18px] py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-500">
            Title
          </th>
          <th className="border-b border-neutral-300 px-[18px] py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-500">
            Status
          </th>
          <th className="border-b border-neutral-300 px-[18px] py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-500">
            Category
          </th>
          <th className="border-b border-neutral-300 px-[18px] py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-500">
            Updated
          </th>
          <th className="border-b border-neutral-300 px-[18px] py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-500">
            Author
          </th>
          <th className="border-b border-neutral-300 px-[18px] py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-500">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
            <div className="flex flex-col gap-1.5">
              <strong className="text-[15px] font-semibold leading-normal">
                How small independent newsrooms are redesigning the reading
                experience
              </strong>
              <span className="text-[13px] leading-[1.4] text-neutral-500">
                Slug: /news/independent-newsrooms-reading-experience
              </span>
            </div>
          </td>

          <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
            Draft
          </td>

          <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
            News
          </td>

          <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
            2 minutes ago
          </td>

          <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
            Kevin Wu
          </td>

          <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
            <div className="flex flex-wrap gap-2.5">
              <button className="cursor-pointer p-0 text-sm text-black underline underline-offset-[3px]">
                Edit
              </button>
              <button className="cursor-pointer p-0 text-sm text-black underline underline-offset-[3px]">
                Preview
              </button>
              <button className="cursor-pointer p-0 text-sm text-red-800 underline underline-offset-[3px]">
                Delete
              </button>
            </div>
          </td>
        </tr>

        <tr>
          <td className="px-[18px] py-[18px] align-top text-sm text-black">
            <div className="flex flex-col gap-1.5">
              <strong className="text-[15px] font-semibold leading-normal">
                The future of long-form journalism in a fast-scroll world
              </strong>
              <span className="text-[13px] leading-[1.4] text-neutral-500">
                Slug: /opinion/future-of-long-form-journalism
              </span>
            </div>
          </td>

          <td className="px-[18px] py-[18px] align-top text-sm text-black">
            Published
          </td>

          <td className="px-[18px] py-[18px] align-top text-sm text-black">
            Opinion
          </td>

          <td className="px-[18px] py-[18px] align-top text-sm text-black">
            Yesterday
          </td>

          <td className="px-[18px] py-[18px] align-top text-sm text-black">
            Kevin Wu
          </td>

          <td className="px-[18px] py-[18px] align-top text-sm text-black">
            <div className="flex flex-wrap gap-2.5">
              <button className="cursor-pointer p-0 text-sm text-black underline underline-offset-[3px]">
                Edit
              </button>
              <button className="cursor-pointer p-0 text-sm text-black underline underline-offset-[3px]">
                View
              </button>
              <button className="cursor-pointer p-0 text-sm text-red-800 underline underline-offset-[3px]">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
  ),
};