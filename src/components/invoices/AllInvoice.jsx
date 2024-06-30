import { Table, Tag } from "antd";
import {
  useGetAllInvoiceQuery,
} from "../../redux/api/invoice/invoiceApi";
import { useState } from "react";
import InvoiceModal from "../InvoiceModal";
import SearchComp from "../usableCompo/SearchComp";
import IPPagination from "../usableCompo/IPPagination";
import { OrderStatus } from "../usableCompo/OrderStatus";
import OrderTabs from "../usableCompo/OrderTabs";

const AllInvoices = () => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);

  const searchQuery = [
    {
      name: "limit",
      value: 10 + "",
    },
    {
      name: "page",
      value: page + "",
    },
  ];
  if (searchTerm) {
    searchQuery.push({
      name: "searchTerm",
      value: searchTerm,
    });
  }

  if (activeTab !== "all") {
    searchQuery.push({
      name: "status",
      value: activeTab,
    });
  }

  const {
    data: allData,
    isLoading,
    isFetching: isInvoicesFetching,
    refetch: refetchAllInvoice
  } = useGetAllInvoiceQuery(searchQuery);

    
  const handleTabChange = (key) => {
      if (key === "all") {
        setActiveTab("all");
        refetchAllInvoice();
      } else {
        setActiveTab(key);
      }
    };
  console.log(allData);

  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "name",
    },
    {
      title: "Cashier Name",
      dataIndex: "cashier_name",
      key: "age",
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "age",
    },
    {
      title: "Customer Phone",
      dataIndex: "customer_phone",
      key: "age",
    },
    {
      title: "Customer Address",
      dataIndex: "customer_address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <Tag
          color={
            item.status === OrderStatus.PENDING
              ? "yellow"
              : item.status === OrderStatus.READY
                ? "blue"
                : item.status === OrderStatus.DELIVERD
                  ? "green"
                    : "red"
          }
        >
          {item.status}
        </Tag>
      ),
    },
    {
      title: "Items",
      dataIndex: `items`,
      fixed: "right",
      key: "items",
      render: (items) => items.length,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "Date",
    },
    {
      title: "Invoices",
      key: "invoice",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <>
          <button
            className="bg-neutral-500 text-white px-1 rounded-sm"
            onClick={() => {
              setInfo(record);
              setOpen(true);
            }}
          >
            invoice
          </button>
        </>
      ),
    },
  ];

  if (isLoading) {
    return <p>loading......</p>;
  }

  return (
    <div>
      <div className="my-5">
        <SearchComp style={{ width: 200, marginBottom: "1.25rem" }} setSearchTerm={setSearchTerm} />
        <OrderTabs

              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />
      </div>
      <Table
        columns={columns}
        loading={isInvoicesFetching}
        rowKey="_id"
        dataSource={allData?.data}
        pagination={false}
        scroll={{ x: 400 }}
      />
      <IPPagination
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "1rem",
        }}
        page={page}
        setPage={setPage}
        total={allData?.meta.total}
        pageSize={allData?.meta.limit}
      />

      {open && (
        <InvoiceModal
          isOpen={open}
          setIsOpen={setOpen}
          invoiceInfo={info}
          refetch={refetchAllInvoice}
          loading={isInvoicesFetching}
          items={info.items}
        />
      )}
    </div>
  );
};

export default AllInvoices;
