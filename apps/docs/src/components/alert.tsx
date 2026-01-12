import { Alert } from "solid-element-ui";


const AlertDemo = () => {
    return (
        <div>
            <Alert>
                《Solid Element UI》是一个基于 SolidJS 和 Tailwind CSS
                构建的现代化 UI
                组件库，旨在为开发者提供高效、灵活且易于使用的前端组件，帮助他们快速构建响应式和美观的用户界面。
            </Alert>
            <br />
            <Alert intent="success" title="成功提示">
                组件库，旨在为开发者提供高效、灵活且易于使用的前端组件，帮助他们快速构建响应式和美观的用户界面。
            </Alert>
            <br />
            <Alert intent="warning" title="警告提示">
                组件库，旨在为开发者提供高效、灵活且易于使用的前端组件，帮助他们快速构建响应式和美观的用户界面。
            </Alert>
            <br />
            <Alert intent="danger" title="危险提示">
                组件库，旨在为开发者提供高效、灵活且易于使用的前端组件，帮助他们快速构建响应式和美观的用户界面。
            </Alert>
        </div>
    );
};

export { AlertDemo };