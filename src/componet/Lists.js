import {
  Thumbnail,
  Link,
  IndexTable,
  LegacyCard,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  ChoiceList,
  Button,
  Popover,
  ActionList,
  Box,
  Props,
  BlockStack,
  Badge,
  useBreakpoints,
  Combobox,
  Icon,
  Listbox,
  Card,
  InlineStack,
  Tooltip,
  IndexFiltersProps,
  TabProps,
  InlineGrid,
} from "@shopify/polaris";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ViewIcon,
  ChevronLeftIcon,
  DeleteIcon,
  ChevronRightIcon,
} from "@shopify/polaris-icons";
import { themeDefault } from "@shopify/polaris-tokens";

import { useState, useCallback, useMemo, useEffect } from "react";

import "../style/Lists.css";
import PopoverMarkate from "./PopoverMarkate.js";
import PopoverSales_channels from "./PopoverSales_channels.js";

export default function Lists() {
  const staticOrders = [
    {
      id: 1,
      Tags: ["Accessory", "Sport"],
      Markets: ["India", "Canada", "United States"],
      Product_img:
        "https://cdn.shopify.com/s/files/1/0683/5021/4300/files/Main_40x40@3x.jpg?v=1746253056",
      Product_name: "All-Terrain Snowboard",
      Status: "Active",
      Inventory: "35 in stock",
      Sales_channels: ["Online store"],
      B2B_catalogs: 1,
      Type: "snowboard",
      Category: "",
      Vendor: "Alpine Sports Co.",
      StoreStatus: <EyeIcon />,
    },
    {
      id: 2,
      Tags: ["Premium", "Winter"],
      Markets: ["India", "Canada", "United States"],
      Product_img:
        "https://cdn.shopify.com/s/files/1/0683/5021/4300/files/Main_f44a9605-cd62-464d-b095-d45cdaa0d0d7_40x40@3x.jpg?v=1746253056",
      Product_name: "Gift card",
      Status: "Draft",
      Inventory: "12 in stock",
      Sales_channels: ["Online store"],
      B2B_catalogs: 0,
      Type: "Gift card",
      Category: "Gift card",
      Vendor: "Peak Performance",
      StoreStatus: <EyeIcon />,
    },
    {
      id: 3,
      Tags: ["Snow"],
      Markets: ["India", "Canada", "United States"],
      Product_img:
        "https://cdn.shopify.com/s/files/1/0683/5021/4300/files/Main_f44a9605-cd62-464d-b095-d45cdaa0d0d7_40x40@3x.jpg?v=1746253056",
      Product_name: "Mountain Pro Snowboard",
      Status: "Active",
      Inventory: "78 in stock",
      Sales_channels: ["Online store"],
      B2B_catalogs: 2,
      Type: "snowboard",
      Category: "",
      Vendor: "SnowGear Ltd.",
      StoreStatus: <EyeIcon />,
    },
    {
      id: 4,
      Tags: ["Archived", "Snowboard"],
      Markets: ["India", "Canada", "United States"],
      Product_img:
        "https://cdn.shopify.com/s/files/1/0683/5021/4300/files/Main_f44a9605-cd62-464d-b095-d45cdaa0d0d7_40x40@3x.jpg?v=1746253056",
      Product_name: "Urban Glide Snowboard",
      Status: "Archived",
      Inventory: "0 in stock",
      Sales_channels: ["Online store"],
      B2B_catalogs: 0,
      Category: "",
      Type: "snowboard",
      Vendor: "BoardMasters",
      StoreStatus: <EyeIcon />,
    },
    {
      id: 5,
      Tags: ["Archived"],
      Markets: ["India", "Canada", "United States"],
      Product_img:
        "https://cdn.shopify.com/s/files/1/0683/5021/4300/files/Main_f44a9605-cd62-464d-b095-d45cdaa0d0d7_40x40@3x.jpg?v=1746253056",
      Product_name: "Urban extra Snowboard",
      Status: "Archived",
      Inventory: "Inventory not tracked",
      Sales_channels: [],
      B2B_catalogs: 0,
      Category: "",
      Type: "snowboard",
      Vendor: "BoardMasters",
      StoreStatus: <EyeIcon />,
    },
    {
      id: 6,
      Tags: ["Archived"],
      Markets: ["India", "Canada", "United States"],
      Product_img:
        "https://cdn.shopify.com/s/files/1/0683/5021/4300/files/snowboard_wax_40x40@3x.png?v=1746253057",
      Product_name: "Selling Plans Ski Wax",
      Status: "Archived",
      Inventory: "30 in stock for 3 variants",
      Sales_channels: [],
      B2B_catalogs: 0,
      Category: "",
      Type: "accessories",
      Vendor: "BoardMasters",
      StoreStatus: <EyeIcon />,
    },
  ];

  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("selected")) || 0
  );
  const [vendorList, setVendorList] = useState(
    JSON.parse(localStorage.getItem("vendorList")) || []
  );
  const [Markate, setMarkates] = useState(
    JSON.parse(localStorage.getItem("Markate")) || []
  );
  const [salesChannel, setSalesChannel] = useState(
    JSON.parse(localStorage.getItem("salesChannel")) || []
  );
  const [publishingError, setPublishingError] = useState(
    JSON.parse(localStorage.getItem("publishingError")) || []
  );
  const [markateChilde, setMarkatesChilde] = useState(
    JSON.parse(localStorage.getItem("markateChilde")) || "included"
  );
  const [salesChilde, setSalesChilde] = useState(
    JSON.parse(localStorage.getItem("salesChilde")) || "included"
  );
  const [giftCard, setGiftCard] = useState(
    JSON.parse(localStorage.getItem("giftCard")) || []
  );

  const [vendors, setVendors] = useState(
    JSON.parse(localStorage.getItem("vendors")) || []
  );
  const [status, setStatus] = useState(
    JSON.parse(localStorage.getItem("status")) || []
  );
  const [taggedWith, setTaggedWith] = useState(
    JSON.parse(localStorage.getItem("taggedWith")) || ""
  );
  const [queryValue, setQueryValue] = useState(
    JSON.parse(localStorage.getItem("queryValue")) || ""
  );
  const [types, setTypes] = useState(
    JSON.parse(localStorage.getItem("types")) || []
  );

  const [sortSelected, setSortSelected] = useState(
    JSON.parse(localStorage.getItem("sortSelected")) || ["Product asc"]
  );
  const { mode, setMode } = useSetIndexFiltersMode();

  const [isPublishingError, setIsPublishingError] = useState(true);

  const handleVendorsChange = useCallback(
    (value: string[]) => setVendors(value),
    []
  );
  const handleMarkateFilterChildeChange = useCallback(
    (value: string[]) => setMarkatesChilde(value),
    []
  );
  const handlePublishingErrorChange = useCallback(
    (value: string[]) => setPublishingError(value),
    []
  );
  const handleSalesFilterChildeChange = useCallback(
    (value: string[]) => setSalesChilde(value),
    []
  );
  const handleMarkateChange = useCallback(
    (value: string[]) => setMarkates(value),
    []
  );
  const handleSalesChannelChange = useCallback(
    (value: string[]) => setSalesChannel(value),
    []
  );
  const handleTypeChange = useCallback(
    (value: string[]) => setTypes(value),
    []
  );
  const handleGiftCardChange = useCallback(
    (value: string[]) => setGiftCard(value),
    []
  );
  const handleStatusChange = useCallback(
    (value: string[]) => setStatus(value),
    []
  );

  const handleFiltersQueryChange = useCallback(
    (value: string) => setQueryValue(value),
    []
  );

  const handleVendorsRemove = useCallback(() => setVendors([]), []);
  const handleMarkateRemove = useCallback(() => setMarkates([]), []);
  const handleSalesChannelRemove = useCallback(() => setSalesChannel([]), []);
  const handlePublishingErrorRemove = useCallback(
    () => setPublishingError([]),
    []
  );
  const handleTypeRemove = useCallback(() => setTypes([]), []);
  const handleGiftCardRemove = useCallback(() => setGiftCard([]), []);
  const handleStatusRemove = useCallback(() => setStatus([]), []);
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(""), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);

  const handleFiltersClearAll = useCallback(() => {
    handleVendorsRemove();
    handleSalesChannelRemove();
    handleMarkateRemove();
    handleStatusRemove();
    handleTypeRemove();
    handleGiftCardRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleSalesChannelRemove,
    handleVendorsRemove,
    handleMarkateRemove,
    handleGiftCardRemove,
    handleStatusRemove,
    handleTypeRemove,
    handleQueryValueRemove,
    handleTaggedWithRemove,
  ]);

  const deselectedOptions = useMemo(
    () => [
      { value: "accessory", label: "Accessory" },
      { value: "archived", label: "Archived" },
      { value: "premium", label: "Premium" },
      { value: "snow", label: "Snow" },
      { value: "snowboard", label: "Snowboard" },
      { value: "sport", label: "Sport" },
      { value: "winter", label: "Winter" },
    ],
    []
  );

  const [selectedOption, setSelectedOption] = useState();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  const escapeSpecialRegExCharacters = useCallback(
    (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    []
  );

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions, escapeSpecialRegExCharacters]
  );

  const handleTaggedWithChange = useCallback(
    (value: string) => {
      setTaggedWith(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions, escapeSpecialRegExCharacters]
  );

  const updateSelection = useCallback(
    (selected: string) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selected);
      });
      setSelectedOption(selected);
      setInputValue((matchedOption && matchedOption.label) || "");
    },
    [options]
  );

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const { label, value } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOption === value}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const [itemStrings, setItemStrings] = useState([
    "All",
    "Active",
    "Draft",
    "Archived",
  ]);
  const deleteView = (index: number) => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
    setSelected(0);
  };

  const duplicateView = async (name: string) => {
    setItemStrings([...itemStrings, name]);
    setSelected(itemStrings.length);
    await sleep(1);
    return true;
  };
  const tabs: TabProps[] = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {
      item === "All" ? setStatus([]) : setStatus(item);
    },
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
            {
              type: "rename",
              onAction: () => {},
              onPrimaryAction: async (value: string): Promise<boolean> => {
                const newItemsStrings = tabs.map((item, idx) => {
                  if (idx === index) {
                    return value;
                  }
                  return item.content;
                });
                await sleep(1);
                setItemStrings(newItemsStrings);
                return true;
              },
            },
            {
              type: "duplicate",
              onPrimaryAction: async (value: string): Promise<boolean> => {
                await sleep(1);
                duplicateView(value);
                return true;
              },
            },
            {
              type: "edit",
            },
            {
              type: "delete",
              onPrimaryAction: async () => {
                await sleep(1);
                deleteView(index);
                return true;
              },
            },
          ],
  }));

  const onCreateNewView = async (value: string) => {
    await sleep(500);
    setItemStrings([...itemStrings, value]);
    setSelected(itemStrings.length);
    return true;
  };

  const sortOptions: IndexFiltersProps["sortOptions"] = [
    { label: "Product", value: "Product asc", directionLabel: "A-Z" },
    { label: "Product", value: "Product desc", directionLabel: "Z-A" },
    { label: "Vendor", value: "Vendor asc", directionLabel: "A-Z" },
    { label: "Vendor", value: "Vendor desc", directionLabel: "Z-A" },
    { label: "Type", value: "type asc", directionLabel: "A-Z" },
    {
      label: "Type",
      value: "type desc",
      directionLabel: "Z-A",
    },
    {
      label: "Updated",
      value: "Updated Oldest first",
      directionLabel: "Oldest first",
    },
    {
      label: "Updated",
      value: "Updated Newest first",
      directionLabel: "Newest first",
    },
    {
      label: "Publishing error",
      value: "Publishing error Oldest first",
      directionLabel: "Oldest first",
    },
    {
      label: "Publishing error",
      value: "Publishing error Newest first",
      directionLabel: "Newest first",
    },
    {
      label: "Inventory",
      value: "Inventory Lowest to highest",
      directionLabel: "Lowest to highest",
    },
    {
      label: "Inventory",
      value: "Inventory Highest to Lowest",
      directionLabel: "Highest to Lowest",
    },
    {
      label: "Created",
      value: "Created Oldest first",
      directionLabel: "Oldest first",
    },
    {
      label: "Created",
      value: "Created Newest first",
      directionLabel: "Newest first",
    },
  ];
  const onHandleCancel = () => {};
  const onHandleSave = async () => {
    await sleep(1);
    return true;
  };

  const primaryAction: IndexFiltersProps["primaryAction"] =
    selected === 0
      ? {
          type: "save-as",
          onAction: onCreateNewView,
          disabled: false,
          loading: false,
        }
      : {
          type: "save",
          onAction: onHandleSave,
          disabled: false,
          loading: false,
        };

  const markateFilterChilde = useCallback((isMarkate) => {
    if (!isMarkate || isMarkate.length <= 0) return null;

    return (
      <Box
        borderBlockEndWidth="025"
        borderBlockStartWidth="025"
        paddingBlock="200"
      >
        <Listbox onSelect={handleMarkateFilterChildeChange}>
          <Listbox.Option value="included">included</Listbox.Option>
          <Listbox.Option value="excluded">excluded</Listbox.Option>
        </Listbox>
      </Box>
    );
  }, []);

  const SalesChannelFilterChilde = useCallback((isChannel) => {
    if (!isChannel || isChannel.length <= 0) return null;

    return (
      <Box
        borderBlockEndWidth="025"
        borderBlockStartWidth="025"
        paddingBlock="200"
      >
        <Listbox onSelect={handleSalesFilterChildeChange}>
          <Listbox.Option value="included">included</Listbox.Option>
          <Listbox.Option value="excluded">excluded</Listbox.Option>
        </Listbox>
      </Box>
    );
  }, []);

  const handleTaggedWithListChange = useCallback(
    (selected: string) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selected);
      });

      setSelectedOption(selected);
      setTaggedWith((matchedOption && matchedOption.label) || "");
    },
    [options]
  );

  useEffect(() => {
    shortData();
  }, [
    salesChannel,
    salesChilde,
    queryValue,
    giftCard,
    status,
    vendors,
    sortSelected,
    taggedWith,
    types,
    Markate,
    markateChilde,
  ]);
  useEffect(() => {
    shortData();
  }, []);

  function shortData() {
    var tempStaticOrders = staticOrders;

    if (taggedWith) {
      tempStaticOrders = tempStaticOrders.filter(
        (currOrder) => currOrder.Tags?.includes(taggedWith)
        // taggedWith?.includes(currOrder.Tags)
      );
    }

    if (queryValue != null) {
      tempStaticOrders = tempStaticOrders.filter((currItem) =>
        currItem.Product_name.toLowerCase().includes(queryValue.toLowerCase())
      );
    }

    if (vendors && vendors?.length > 0) {
      tempStaticOrders = tempStaticOrders.filter((currOrder) =>
        vendors?.includes(currOrder.Vendor)
      );
    }

    if (Markate && Markate?.length > 0) {
      switch (Markate[0]) {
        case "Canada":
        case "United States":
          tempStaticOrders = tempStaticOrders.filter((currItem) => {
            if (markateChilde === "included") {
              return currItem.Markets?.includes(Markate[0]);
            } else {
              return !currItem.Markets?.includes(Markate[0]);
            }
          });

          break;
        case "All Markate":
          if (markateChilde === "included") {
            break;
          } else {
            tempStaticOrders = [];
            break;
          }

        default:
          break;
      }
    }

    if (salesChannel && salesChannel?.length > 0) {
      switch (salesChannel[0]) {
        case "Online store":
          tempStaticOrders = tempStaticOrders.filter((currItem) => {
            if (salesChilde === "included") {
              return currItem.Sales_channels?.includes(salesChannel[0]);
            } else {
              return !currItem.Sales_channels?.includes(salesChannel[0]);
            }
          });

          break;
        case "All channels":
          tempStaticOrders = tempStaticOrders.filter((currItem) => {
            if (salesChilde === "included") {
              return;
            } else {
              return !currItem.Sales_channels?.includes("Online store");
            }
          });

          break;
        default:
          break;
      }
    }

    if (types && types?.length > 0) {
      tempStaticOrders = tempStaticOrders.filter((currOrder) => {
        return types?.includes(currOrder.Type);
      });
    }

    if (status && status?.length > 0) {
      tempStaticOrders = tempStaticOrders.filter((currOrder) =>
        status?.includes(currOrder.Status)
      );
    }

    if (giftCard && giftCard?.length > 0) {
      tempStaticOrders = tempStaticOrders.filter(
        (currOrder) => !giftCard[0].includes(currOrder.Category)
      );
    }

    switch (sortSelected[0]) {
      case "Product asc":
        tempStaticOrders = [...tempStaticOrders].sort((a, b) =>
          a.Product_name.localeCompare(b.Product_name)
        );

        break;
      case "Product desc":
        tempStaticOrders = [...tempStaticOrders].sort((a, b) =>
          b.Product_name.localeCompare(a.Product_name)
        );

        break;
      case "Vendor asc":
        tempStaticOrders = [...tempStaticOrders].sort((a, b) =>
          a.Vendor.localeCompare(b.Vendor)
        );

        break;
      case "Vendor desc":
        tempStaticOrders = [...tempStaticOrders].sort((a, b) =>
          b.Vendor.localeCompare(a.Vendor)
        );

        break;
      case "type asc":
        tempStaticOrders = [...tempStaticOrders].sort((a, b) =>
          a.Type.localeCompare(b.Type)
        );

        break;
      case "type desc":
        tempStaticOrders = [...tempStaticOrders].sort((a, b) =>
          b.Type.localeCompare(a.Type)
        );

        break;
      case "Inventory Lowest to highest":
        var tempArray = tempStaticOrders.map((currElem) => {
          return { ...currElem, Inventory: currElem.Inventory.split(" ") };
        });

        var shortedArray = [...tempArray].sort((a, b) => {
          if (b.Inventory[0] === "Inventory") {
            return +Infinity;
          }
          if (a.Inventory[0] === "Inventory") {
            return -Infinity;
          }

          return a.Inventory[0].localeCompare(b.Inventory[0]);
        });

        tempStaticOrders = shortedArray.map((currElem) => {
          return { ...currElem, Inventory: currElem.Inventory.join(" ") };
        });

        break;
      case "Inventory Highest to Lowest":
        var tempArray = tempStaticOrders.map((currElem) => {
          return { ...currElem, Inventory: currElem.Inventory.split(" ") };
        });

        var shortedArray = [...tempArray].sort((a, b) => {
          if (a.Inventory[0] === "Inventory") {
            return +Infinity;
          }
          if (b.Inventory[0] === "Inventory") {
            return -Infinity;
          }

          return b.Inventory[0].localeCompare(a.Inventory[0]);
        });

        tempStaticOrders = shortedArray.map((currElem) => {
          return { ...currElem, Inventory: currElem.Inventory.join(" ") };
        });

        break;

      default:
        break;
    }

    setOrders(tempStaticOrders);
  }

  const filters = [
    {
      key: "taggedWith",
      label: "Tagged with",
      filter: (
        <Combobox
          activator={
            <Combobox.TextField
              onChange={handleTaggedWithChange}
              label="Search tags"
              labelHidden
              value={taggedWith}
              placeholder="Search tags"
              autoComplete="off"
            />
          }
        >
          {options.length > 0 ? (
            <Listbox onSelect={handleTaggedWithListChange}>
              {optionsMarkup}
            </Listbox>
          ) : null}
        </Combobox>
      ),
      pinned: true,
      shortcut: true,
    },
    {
      key: "vendors",
      label: "Vendors",
      filter: (
        <ChoiceList
          title="vendors title"
          titleHidden
          choices={vendorList}
          selected={vendors || []}
          onChange={handleVendorsChange}
          allowMultiple
        />
      ),
      pinned: true,
    },
    {
      key: "status",
      label: "Status",
      filter: (
        <ChoiceList
          title="Status title"
          titleHidden
          choices={[
            { label: "Active", value: "Active" },
            { label: "Draft", value: "Draft" },
            { label: "Archived", value: "Archived" },
          ]}
          selected={status || []}
          onChange={handleStatusChange}
          allowMultiple
        />
      ),
      pinned: true,
    },
    {
      key: "giftCard",
      label: "Gift card",
      filter: (
        <ChoiceList
          title="giftCard title"
          titleHidden
          choices={[{ label: "Gift Card", value: "Gift Card" }]}
          selected={giftCard || []}
          onChange={handleGiftCardChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "types",
      label: "Types",
      filter: (
        <ChoiceList
          title="types title"
          titleHidden
          choices={[
            { label: "Gift Card", value: "Gift card" },
            { label: "accessories", value: "accessories" },
            { label: "snowboard", value: "snowboard" },
          ]}
          selected={types || []}
          onChange={handleTypeChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "Markate",
      label: "Markate",
      filter: (
        <>
          <ChoiceList
            title="Markate title"
            choices={[
              { label: "All Markate", value: "All Markate" },
              { label: "Canada", value: "Canada" },
              { label: "United States", value: "United States" },
              { label: "Primary market", value: "Primary market" },
            ]}
            selected={Markate}
            onChange={handleMarkateChange}
          />
          {markateFilterChilde(Markate)}
        </>
      ),
      pinned: true,
    },
    {
      key: "salesChannel",
      label: "Sales channel",
      filter: (
        <>
          <ChoiceList
            title="Sales channel"
            choices={[
              { label: "All channels", value: "All channels" },
              { label: "Online Store", value: "Online store" },
              { label: "Point of Sale", value: "Point of sale" },
            ]}
            selected={salesChannel}
            onChange={handleSalesChannelChange}
          />
          {SalesChannelFilterChilde(salesChannel)}
        </>
      ),
      pinned: true,
    },
    {
      key: "B2B",
      label: "B2B",
      filter: (
        <>
          <ChoiceList
            title="B2B"
            choices={[
              { label: "All channels", value: "All channels" },
              { label: "Online Store", value: "Online store" },
              { label: "Point of Sale", value: "Point of sale" },
            ]}
          />
        </>
      ),
      disabled: true,
    },
    {
      key: "publishingError",
      label: "Publishing Error",
      filter: (
        <>
          <Box onClick={() => setIsPublishingError((pre) => !pre)}>
            {isPublishingError ? (
              <>
                <InlineStack>
                  <Text as="span">Sales channel</Text>
                  <Icon source={ChevronRightIcon} tone="base" />
                </InlineStack>
              </>
            ) : (
              <>
                <InlineStack>
                  <Text as="span">
                    <Icon source={ChevronLeftIcon} tone="base" />
                  </Text>
                  <Text as="span">Sales channel</Text>
                </InlineStack>
              </>
            )}
          </Box>
          {!isPublishingError && (
            <ChoiceList
              title="Sales channel"
              titleHidden
              choices={[
                { label: "Online Store", value: "Online store" },
                { label: "Point of Sale", value: "Point of sale" },
              ]}
              selected={publishingError}
              onChange={handlePublishingErrorChange}
            />
          )}
        </>
      ),
      pinned: true,
    },
  ];

  const appliedFilters: IndexFiltersProps["appliedFilters"] = [];

  if (vendors && !isEmpty(vendors)) {
    const key = "vendors";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, vendors),
      onRemove: handleVendorsRemove,
    });
  }

  if (Markate && !isEmpty(Markate)) {
    const key = "Markate";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, Markate, markateChilde),
      onRemove: handleMarkateRemove,
    });
  }
  if (salesChannel && !isEmpty(salesChannel)) {
    const key = "salesChannel";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, salesChannel, salesChilde),
      onRemove: handleSalesChannelRemove,
    });
  }

  if (status && !isEmpty(status)) {
    const key = "status";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, status),
      onRemove: handleStatusRemove,
    });
  }
  if (types && !isEmpty(types)) {
    const key = "types";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, types),
      onRemove: handleTypeRemove,
    });
  }

  if (publishingError && !isEmpty(publishingError)) {
    const key = "publishingError";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, publishingError),
      onRemove: handlePublishingErrorRemove,
    });
  }

  if (giftCard && !isEmpty(giftCard)) {
    const key = "giftCard";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, giftCard),
      onRemove: handleGiftCardRemove,
    });
  }

  if (!isEmpty(taggedWith)) {
    const key = "taggedWith";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, taggedWith),
      onRemove: handleTaggedWithRemove,
    });
  }

  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  } = useIndexResourceState(orders);

  console.log("selectedResources---------", selectedResources);

  function ActionListInPopoverExample() {
    const [active, setActive] = useState(false);

    const toggleActive = useCallback(() => setActive((active) => !active), []);

    const handleImportedAction = useCallback(() => {
      handleSelectionChange("all", true, null, null);
    }, []);

    const handleExportedAction = useCallback(() => {
      clearSelection();
    }, []);

    const activator = (
      <Button variant="tertiary" onClick={toggleActive} disclosure>
        {allResourcesSelected ? "All" : selectedResources.length} selected
      </Button>
    );

    return (
      <Box
        position="absolute"
        insetInlineStart="800"
        paddingBlockStart="100"
        zIndex="200"
      >
        <Popover
          active={active}
          activator={activator}
          autofocusTarget="first-node"
          onClose={toggleActive}
        >
          <ActionList
            actionRole="menuitem"
            items={[
              {
                content: "Select all 17 on page",
                onAction: handleImportedAction,
              },
              {
                content: "Unselect all",
                onAction: handleExportedAction,
              },
            ]}
          />
        </Popover>
      </Box>
    );
  }

  const rowMarkup = orders.map(
    (
      {
        Product_img,
        Product_name,
        Status,
        Inventory,
        Sales_channels,
        Markets,
        B2B_catalogs,
        Type,
        Category,
        Vendor,
        id,
        StoreStatus,
      },
      index
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Link
            removeUnderline="true"
            monochrome
            dataPrimaryLink
            variant="headingXs"
            as="span"
            tone="subdued"
            fontWeight="regular"
          >
            <InlineStack wrap={false} blockAlign="center" gap="200">
              <Thumbnail source={Product_img} alt="Black choker necklace" />
              {Product_name}
            </InlineStack>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Badge
            tone={
              Status === "Active"
                ? "info"
                : Status === "Draft"
                ? "success"
                : "small"
            }
          >
            {Status}
          </Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>{Inventory}</IndexTable.Cell>
        <IndexTable.Cell className="hover_indexCell">
          {Sales_channels.length <= 0 ? (
            <BlockStack inlineAlign="end">
              <Box paddingInlineEnd="400">{Sales_channels.length}</Box>
            </BlockStack>
          ) : (
            <PopoverSales_channels Sales_channels={Sales_channels} />
          )}
        </IndexTable.Cell>
        <IndexTable.Cell className="hover_indexCell">
          <PopoverMarkate Markate={Markets} />
        </IndexTable.Cell>
        <IndexTable.Cell>{B2B_catalogs}</IndexTable.Cell>
        <IndexTable.Cell>{Category}</IndexTable.Cell>
        <IndexTable.Cell>{Type}</IndexTable.Cell>
        <IndexTable.Cell>{Vendor}</IndexTable.Cell>
        <IndexTable.Cell>{StoreStatus}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  // set locale storage

  useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);
  useEffect(() => {
    localStorage.setItem("vendorList", JSON.stringify(vendorList));
  }, [vendorList]);
  useEffect(() => {
    localStorage.setItem("Markate", JSON.stringify(Markate));
  }, [Markate]);
  useEffect(() => {
    localStorage.setItem("salesChannel", JSON.stringify(salesChannel));
  }, [salesChannel]);
  useEffect(() => {
    localStorage.setItem("publishingError", JSON.stringify(publishingError));
  }, [publishingError]);
  useEffect(() => {
    localStorage.setItem("markateChilde", JSON.stringify(markateChilde));
  }, [markateChilde]);
  useEffect(() => {
    localStorage.setItem("salesChilde", JSON.stringify(salesChilde));
  }, [salesChilde]);
  useEffect(() => {
    localStorage.setItem("giftCard", JSON.stringify(giftCard));
  }, [giftCard]);

  useEffect(() => {
    localStorage.setItem("vendors", JSON.stringify(vendors));
  }, [vendors]);
  useEffect(() => {
    localStorage.setItem("status", JSON.stringify(status));
  }, [status]);
  useEffect(() => {
    localStorage.setItem("taggedWith", JSON.stringify(taggedWith));
  }, [taggedWith]);
  useEffect(() => {
    localStorage.setItem("queryValue", JSON.stringify(queryValue));
  }, [queryValue]);
  useEffect(() => {
    localStorage.setItem("types", JSON.stringify(types));
  }, [types]);

  useEffect(() => {
    localStorage.setItem("sortSelected", JSON.stringify(sortSelected));
  }, [sortSelected]);
  // end localStorage

  useEffect(() => {
    const uniqueStrings = [];
    var TempObj = staticOrders.map((currItem) => {
      return { label: currItem.Vendor, value: currItem.Vendor };
    });
    const uniqueArray = TempObj.filter((obj) => {
      const string = JSON.stringify(obj);
      if (!uniqueStrings?.includes(string)) {
        uniqueStrings.push(string);
        return true;
      }
    });

    setVendorList(uniqueArray);
  }, []);

  const promotedBulkActions = [
    {
      content: "Bulk edit",
      onAction: () => console.log("Todo: implement create shipping labels"),
    },
    {
      content: "Set as draft",
      onAction: () => console.log("Todo: implement mark as fulfilled"),
    },
  ];
  const bulkActions = [
    {
      content: "Add tags",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
    {
      content: "Remove tags",
      onAction: () => console.log("Todo: implement bulk remove tags"),
    },
    {
      icon: DeleteIcon,
      destructive: true,
      content: "Delete customers",
      onAction: () => console.log("Todo: implement bulk delete"),
    },
  ];

  return (
    <Box id="indexFilters">
      <LegacyCard>
        <IndexFilters
          sortOptions={sortOptions}
          sortSelected={sortSelected}
          queryValue={queryValue}
          queryPlaceholder="Searching in all"
          onQueryChange={handleFiltersQueryChange}
          onQueryClear={() => setQueryValue("")}
          onSort={setSortSelected}
          primaryAction={primaryAction}
          cancelAction={{
            onAction: onHandleCancel,
            disabled: false,
            loading: false,
          }}
          tabs={tabs}
          onSelect={setSelected}
          canCreateNewView
          onCreateNewView={onCreateNewView}
          filters={filters}
          appliedFilters={appliedFilters}
          onClearAll={handleFiltersClearAll}
          mode={mode}
          setMode={setMode}
        />

        <Box>
          {selectedResources.length !== 0 && <ActionListInPopoverExample />}
        </Box>
        <IndexTable
          condensed={useBreakpoints().smDown}
          resourceName={resourceName}
          itemCount={orders.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          bulkActions={bulkActions}
          promotedBulkActions={promotedBulkActions}
          onSelectionChange={handleSelectionChange}
          headings={[
            {
              title: (
                <IndexTableTitle
                  setSortSelected={setSortSelected}
                  sortSelected={sortSelected}
                  TableTitle="Product"
                  shortMethod1="Product asc"
                  shortMethod2="Product desc"
                />
              ),
            },
            { title: "Status" },

            {
              title: (
                <IndexTableTitle
                  setSortSelected={setSortSelected}
                  sortSelected={sortSelected}
                  TableTitle="Inventory"
                  shortMethod1="Inventory Lowest to highest"
                  shortMethod2="Inventory Highest to Lowest"
                />
              ),
            },

            { title: "Seles channels", alignment: "end" },
            { title: "Markets" },
            { title: "B2B catalogs" },
            { title: "Category" },

            {
              title: (
                <IndexTableTitle
                  setSortSelected={setSortSelected}
                  sortSelected={sortSelected}
                  TableTitle="Type"
                  shortMethod1="Product type asc"
                  shortMethod2="Product type desc"
                />
              ),
            },
            {
              title: (
                <IndexTableTitle
                  setSortSelected={setSortSelected}
                  sortSelected={sortSelected}
                  TableTitle="Vender"
                  shortMethod1="Vender asc"
                  shortMethod2="Vender desc"
                />
              ),
            },
            { title: "" },
          ]}
          lastColumnSticky
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
    </Box>
  );

  function disambiguateLabel(
    key: string,
    value: string | any[],
    child: ""
  ): string {
    switch (key) {
      case "status":
        return `status : ${value}`;
      case "Markate":
        if (child === "included") {
          return `included in ${value}`;
        } else {
          return `Excluded from ${value}`;
        }
      case "salesChannel":
        if (child === "included") {
          return `included in ${value}`;
        } else {
          return `Excluded from ${value}`;
        }

      case "taggedWith":
        return `Tagged with ${value}`;
      case "vendors":
        return value.map((val) => `Customer ${val}`).join(", ");
      default:
        return value;
    }
  }

  function isEmpty(value: string | string[]): boolean {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
}

const IndexTableTitle = ({
  setSortSelected,
  sortSelected,
  TableTitle,
  shortMethod1,
  shortMethod2,
}) => {
  const [iconState, setIconState] = useState("hide");
  return (
    <Box
      onMouseEnter={() => setIconState("visible")}
      onMouseLeave={() => setIconState("hide")}
      onClick={() =>
        setSortSelected((pre) =>
          pre[0] === shortMethod1 ? [shortMethod2] : [shortMethod1]
        )
      }
    >
      <InlineStack align="center">
        <InlineGrid columns={"19px 85px"} alignItems="center">
          {TableTitle}{" "}
          <span className={iconState}>
            <Icon
              as="span"
              source={
                sortSelected[0] === shortMethod1
                  ? ArrowDownIcon
                  : sortSelected[0] === shortMethod2
                  ? ArrowUpIcon
                  : ArrowDownIcon
              }
              tone="base"
            />
          </span>
        </InlineGrid>
      </InlineStack>
    </Box>
  );
};

const EyeIcon = () => {
  return (
    <>
      <Tooltip content="Preview on Online Store">
        <Text fontWeight="bold" as="span">
          <Box padding="200" id="hover_EyeIcon" borderRadius="400">
            <Icon source={ViewIcon} tone="base" />
          </Box>
        </Text>
      </Tooltip>
    </>
  );
};
