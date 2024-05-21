import { Table } from "antd";
import { useGetAllInvoiceQuery } from "../../redux/api/invoice/invoiceApi";
import { useEffect, useState } from "react";





const AllInvoices = () => {
    const [data, setData] = useState([]);

    const { data: allData, isLoading } = useGetAllInvoiceQuery();

    useEffect(() => {
        if (allData) {
            setData(allData.data);
        }
    }, [allData]);
    const items = data.items
    const dataWithIndex = items?.map((item, index) => ({ ...item, index }));
    console.log(dataWithIndex)
    const columns = [
        {
            title: 'Order Id',
            dataIndex: 'orderId',
            key: 'name',
        },
        {
            title: 'Cashier Name',
            dataIndex: 'cashier_name',
            key: 'age',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customer_name',
            key: 'age',
        },
        {
            title: 'Customer Phone',
            dataIndex: 'customer_phone',
            key: 'age',
        },
        {
            title: 'Customer Address',
            dataIndex: 'customer_address',
            key: 'address',
        },
        {
            title: 'Items',
            dataIndex: `items`,
            fixed: 'right',
            key: 'items',
            render: items => items.length
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <a>action</a>,
        },
    ];
    

    if (isLoading) {
        return <p>loading......</p>
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
        </div>
    );
};

export default AllInvoices;


