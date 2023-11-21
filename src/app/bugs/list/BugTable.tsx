import { StatusBadge } from "@/components";
import { Bug } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import BugQuery from "./BugQuery";

type Props = {
  bugs: Bug[];
  searchParams: BugQuery;
};

const columns: {
  label: string;
  value: keyof Bug;
  className?: string;
}[] = [
  { label: "Bug", value: "title" },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

const BugTable = ({ bugs, searchParams }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(({ label, value, className }) => (
            <Table.ColumnHeaderCell key={label} className={className}>
              <Link
                href={{
                  query: {
                    ...searchParams,
                    orderBy: value,
                  },
                }}
              >
                {label}
              </Link>
              {value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {bugs.map(({ id, title, status, createdAt }) => (
          <Table.Row key={id}>
            <Table.Cell>
              <Link href={`/bugs/detail/${id}`}>{title}</Link>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <StatusBadge status={status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export const columnNames = columns.map((column) => column.value);

export default BugTable;
