import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Form from "next/form";

const SearchNavbar = () => {
  return (
    <Form action={"/"} className="w-full">
      <div className="relative">
        <Input name="q" placeholder="Search" className="pl-8" />
        <Search className="text-muted-foreground size-5 absolute left-2 top-1/2 -translate-y-1/2" />
      </div>
    </Form>
  );
};

export default SearchNavbar;
