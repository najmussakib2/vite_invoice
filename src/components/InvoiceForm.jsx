import { useEffect, useState } from "react";
import { uid } from "uid";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import incrementString from "../helpers/incrementString";
import { useGetAllInvoiceQuery } from "../redux/api/invoice/invoiceApi";
import icchaporon from "../../src/img/logo-ip.png";
import ifashion from "../../src/img/I Fashion Logo.png";
import mi from "../../src/img/images.png";
const date = new Date();
const today = date.toLocaleDateString("en-GB", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const InvoiceForm = () => {
 

  const [invoices, setInvoices] = useState([]);
  console.log(invoices)

  // Fetch invoices data
  useEffect(() => {
    // Your fetch logic to retrieve invoices data
    const fetchData = async () => {
      try {
        const response = await fetch('https://express-invoice-1.onrender.com/api/v1/invoice');
        const data = await response.json();
        setInvoices(data.data);
      } catch (error) {
        console.error('Error fetching invoices data:', error);
      }
    };

    fetchData();
  }, [invoices]);

  // Extract last orderId
  const lastOrderId = invoices.length > 0 ? invoices[invoices.length - 1].orderId : '';






  
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [note, setNote] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const [paid, setPaid] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierInfo, setCashierInfo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [items, setItems] = useState([
    {
      id: uid(6),
      name: "",
      qty: 1,
      price: "1.00",
    },
  ]);

  const {
    data,
     isloading,
    error
  } = useGetAllInvoiceQuery();


  // const lastOrderId = data.data.length > 0 ? data.data[data.data.length - 1].orderId : '';
  // const response = setInvoices(data.data)
  
  console.log(lastOrderId , "invoice");


  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const reviewInvoiceHandler = (event) => {
    
    event.preventDefault();
    setIsOpen(true);
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: "",
        qty: 1,
        price: "1.00",
      },
    ]);
  };

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: "",
        qty: 1,
        price: "1.00",
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);

  const deliCharge = parseInt(deliveryCharge);
  const paidAmount = parseInt(paid);
  const total = isNaN(deliCharge) ? subtotal : subtotal + deliCharge;
  const due = isNaN(paidAmount) ? total : total - paidAmount;
  if (isloading) {
    return <p>loading...</p>
    
  }

  return (
   <div>
    {
      data?.data?.map((invoice,i)=> console.log(invoice))
    }
     <form
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 ">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Current Date: </span>
            <span>{today}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="invoiceNumber">
              Invoice Number:
            </label>
            <input
              disabled
              className="max-w-[130px] bg-slate-100 p-1 rounded-md"
              type="text"
              name="invoiceNumber"
              id="invoiceNumber"
              min="1"
              step="1"
              value={lastOrderId}
              onChange={(event) => setInvoiceNumber(event.target.value)}
            />
          </div>
        </div>
        <h1 className="text-center text-lg font-bold">INVOICE</h1>
        <div className="grid grid-cols-2 gap-5 pt-4 pb-8">
          <div>
            <label
              htmlFor="cashierName"
              className="text-sm font-bold sm:text-base"
            >
              Cashier Info:
            </label>

            <select
              name="cashierName"
              required
              id="cashierName"
              className='bg-slate-100 p-2 rounded-md'
              value={cashierInfo.name}
              onChange={(event) => {
                const selectedOption = event.target.options[event.target.selectedIndex];
                const selectedValue = event.target.value;
                const selectedImage = selectedOption.getAttribute("data-image");
                const selectedAddress = selectedOption.getAttribute("data-address");
                setCashierInfo({
                  name: selectedValue,
                  image: selectedImage,
                  address: selectedAddress
                });
              }}
            >
              <option disabled selected >Select a store</option>
              <option
                value="icchaporon.com"
                data-image={icchaporon}
                data-address="<p >Shop no 9/B (2nd Floor)</p>
                <p>BTI Premier Plaza Shopping mall</p>
                <p>North Badda, Dhaka 1212</p>
                "
              >
                icchaporon
              </option>
              <option
                value="I fashion"
                data-image={ifashion}
                data-address="<p className='text-xs'>Shop no 9/B (2nd Floor)</p>
                <p className='text-xs font-bold'>BTI Premier Plaza Shopping mall</p>
                <p className='text-xs'>North Badda, Dhaka 1212</p>
                "
              >
                I Fashion
              </option>
              <option
                value="Mi Official Store"
                data-image={mi}
                data-address="<p className='text-xs'>4/119 Suvastu Nazer Valley Shopping Mahal</p>
                <p className='text-xs'>Shahazadpur, Dhaka 1212</p>
                "
              >
                Mi Official Store
              </option>
            </select>
          </div>
          <div>
            <label
              htmlFor="customerName"
              className="text-sm font-bold md:text-base"
            >
              Customer Name:
            </label>
            <input
              required
              className="bg-slate-100 p-2 rounded-md"
              type="text"
              name="customerName"
              id="customerName"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="customerName"
              className="text-sm font-bold md:text-base"
            >
              Customer Phone:
            </label>
            <input
              required
              className="bg-slate-100 p-2 rounded-md"
              type="number"
              name="customerName"
              id="customerName"
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="customerName"
              className="text-sm font-bold md:text-base"
            >
              Customer Address:
            </label>
            <input
              required
              className="bg-slate-100 p-2 rounded-md"
              type="text"
              name="customerName"
              id="customerName"
              value={customerAddress}
              onChange={(event) => setCustomerAddress(event.target.value)}
            />
          </div>
        </div>
        <table className="text-left">
          <thead>
            <tr className="border-b ">
              <th>ITEM</th>
              <th className="text-center">QTY</th>
              <th className="text-center">PRICE</th>
              <th className="text-center">AMOUNT</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                qty={item.qty}
                price={item.price}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}
              />
            ))}
          </tbody>
        </table>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
          type="button"
          onClick={addItemHandler}
        >
          Add Item
        </button>
        <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Subtotal:</span>
            <span>Tk. {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Delivery Charge:</span>
            <span>
              Tk. {isNaN(deliCharge) ? "0.00" : deliCharge.toFixed(2) || "0.00"}
            </span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Total:</span>
            <span>Tk. {isNaN(total) ? "0.00" : total.toFixed(2)}</span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Paid Amount:</span>
            <span>
              Tk. {isNaN(paidAmount) ? "0.00" : paidAmount.toFixed(2) || "0.00"}
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Due:</span>
            <span className="font-bold">
              Tk. {isNaN(due) ? "0.00" : due.toFixed(0)}
            </span>
          </div>
        </div>
      </div>
      <div className="basis-1/4 bg-transparent">
        <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
          <button
            className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
            type="submit"
          >
            Review Invoice
          </button>
          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              invoiceNumber,
              lastOrderId,
              cashierInfo,
              customerName,
              customerPhone,
              customerAddress,
              subtotal,
              paidAmount,
              due,
              deliCharge,
              total,
              note,
            }}
            items={items}
            onAddNextInvoice={addNextInvoiceHandler}
          />
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-bold md:text-base" htmlFor="tax">
                Delivery Charge:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-l-md rounded-r-none bg-white p-2 shadow-sm"
                  type="number"
                  name="tax"
                  id="tax"
                  min="0.01"
                  step="0.01"
                  placeholder="0.0"
                  value={deliveryCharge}
                  onChange={(event) => setDeliveryCharge(event.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  $
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-bold md:text-base"
                htmlFor="discount"
              >
                Paid Amount:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-l-md rounded-r-none p-2 bg-white shadow-sm"
                  type="number"
                  name="discount"
                  id="discount"
                  min="0"
                  step="0.01"
                  placeholder="0.0"
                  value={paid}
                  onChange={(event) => setPaid(event.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 p-2 px-4 text-gray-500 shadow-sm">
                  $
                </span>
              </div>
            </div>

            <div className="py-5 text-right">
              <div className="space-y-4">
                <a
                  href="/#"
                  onClick={toggleVisibility}
                  className="rounded-sm bg-blue-300 px-3 py-1 text-xs text-white hover:bg-blue-500 focus:outline-none focus:ring"
                >
                  add a note
                </a>
                {isVisible && (
                  <textarea
                    className="bg-white p-2 rounded-md"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={5}
                    cols={36}
                    placeholder="Type something here..."
                  // Add any additional props or styling as needed
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
   </div>
  );
};

export default InvoiceForm;
