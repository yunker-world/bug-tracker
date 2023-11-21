import { StatusBadge } from "@/components";
import prisma from "@/lib/db";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";

const LatestBugs = async () => {
  const bugs = await prisma.bug.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      user: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Bugs
      </Heading>
      <Table.Root>
        <Table.Body>
          {bugs.map((bug) => (
            <Table.Row key={bug.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column">
                    <Link href={`/bugs/${bug.id}`}>{bug.title}</Link>
                    <StatusBadge status={bug.status} />
                  </Flex>
                  {bug.user && (
                    <Avatar
                      src={bug.user.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestBugs;
