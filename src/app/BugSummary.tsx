import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const BugSummary = ({ open, inProgress, closed }: Props) => {
  const cards: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Bugs", value: open, status: "OPEN" },
    { label: "In-progress Bus", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Bugs", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {cards.map((card) => (
        <Link key={card.status} href={`/bugs/list?status=${card.status}`}>
          <Card>
            <Flex direction="column" gap="5">
              {card.label}
              <Text size="5" className="font-bold">
                {card.value}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default BugSummary;
