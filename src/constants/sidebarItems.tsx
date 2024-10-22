import {type MenuProps} from "antd";
import {ProfileOutlined, MailOutlined} from "@ant-design/icons";
import Link from "next/link";
import {USER_ROLE} from "./role";

export const sidebarItems = (role: string) => {
  const query: Record<string, any> = {};
  query["status"] = "pending";

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}`}>Dashboard</Link>,
      key: "dashboard",
      icon: <ProfileOutlined />,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,

    {
      label: <Link href={`/${role}/provider`}>Provider</Link>,
      key: "provider",
      icon: <MailOutlined />,
    },
    {
      label: <Link href={`/${role}/campaign`}>Campaign</Link>,
      key: "campaign",
      icon: <MailOutlined />,
    },
  ];

  if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
