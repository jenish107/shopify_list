import {
  Box,
  Popover,
  Card,
  InlineStack,
  BlockStack,
  Icon,
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";

import { CaretDownIcon, CaretUpIcon } from "@shopify/polaris-icons";

export default function PopoverWithActionListExample({ Markate }) {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(() => {
    return setPopoverActive((popoverActive) => !popoverActive);
  }, []);

  const activator = (
    <Box onClick={togglePopoverActive} minHeight="60px" disclosure>
      <BlockStack align="center" height="70px" id="markate_inner">
        <InlineStack wrap={false} align="end">
          {Markate?.length}
          <Icon source={CaretDownIcon} tone="base" />
        </InlineStack>
      </BlockStack>
    </Box>
  );
  var tempMarkate = Markate.slice(0, -1);

  tempMarkate = tempMarkate.join(", ");
  var Markate_string = tempMarkate + " and " + Markate[Markate.length - 1];

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      autofocusTarget="first-node"
      onClose={togglePopoverActive}
    >
      <Popover_card Markate_string={Markate_string} />
    </Popover>
  );
}

const Popover_card = ({ Markate_string }) => {
  return (
    <Box id="markate_name">
      <Card>
        <InlineStack wrap={false} gap="200" blockAlign="center">
          <span className="green_dot"></span>
          {Markate_string}
        </InlineStack>
      </Card>
    </Box>
  );
};
