import BugFormSkeleton from "@/app/bugs/_components/BugFormSkeleton";
import dynamic from "next/dynamic";

const BugForm = dynamic(() => import("@/app/bugs/_components/BugForm"), {
  ssr: false,
  loading: () => <BugFormSkeleton />,
});

const NewBug = () => {
  return <BugForm />;
};

export default NewBug;
