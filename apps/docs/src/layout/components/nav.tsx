import { createSignal } from "solid-js";

export default (props: any) => {

    const [isDarkMode, setIsDarkMode] = createSignal(false);
    const switchTheme = () => {
        const htmlEl = document.documentElement;
        htmlEl.classList.toggle("dark");
        setIsDarkMode(!isDarkMode());
    };

    return (
        <div class="flex justify-between items-center h-16 px-4 border-b border-gray-200">
            <nav class="shrink-0 border-r border-gray-200">
                <ul class="flex bg-amber-500 h-12 items-center px-4 space-x-4">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </nav>
            <div>
                
            </div>
        </div>
    );
};
