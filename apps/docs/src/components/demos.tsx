import { parseColor } from "@kobalte/core/colors";

import {
  Accordion,
  Alert,
  AlertDialog,
  Badge,
  Breadcrumbs,
  Button,
  Checkbox,
  Collapsible,
  ColorArea,
  ColorChannelField,
  ColorField,
  ColorSlider,
  ColorSwatch,
  ColorWheel,
  Combobox,
  ComboboxItem,
  ContextMenu,
  Dialog,
  DropdownMenu,
  FileField,
  HoverCard,
  Image,
  Link,
  Menubar,
  Meter,
  NavigationMenu,
  NumberField,
  Pagination,
  Popover,
  Progress,
  RadioGroup,
  RatingGroup,
  Search,
  SegmentedControl,
  Select,
  Separator,
  Skeleton,
  Slider,
  Switch,
  Tabs,
  TextField,
  TimeField,
  ToastProvider,
  ToggleButton,
  ToggleGroup,
  Tooltip,
  showToast,
} from "solid-element-ui";

const options = [
  { value: "one", label: "One" },
  { value: "two", label: "Two" },
  { value: "three", label: "Three" },
];

export function AccordionDemo() {
  return (
    <Accordion
      items={[
        { value: "one", title: "What is solid-element-ui?", content: "A Kobalte wrapper." },
        { value: "two", title: "Why tokens?", content: "Light and dark share one API." },
      ]}
    />
  );
}

export function AlertDemo() {
  return (
    <Alert title="Heads up" variant="info">
      This is an informational alert.
    </Alert>
  );
}

export function AlertDialogDemo() {
  return (
    <AlertDialog
      trigger={<Button>Open alert dialog</Button>}
      title="Delete item?"
      description="This action cannot be undone."
      onConfirm={() => undefined}
    >
      The item will be removed permanently.
    </AlertDialog>
  );
}

export function BadgeDemo() {
  return <Badge>New</Badge>;
}

export function BreadcrumbsDemo() {
  return (
    <Breadcrumbs
      items={[
        { title: "Home", href: "#" },
        { title: "Components", href: "#" },
        { title: "Breadcrumbs", current: true },
      ]}
    />
  );
}

export function ButtonDemo() {
  return <Button>Save</Button>;
}

export function CheckboxDemo() {
  return <Checkbox label="Accept terms" description="You agree to the license." />;
}

export function CollapsibleDemo() {
  return (
    <Collapsible title="Show details">Collapsible content rendered with Kobalte.</Collapsible>
  );
}

export function ColorAreaDemo() {
  return <ColorArea defaultValue={parseColor("#3b82f6")} class="w-48" />;
}

export function ColorChannelFieldDemo() {
  return <ColorChannelField channel="red" defaultValue={parseColor("#3b82f6")} label="Red" />;
}

export function ColorFieldDemo() {
  return <ColorField label="Color" desc="Hex value" />;
}

export function ColorSliderDemo() {
  return <ColorSlider channel="red" defaultValue={parseColor("#3b82f6")} label="Red" showValue />;
}

export function ColorSwatchDemo() {
  return (
    <div class="flex gap-2">
      <ColorSwatch value={parseColor("#3b82f6")} />
      <ColorSwatch value={parseColor("#ef4444")} />
      <ColorSwatch value={parseColor("#22c55e")} />
    </div>
  );
}

export function ColorWheelDemo() {
  return <ColorWheel defaultValue={parseColor("#3b82f6")} />;
}

export function ComboboxDemo() {
  return (
    <Combobox
      options={["Solid", "Kobalte", "Vite"]}
      placeholder="Pick a framework"
      itemComponent={(itemProps) => <ComboboxItem item={itemProps.item} />}
    />
  );
}

export function ContextMenuDemo() {
  return (
    <ContextMenu items={[{ label: "Copy" }, { label: "Rename" }, { label: "Delete" }]}>
      <div class="rounded-md border border-dashed border-light px-4 py-3 text-sm text-muted">
        Right click this area
      </div>
    </ContextMenu>
  );
}

export function DialogDemo() {
  return (
    <Dialog
      trigger={<Button>Open dialog</Button>}
      title="Dialog title"
      description="A short description."
    >
      Dialog body content.
    </Dialog>
  );
}

export function DropdownMenuDemo() {
  return (
    <DropdownMenu
      trigger={<Button>Open menu</Button>}
      items={[{ label: "Profile" }, { label: "Settings" }, { label: "Sign out" }]}
    />
  );
}

export function FileFieldDemo() {
  return <FileField label="Upload a file" description="PNG, JPG or PDF" />;
}

export function HoverCardDemo() {
  return (
    <HoverCard trigger={<Button>Hover me</Button>} showArrow>
      <div class="text-sm text-main">Hover card content.</div>
    </HoverCard>
  );
}

export function ImageDemo() {
  return (
    <Image src="https://picsum.photos/80" alt="Random" fallback="No image" class="h-16 w-16" />
  );
}

export function LinkDemo() {
  return (
    <Link href="https://kobalte.dev" external>
      Kobalte documentation
    </Link>
  );
}

export function MenubarDemo() {
  return (
    <Menubar>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>New</Menubar.Item>
          <Menubar.Item>Open</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>Undo</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar>
  );
}

export function MeterDemo() {
  return (
    <Meter value={64} class="w-64">
      <Meter.Label>Storage used</Meter.Label>
      <Meter.Track>
        <Meter.Fill class="bg-primary" />
      </Meter.Track>
      <Meter.ValueLabel />
    </Meter>
  );
}

export function NavigationMenuDemo() {
  return (
    <NavigationMenu
      items={[
        { title: "Home", href: "#" },
        { title: "Components", content: <div class="p-2 text-sm">Navigation content</div> },
      ]}
    />
  );
}

export function NumberFieldDemo() {
  return <NumberField label="Quantity" />;
}

export function PaginationDemo() {
  return <Pagination count={5} />;
}

export function PopoverDemo() {
  return (
    <Popover trigger={<Button>Open popover</Button>} title="Popover title">
      Popover body content.
    </Popover>
  );
}

export function ProgressDemo() {
  return <Progress value={60} label="Upload" showValue />;
}

export function RadioGroupDemo() {
  return <RadioGroup label="Pick one" options={options} />;
}

export function RatingGroupDemo() {
  return <RatingGroup label="Rating" />;
}

export function SearchDemo() {
  return <Search placeholder="Search components" />;
}

export function SegmentedControlDemo() {
  return <SegmentedControl options={options} />;
}

export function SelectDemo() {
  return <Select options={options} label="Select an option" placeholder="Choose one" />;
}

export function SeparatorDemo() {
  return (
    <div class="flex w-full max-w-xs flex-col gap-2">
      <span class="text-sm">Above</span>
      <Separator />
      <span class="text-sm">Below</span>
    </div>
  );
}

export function SkeletonDemo() {
  return (
    <div class="flex flex-col gap-2">
      <Skeleton width={160} height={20} />
      <Skeleton width={96} height={20} />
    </div>
  );
}

export function SliderDemo() {
  return <Slider label="Volume" defaultValue={[40]} showValue />;
}

export function SwitchDemo() {
  return <Switch label="Enable notifications" description="Receive email updates." />;
}

export function TabsDemo() {
  return (
    <Tabs
      items={[
        { value: "one", label: "Overview", content: "Overview content." },
        { value: "two", label: "API", content: "API content." },
      ]}
    />
  );
}

export function TextFieldDemo() {
  return <TextField label="Email" placeholder="you@example.com" />;
}

export function TimeFieldDemo() {
  return <TimeField label="Start time" />;
}

export function ToastDemo() {
  return (
    <div class="flex flex-col gap-3">
      <ToastProvider />
      <Button onClick={() => showToast({ title: "Saved", description: "Changes stored." })}>
        Show toast
      </Button>
    </div>
  );
}

export function ToggleButtonDemo() {
  return <ToggleButton>Toggle</ToggleButton>;
}

export function ToggleGroupDemo() {
  return <ToggleGroup options={options} />;
}

export function TooltipDemo() {
  return (
    <Tooltip content="Tooltip content">
      <Button>Hover for tooltip</Button>
    </Tooltip>
  );
}
