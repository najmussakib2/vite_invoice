import { Table } from "antd";
import { useGetAllInvoiceQuery } from "../../redux/api/invoice/invoiceApi";
import { useState } from "react";
import InvoiceModal from "../InvoiceModal";
import SearchComp from "../usableCompo/SearchComp";
import IPPagination from "../usableCompo/IPPagination";

const AllInvoices = () => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  const {
    data: allData,
    isLoading,
    isFetching: isInvoicesFetching,
  } = useGetAllInvoiceQuery(searchQuery);

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
        <SearchComp style={{ width: 200 }} setSearchTerm={setSearchTerm} />
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
          items={info.items}
        />
      )}
    </div>
  );
};

export default AllInvoices;
