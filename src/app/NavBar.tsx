import { Container, Flex } from "@radix-ui/themes";
import { AiFillBug } from "react-icons/ai";
import NavAuth from "./NavAuth";
import NavLinks from "./NavLinks";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-2">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <AiFillBug />
            <NavLinks />
          </Flex>
          <NavAuth />
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
