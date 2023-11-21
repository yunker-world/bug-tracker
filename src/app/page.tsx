import prisma from "@/lib/db";
import { Flex, Grid } from "@radix-ui/themes";
import BugChart from "./BugChart";
import BugSummary from "./BugSummary";
import LatestBugs from "./LatestBugs";

export default async function Home() {
  const open = await prisma.bug.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.bug.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.bug.count({ where: { status: "CLOSED" } });

  return (
    <Grid columns={{ initial: "1", sm: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <BugSummary open={open} inProgress={inProgress} closed={closed} />
        <BugChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestBugs />
    </Grid>
  );
}

export const dynamic = "force-dynamic";
