import {Badge, type MenuProps} from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  MailOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import {USER_ROLE} from "./role";
import {useGetQuotesQuery} from "@/rtk/features/api/quoteApi";

export const sidebarItems = (role: string) => {
  const query: Record<string, any> = {};
  query["status"] = "pending";

  const {data, isLoading} = useGetQuotesQuery({...query});
  const totalPending = data?.meta?.total;

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}`}>Dashboard</Link>,
      key: "dashboard",
      icon: <ProfileOutlined />,
    },
  ];

  const quoteItems: MenuProps["items"] = [
    {
      label: "Manage Quatation",
      key: "manage-quatation",
      icon: <UnorderedListOutlined />,
      children: [
        {
          label: (
            <Link href={`/${role}/quote/pending`}>
              Pending <Badge count={totalPending}></Badge>
            </Link>
          ),
          key: `/${role}/quote/pending`,
        },
        {
          label: <Link href={`/${role}/quote/completed`}>Completed</Link>,
          key: `/${role}/quote/completed`,
        },
        {
          label: <Link href={`/${role}/quote/cancled`}>Cancled</Link>,
          key: `/${role}/quote/cancled`,
        },
      ],
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...quoteItems,

    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <UserOutlined />,
      key: `/${role}/user`,
    },
  ];

  if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
