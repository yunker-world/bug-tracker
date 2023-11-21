import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditBugButton = ({ bugId }: { bugId: number }) => {
  return (
    <>
      <Button>
        <Pencil2Icon />
        <Link href={`/bugs/edit/${bugId}`}>Edit Bug</Link>
      </Button>
    </>
  );
};

export default EditBugButton;
