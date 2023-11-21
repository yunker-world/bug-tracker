import { Pagination } from "@/components";
import prisma from "@/lib/db";
import { Status } from "@prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import Link from "next/link";
import BugFilter from "./BugFilter";
import BugQuery from "./BugQuery";
import BugTable, { columnNames } from "./BugTable";

export const metadata: Metadata = {
  title: "Bug Tracker - Bug list",
  description: "View all project bugs",
};

const BugsPage = async ({ searchParams }: { searchParams: BugQuery }) => {
  const currentPage = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const statuses = Object.values(Status);
  const where = statuses.includes(searchParams.status)
    ? { status: searchParams.status }
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const bugs = await prisma.bug.findMany({
    where,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    orderBy,
  });

  const totalCount = await prisma.bug.count({
    where,
  });

  return (
    <Flex direction="column" gap="3">
      <Flex justify="between">
        <BugFilter searchParams={searchParams} />
        <Button>
          <Link href="/bugs/new">New Bug</Link>
        </Button>
      </Flex>
      <BugTable searchParams={searchParams} bugs={bugs} />
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default BugsPage;
