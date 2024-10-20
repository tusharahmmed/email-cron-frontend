import ActionBar from "@/components/ui/ActionBar";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import FTable from "@/components/ui/FTable";
import DashboardLayout from "@/layouts/DashboardLayout";
import {Button, Input, message} from "antd";
import Link from "next/link";
import {useState} from "react";
import {DeleteOutlined, EditOutlined, ReloadOutlined} from "@ant-design/icons";
import {useDebounced} from "@/rtk/hooks";
import FModal from "@/components/ui/FModal";
import dayjs from "dayjs";
import {
  useDeleteProviderMutation,
  useGetAllProvidersQuery,
} from "@/rtk/features/api/providerApi";

const ProviderListPage = () => {
  const query: Record<string, any> = {};
  const [deleteProvider] = useDeleteProviderMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const {data, isLoading} = useGetAllProvidersQuery({...query});

  const providers = data?.providers;
  const meta = data?.meta;
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Host",
      dataIndex: "host",
    },
    {
      title: "PORT",
      dataIndex: "port",
    },

    {
      title: "Secure",
      render: function (data: any) {
        return `${data.secure}`;
      },
    },
    {
      title: "Username",
      dataIndex: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
    },
    {
      title: "Tls",
      render: function (data: any) {
        return `${data.tls}`;
      },
    },
    {
      title: "Imap port",
      dataIndex: "imap_port",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },

    {
      title: "Action",
      // dataIndex: "id",
      render: function (record: any) {
        // console.log(data);

        return (
          <>
            <Link href={`/admin/provider/edit/${record.id}`}>
              <Button
                style={{
                  margin: "5px 5px",
                }}
                onClick={() => {}}
                type="primary">
                <EditOutlined />
              </Button>
            </Link>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setUserId(record.id);
              }}
              danger
              style={{marginLeft: "3px"}}>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    // console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const {order, field} = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const deleteUserHandler = async (id: string) => {
    try {
      const res = await deleteProvider(id).unwrap();
      if (res) {
        message.success("Provider Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      setOpen(false);
      // console.log(error);
      message.error(error.message);
    }
  };

  return (
    <div>
      <div>
        <FBreadCrumb
          items={[
            {
              label: "admin",
              link: "/admin",
            },
          ]}
        />
        <ActionBar title="Provider List">
          <div></div>
          <div>
            <Link href="/admin/provider/create">
              <Button type="primary">Create Provider</Button>
            </Link>
            {(!!sortBy || !!sortOrder || !!searchTerm) && (
              <Button
                style={{margin: "0px 5px"}}
                type="primary"
                onClick={resetFilters}>
                <ReloadOutlined />
              </Button>
            )}
          </div>
        </ActionBar>

        <FTable
          loading={isLoading}
          columns={columns}
          dataSource={providers}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
          rowKey="id"
        />

        <FModal
          title="Remove provider"
          isOpen={open}
          closeModal={() => setOpen(false)}
          handleOk={() => deleteUserHandler(userId)}>
          <p className="my-5">Do you want to remove this provider?</p>
        </FModal>
      </div>
    </div>
  );
};

export default ProviderListPage;

ProviderListPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
