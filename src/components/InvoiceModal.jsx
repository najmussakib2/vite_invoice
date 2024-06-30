/* eslint-disable react/prop-types */
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import printImg from "../img/printer-1598-svgrepo-com.svg";

import {
  useCreateInvoiceMutation,
  useUpdateStatusMutation,
} from "../redux/api/invoice/invoiceApi";
import { useReactToPrint } from "react-to-print";
import Invoice from "./Invoice";
import { Button } from "antd";

const InvoiceModal = ({
  isOpen,
  setIsOpen,
  invoiceInfo,
  refetch,
  items,
  onAddNextInvoice,
}) => {
  function closeModal() {
    setIsOpen(false);
  }
  const [createInvoice] = useCreateInvoiceMutation();

  const [updateStatus] = useUpdateStatusMutation();

  const info = {
    cashier_name: invoiceInfo.cashierInfo?.name || invoiceInfo.cashier_name,
    customer_name: invoiceInfo.customer_name,
    customer_phone: invoiceInfo.customer_phone,
    customer_address: invoiceInfo.customer_address,
    delivery_charge: invoiceInfo.delivery_charge,
    paid_amount: invoiceInfo.paid_amount,
    note: invoiceInfo.note,
    subTotal: invoiceInfo.subTotal,
    total: invoiceInfo.total,
    due: invoiceInfo.due,
    items: items,
  };

  const addNextInvoiceHandler = async () => {
    try {
      const response = await createInvoice(info);
      console.log(response);
      if (response.data.success === true) {
        refetch();
        setIsOpen(false);
        onAddNextInvoice();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateInvoiceStatusHandler = async (status) => {
    try {
      const response = await updateStatus({id: invoiceInfo._id, status }).unwrap();
      console.log(response);
      if (response.success === true) {
        refetch();
        setIsOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const date = new Date();
  const today = date.toLocaleDateString("en-GB", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "invoice",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  console.log("134 invoice modal: ", invoiceInfo?.orderId || null);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-7xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
              <div className="flex justify-between">
                <div id="jsonContainer">
                  <pre>
                    <code>{JSON.stringify(invoiceInfo, null, 2)}</code>
                  </pre>
                </div>
                <div className="flex flex-col items-end gap-10">
                  <Button onClick={closeModal}>x</Button>

                  <Button className="mx-10"
                  onClick={()=>updateInvoiceStatusHandler("deliverd")}
                  >change status as delivered</Button>

                  <Button className="mx-10"
                  onClick={()=>updateInvoiceStatusHandler("ready_to_delivery")}
                  >change status as ready to delivered</Button>
                  <Button
                  onClick={() => {
                    handlePrint(null, () => contentToPrint.current);
                  }}
                  >
                    <img src={printImg} alt="" />
                  </Button>
                </div>
              </div>
              <div
                className="py-10 px-5 hidden print:block"
                ref={contentToPrint}
              >
                <div className="flex" id="print">
                  <Invoice
                    invoiceInfo={invoiceInfo}
                    copy={"Customer"}
                    date={today}
                    items={items}
                  />
                  <Invoice
                    invoiceInfo={invoiceInfo}
                    copy={"Office"}
                    date={today}
                    items={items}
                  />
                </div>
              </div>
              <div className="mt-4 flex space-x-2 px-4 pb-6">
                <button
                  className="flex w-full items-center justify-center space-x-1 rounded-md border border-blue-500 py-2 text-sm text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white"
                  onClick={() => {
                    handlePrint(null, () => contentToPrint.current);
                  }}
                >
                  <img src={printImg} alt="" />

                  <span>Print</span>
                </button>

                {!invoiceInfo?._id ? (
                  <button
                    onClick={addNextInvoiceHandler}
                    className="flex w-full items-center justify-center space-x-1 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                    <span>Next</span>
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InvoiceModal;
