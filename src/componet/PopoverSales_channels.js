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

export default function PopoverSales_channels({ Sales_channels }) {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(() => {
    return setPopoverActive((popoverActive) => !popoverActive);
  }, []);

  const activator = (
    <Box onClick={togglePopoverActive} minHeight="60px" disclosure>
      <BlockStack align="center" height="70px" id="markate_inner">
        <InlineStack wrap={false} align="end">
          {Sales_channels.length}
          <Icon source={CaretDownIcon} tone="base" />
        </InlineStack>
      </BlockStack>
    </Box>
  );

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      autofocusTarget="first-node"
      onClose={togglePopoverActive}
    >
      <Popover_card Sales_channels={Sales_channels} />
    </Popover>
  );
}

const Popover_card = ({ Sales_channels }) => {
  return (
    <Box id="markate_name">
      <Card>
        <InlineStack wrap={false} gap="200" blockAlign="center">
          <span className="green_dot"></span>
          {Sales_channels[0]}
        </InlineStack>
      </Card>
    </Box>
  );
};
