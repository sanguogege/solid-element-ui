import { useContext, type Component } from "solid-js";
import { type AnchorLinkProps, AnchorContext } from "./setting";
import { cn } from "@/utils/cn";

export const SeAnchorLink: Component<AnchorLinkProps> = (props) => {
    const ctx = useContext(AnchorContext);
    if (!ctx) return null;

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        ctx.scrollTo(props.href);
    };

    const isActive = () => ctx.activeLink() === props.href;

    return (
        <a
            href={props.href}
            onClick={handleClick}
            class={cn(
                "block py-1 pl-4 text-sm transition-all border-l-2 -ml-[2px]",
                isActive()
                    ? "text-blue-600 border-blue-600 font-medium"
                    : "text-gray-500 border-transparent hover:text-gray-900"
            )}
        >
            {props.title}
        </a>
    );
};
