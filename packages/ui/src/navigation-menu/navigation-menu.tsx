import { NavigationMenu as KNavigationMenu } from "@kobalte/core/navigation-menu";
import { splitProps, type ComponentProps, type JSX, For, Show } from "solid-js";
import { tv } from "tailwind-variants";

// TODO 不显示问题

const navStyles = tv(
    {
        slots: {
            root: "relative z-10 flex w-full justify-center antialiased",
            trigger: [
                "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all",
                "hover:bg-slate-100 hover:text-slate-900 data-[state=open]:bg-slate-100/50",
                "dark:hover:bg-slate-800 dark:hover:text-slate-50",
            ],
            content:
                "absolute left-0 top-0 w-full p-2 animate-in fade-in zoom-in-95 duration-200",
            viewport:
                "relative mt-1.5 h-(--kb-navigation-menu-viewport-height) w-(--kb-navigation-menu-viewport-width) origin-[top_center] overflow-hidden rounded-md border bg-white shadow-xl dark:bg-slate-950 dark:border-slate-800 transition-[width,height] duration-300",
        },
    },
    {
        twMerge: true,
    },
);

const { root, trigger, content, viewport } = navStyles();

interface NavItem {
    title: string;
    href?: string;
    content?: JSX.Element;
}

export interface NavigationMenuProps
    extends ComponentProps<typeof KNavigationMenu> {
    items: NavItem[];
}

export const NavigationMenu = (props: NavigationMenuProps) => {
    const [local, others] = splitProps(props, ["items", "class"]);

    return (
        <KNavigationMenu class={root({ class: local.class })} {...others}>
            <For each={local.items}>
                {(item) => (
                    <KNavigationMenu.Menu>
                        <Show
                            when={item.content}
                            fallback={
                                <KNavigationMenu.Trigger
                                    as="a"
                                    href={item.href}
                                    class={trigger()}
                                >
                                    {item.title}
                                </KNavigationMenu.Trigger>
                            }
                        >
                            <KNavigationMenu.Trigger class={trigger()}>
                                {item.title}
                                <svg
                                    class="ml-1 h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </KNavigationMenu.Trigger>
                            <KNavigationMenu.Portal>
                                <KNavigationMenu.Content class={content()}>
                                    {item.content}
                                </KNavigationMenu.Content>
                            </KNavigationMenu.Portal>
                        </Show>
                    </KNavigationMenu.Menu>
                )}
            </For>
            <KNavigationMenu.Viewport class={viewport()}>
                <KNavigationMenu.Arrow />
            </KNavigationMenu.Viewport>
        </KNavigationMenu>
    );
};
