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
    { label: "In-progress Bugs", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Bugs", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {cards.map((card) => (
        <Card key={card.status}>
          <Link
            href={`/bugs/list?status=${card.status}`}
            className="text-sm font-medium"
          >
            <Flex direction="column" gap="2">
              {card.label}
              <Text size="5" className="font-bold text-center">
                {card.value}
              </Text>
            </Flex>
          </Link>
        </Card>
      ))}
    </Flex>
  );
};

export default BugSummary;
