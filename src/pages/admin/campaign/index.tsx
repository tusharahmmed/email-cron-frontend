import ActionBar from "@/components/ui/ActionBar";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import FTable from "@/components/ui/FTable";
import DashboardLayout from "@/layouts/DashboardLayout";
import {Button, Input, message, Switch} from "antd";
import Link from "next/link";
import {useState} from "react";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {useDebounced} from "@/rtk/hooks";
import FModal from "@/components/ui/FModal";
import dayjs from "dayjs";
import {
  useDeleteProviderMutation,
  useGetAllProvidersQuery,
} from "@/rtk/features/api/providerApi";
import {
  useDeleteCampaignMutation,
  useGetAllCampaignsQuery,
  useUpdateCampaignMutation,
} from "@/rtk/features/api/campaignApi";
import {ICampaign} from "@/types";

const CampaignListPage = () => {
  const query: Record<string, any> = {};
  const [deleteCampaign] = useDeleteCampaignMutation();
  const [updateCampaign] = useUpdateCampaignMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [runModal, setRunModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [campaignStatus, setCampaignStatus] = useState<boolean>();

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
  const {data, isLoading} = useGetAllCampaignsQuery({...query});

  const campaigns = data?.campaign;
  const meta = data?.meta;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Content",
      dataIndex: "email_body",
    },

    {
      title: "Provider",
      render: function (data: any) {
        return `${data.provider.title}`;
      },
    },

    {
      title: "Status",
      render: function (record: ICampaign) {
        return (
          <Switch
            onClick={() => {
              setCampaignStatus(!record.status);
              setUserId(record.id);
              setRunModal(true);
            }}
            checkedChildren="On"
            unCheckedChildren="Off"
            value={record.status}
          />
        );
      },
    },
    {
      title: "Messages",
      render: (record: any) => {
        return (
          <Link href={`/admin/campaign/view/${record.id}`}>
            <Button
              style={{
                margin: "5px 5px",
              }}
              onClick={() => {}}
              type="primary">
              <EyeOutlined />
            </Button>
          </Link>
        );
      },
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
            {record.status ? (
              <Button
                disabled={true}
                style={{
                  margin: "5px 5px",
                }}
                onClick={() => {}}
                type="primary">
                <EditOutlined />
              </Button>
            ) : (
              <Link href={`/admin/campaign/edit/${record.id}`}>
                <Button
                  style={{
                    margin: "5px 5px",
                  }}
                  onClick={() => {}}
                  type="primary">
                  <EditOutlined />
                </Button>
              </Link>
            )}
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
      const res = await deleteCampaign(id).unwrap();
      if (res) {
        message.success("Campaign Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      setOpen(false);
      // console.log(error);
      message.error(error.message);
    }
  };

  const campaignRunHandler = async (
    id: string,
    status: boolean | undefined
  ) => {
    try {
      const res = await updateCampaign({
        id: id,
        body: {status: status},
      }).unwrap();
      if (res) {
        message.success("Campaign status is updated");
        setRunModal(false);
      }
    } catch (error: any) {
      setRunModal(false);
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
        <ActionBar title="Campaign List">
          <div></div>
          <div>
            <Link href="/admin/campaign/create">
              <Button type="primary">Create Campaign</Button>
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
          dataSource={campaigns}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
          rowKey="id"
        />

        <FModal
          title="Run campaign"
          isOpen={runModal}
          closeModal={() => setRunModal(false)}
          handleOk={() => campaignRunHandler(userId, campaignStatus)}>
          <p className="my-5">Do you want to update the status?</p>
        </FModal>
        <FModal
          title="Remove campaign"
          isOpen={open}
          closeModal={() => setOpen(false)}
          handleOk={() => deleteUserHandler(userId)}>
          <p className="my-5">Do you want to remove this campaign?</p>
        </FModal>
      </div>
    </div>
  );
};

export default CampaignListPage;

CampaignListPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
