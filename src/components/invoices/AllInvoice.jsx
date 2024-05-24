import { Table } from "antd";
import { useGetAllInvoiceQuery } from "../../redux/api/invoice/invoiceApi";
import { useEffect, useState } from "react";
import InvoiceModal from "../InvoiceModal";

const AllInvoices = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(null);

  const { data: allData, isLoading } = useGetAllInvoiceQuery();

  useEffect(() => {
    if (allData) {
      setData(allData.data);
    }
  }, [allData]);

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
          <button className="bg-neutral-500 text-white px-1 rounded-sm" onClick={() => {setInfo(record); setOpen(true)}}>invoice</button>
        </>
      ),
    },
  ];

  if (isLoading) {
    return <p>loading......</p>;
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1000,
          y: 700,
        }}
        pagination={true}
      />

      {open && <InvoiceModal isOpen={open}
            setIsOpen={setOpen} invoiceInfo={info} items={info.items}/>}
    </div>
  );
};

export default AllInvoices;
