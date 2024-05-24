/* eslint-disable react/prop-types */
import Barcode from "react-barcode";
import icchaporon from "../../src/img/logo-ip.png";
import ifashion from "../../src/img/I Fashion Logo.png";
import mi from "../../src/img/images.png";

const Invoice = ({ invoiceInfo, copy, date, items }) => {
   
  return (
    <div>
      <div className="mx-5 grid grid-cols-3">
        <div className="col-span-1">
          <div className="">
            <p>Bill From</p>
            <img
              className="my-4 w-20"
              src={
                invoiceInfo.cashierInfo?.image ||
                (invoiceInfo.cashier_name === "icchaporon.com"
                  ? icchaporon
                  : invoiceInfo.cashier_name === "I fashion"
                  ? ifashion
                  : invoiceInfo.cashier_name === "Mi Official Store"
                  ? mi
                  : icchaporon)
              }
              alt=""
            />
          </div>

          <h2 className=" text-2xl font-bold">
            {invoiceInfo.cashierInfo?.name || invoiceInfo.cashier_name}
          </h2>
          <h2 className="text-xl font-bold">COD</h2>

          {invoiceInfo.cashierInfo?.address ? (
            <div
              className="text-xs"
              dangerouslySetInnerHTML={{
                __html: invoiceInfo.cashierInfo.address,
              }}
            />
          ): <div className="text-xs">{invoiceInfo.customer_address}</div>}

          <p className="text-xs">
            <span className="font-bold">Phone No. </span> +8809611-595290
          </p>
        </div>
        <div>
          <p className="col-span-1 text-center text-xs">{copy} Copy</p>
        </div>
        <div className="col-span-1 text-right">
          <h1 className="text-3xl font-bold">INVOICE</h1>
          <p>IPN{invoiceInfo.orderId}COD</p>

          <p className="text-xs">Date: {date}</p>
          <div className="flex justify-end">
            <Barcode
              width={2}
              height={50}
              value={`IPN${invoiceInfo.orderId}COD`}
              displayValue={false}
            />
          </div>

          <p className="text-xs font-bold">
            Bill To:{" "}
            <span className="font-normal">{invoiceInfo.customer_name}</span>
          </p>
          <p className="text-xs font-bold">
            Mobile no.{" "}
            <span className="font-normal">{invoiceInfo.customer_phone}</span>
          </p>
          <p className="text-xs font-bold">Address:</p>
          <p className="text-xs">{invoiceInfo.customer_address}</p>
        </div>
      </div>
      <div className="mx-5 mt-10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-y border-black/10 text-sm md:text-base">
              <th className="text-center">Item & Description</th>
              <th className="text-center">Rate</th>
              <th className="text-right">Quantity</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="w-[60%]">{item.name || "item"}</td>
                <td className="min-w-[100px] text-center">Tk. {item.price}</td>
                <td className="min-w-[40px] text-center">
                  {Number(item.qty).toFixed(0)}
                </td>
                <td className="min-w-[90px] text-right">
                  Tk. {Number(item.price * item.qty).toFixed(0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <div className="mt-10 mr-5 ml-auto flex max-w-xs flex-col items-end space-y-2">
          <div className="flex w-full justify-between pt-10">
            <span className="font-bold">Subtotal:</span>
            <span>Tk. {invoiceInfo.subTotal}</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold">Delivery Charge:</span>
            <span>
              Tk.{" "}
              {isNaN(invoiceInfo.delivery_charge)
                ? "0.00"
                : invoiceInfo.delivery_charge}
            </span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold">Total:</span>
            <span>
              {isNaN(invoiceInfo.total) ? "0.00" : invoiceInfo.total}{" "}
              BDT
            </span>
          </div>
          <div className="flex w-full justify-between">
            <span className="font-bold">Paid Amount:</span>
            <span>
              {isNaN(invoiceInfo.paid_amount)
                ? "0.00"
                : invoiceInfo.paid_amount}{" "}
              BDT
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-black/10 py-2">
            <span className="font-bold">Due:</span>
            <span className="font-bold">
              {isNaN(invoiceInfo.due)
                ? "0.00"
                : invoiceInfo.due % 1 === 0
                ? invoiceInfo.due
                : invoiceInfo.due}{" "}
              BDT
            </span>
          </div>
        </div>
      </div>
      <div className="mt-16 text-center mx-auto text-xs font-semibold w-[50%] text-violet-900">
        <h6 className="break-all">**{invoiceInfo.note}**</h6>
      </div>
    </div>
  );
};

export default Invoice;
