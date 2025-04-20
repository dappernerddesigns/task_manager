import { Icon, Switch } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useColorMode } from "./ui/color-mode";

export const ThemeToggle = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Switch.Root colorPalette="teal" size="lg" m="6">
      <Switch.HiddenInput />
      <Switch.Control onClick={() => toggleColorMode()}>
        <Switch.Thumb />
        <Switch.Indicator fallback={<Icon as={LuSun} color="black.300" />}>
          <Icon as={LuMoon} color="gray.300" />
        </Switch.Indicator>
      </Switch.Control>
    </Switch.Root>
  );
};
