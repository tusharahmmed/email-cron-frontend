import ActionBar from "@/components/ui/ActionBar";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import FTable from "@/components/ui/FTable";
import DashboardLayout from "@/layouts/DashboardLayout";
import {Button} from "antd";
import Link from "next/link";

import dayjs from "dayjs";

import {useGetCampaignDetailsQuery} from "@/rtk/features/api/campaignApi";

import {useRouter} from "next/router";

const CampaignListPage = () => {
  const router = useRouter();

  const id = router.query.id as string;

  const {data, isLoading} = useGetCampaignDetailsQuery(id, {skip: !id});

  // console.log(data);
  const columns = [
    {
      title: "Customer Email",
      dataIndex: "recipient_email",
    },
    {
      title: "Customer Reply",
      dataIndex: "recipient_reply",
    },

    {
      title: "Updated at",
      dataIndex: "updatedAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
  ];

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

        <ActionBar>
          <div>
            <Link href="/admin/campaign">
              <Button type="primary">Back</Button>
            </Link>
          </div>
        </ActionBar>

        <FTable
          loading={isLoading}
          columns={columns}
          dataSource={data?.users}
          showSizeChanger={true}
          showPagination={true}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default CampaignListPage;

CampaignListPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
