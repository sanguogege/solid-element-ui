/*
 * @Author: error: git config user.name & please set dead value or install git
 * @Date: 2025-06-17 00:47:53
 * @LastEditors: MasterYu
 * @LastEditTime: 2025-07-02 15:07:28
 * @description: ''
 */

import { SeMenu, type MenuItemType } from "solid-element-ui";

import {  useNavigate } from "@solidjs/router";

const menu: MenuItemType[] = [
    {
        key: "",
        label: "通用",
        children: [{ key: "button", label: "button" }],
    },
    {
        key: "",
        label: "布局",
        children: [{ key: "button", label: "button" }],
    },
];

export default () => {
  const navigate = useNavigate();

    return (
        <>
            <SeMenu items={menu} onSelect={(key: any) => navigate(key)} />
        </>
    );
};
