import {
  ActionList,
  Bleed,
  AppProvider,
  ContextualSaveBar,
  FormLayout,
  Frame,
  Layout,
  Loading,
  Pagination,
  Modal,
  Navigation,
  BlockStack,
  Popover,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
  Toast,
  TopBar,
  Box,
  Icon,
  InlineStack,
  Text,
  Button,
  Card,
  LegacyCard,
  Tooltip,
  TextField,
} from "@shopify/polaris";
import {
  ArrowLeftIcon,
  HomeIcon,
  OrderIcon,
  ViewIcon,
  HideIcon,
  ChatIcon,
  CalendarIcon,
  ProductIcon,
} from "@shopify/polaris-icons";
import { useState, useEffect, useCallback } from "react";

import Lists from "./Lists.js";

export default function ActualPageMarkup() {
  const [isAnalytics, setIsAnalytics] = useState(
    JSON.parse(localStorage.getItem("isAnalytics")) || false
  );
  var tempscroll = document.getElementById("header_scroll");
  useEffect(() => {
    localStorage.setItem("isAnalytics", JSON.stringify(isAnalytics));
  }, [isAnalytics]);

  return (
    <Page
      title="Products"
      actionGroups={[
        {
          title: "Copy",
          onClick: (openActions) => {
            alert("Copy action");
            openActions();
          },
          actions: [{ content: "Copy to clipboard" }],
        },
        {
          title: "Promote",
          disabled: true,
          actions: [{ content: "Share on Facebook" }],
        },
        {
          title: "More actions",
          actions: [
            {
              content: (
                <InlineStack>
                  {isAnalytics ? (
                    <>
                      <Icon source={HideIcon} tone="base" />
                      <Text>hide analytics</Text>
                    </>
                  ) : (
                    <>
                      <Icon source={ViewIcon} tone="base" />
                      <Text>show analytics</Text>
                    </>
                  )}
                </InlineStack>
              ),
              onAction: () => setIsAnalytics((pre) => !pre),
            },
          ],
        },
      ]}
    >
      <div
        className="analytics_header"
        style={{ marginBlock: "var(--p-space-300)" }}
      >
        <Card padding="0">
          {isAnalytics && (
            <InlineStack blockAlign="center" wrap={false}>
              <Box
                borderColor="border"
                padding="200"
                minWidth="120px"
                borderStyle="solid"
                borderInlineEndWidth="0165"
              >
                <Box
                  paddingBlock="800"
                  paddingInline="100"
                  id="hover_heading_block"
                  borderRadius="100"
                >
                  <InlineStack wrap={false}>
                    <Icon source={CalendarIcon} tone="base" />
                    <Text as="span" variant="bodyMd">
                      30 days
                    </Text>
                  </InlineStack>
                </Box>
              </Box>

              <Box width="100%" id="header_scroll">
                <InlineStack wrap={false}>
                  <Box
                    padding="200"
                    minWidth="12rem"
                    width="50%"
                    maxWidth="28rem"
                    borderColor="border"
                    borderStyle="solid"
                  >
                    <Box
                      padding="400"
                      id="hover_heading_block"
                      borderRadius="100"
                    >
                      <Box paddingBlockEnd="200">
                        <PopoverWithActionListExample
                          header="Average sell-through rate"
                          contant1="Products, broken down by sell-through rate(how quickly they're sold)"
                          contant2="Sell-through rate = inventory units sold /(inventory units sold + ending inventory units)"
                        />
                      </Box>
                      <Text as="p" variant="bodyMd">
                        0% -
                      </Text>
                    </Box>
                  </Box>

                  <Box
                    minWidth="12.7rem"
                    width="50%"
                    maxWidth="28rem"
                    padding="200"
                    borderColor="border"
                    borderStyle="solid"
                    borderInlineStartWidth="0165"
                  >
                    <Box
                      paddingBlock="500"
                      paddingInline="400"
                      padding="400"
                      id="hover_heading_block"
                      borderRadius="100"
                    >
                      <PopoverWithActionListExample
                        header="Products by days of inventory remaining"
                        contant1="Days left of inventory, based on past data"
                        contant2="Days of inventory remaining = ending inventory units / inventory units sold per day"
                      />
                      <Box paddingBlockStart="200">
                        <Text as="p" variant="bodyMd">
                          No data
                        </Text>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    minWidth="12rem"
                    width="50%"
                    maxWidth="28rem"
                    paddingBlock="300"
                    padding="200"
                    borderColor="border"
                    borderInlineStartWidth="0165"
                  >
                    <Box
                      paddingBlock="400"
                      paddingInline="400"
                      id="hover_heading_block"
                      borderRadius="100"
                    >
                      <PopoverWithActionListExample
                        header="ABC product analysis"
                        contant1="Days left of inventory, based on past data"
                        contant2="Days of inventory remaining = ending inventory units / inventory units sold per day"
                      />
                      <Box paddingBlockStart="200">
                        <Text
                          // id="blue_underline"
                          variant="bodyMd"
                          fontWeight="medium"
                        >
                          ₹0.00 C
                        </Text>
                        <Box id="blue_underline" as="span"></Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box id="pagination" minHeight="100px">
                    <Pagination
                      hasPrevious
                      onPrevious={() => {
                        document.getElementById("header_scroll").scrollBy({
                          left: -320,
                          behavior: "smooth",
                        });
                      }}
                      hasNext
                      onNext={() => {
                        document.getElementById("header_scroll").scrollBy({
                          left: 320,
                          behavior: "smooth",
                        });
                      }}
                    />
                  </Box>
                </InlineStack>
              </Box>
            </InlineStack>
          )}
        </Card>
      </div>

      <Lists />
    </Page>
  );
}

function PopoverWithActionListExample({ header, contant1, contant2 }) {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const activator = (
    <Box
      onMouseLeave={togglePopoverActive}
      onMouseEnter={togglePopoverActive}
      disclosure
    >
      <Box className="dot_underline">
        <Text as="h1" variant="headingMd">
          {header}
        </Text>
      </Box>
    </Box>
  );

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      autofocusTarget="first-node"
      onClose={togglePopoverActive}
    >
      <Card>
        <Text as="p" variant="bodyMd">
          {header}
          {contant1}
          {contant2}
        </Text>
      </Card>
    </Popover>
  );
}
