/* eslint-disable react/prop-types */
import { Tag } from "antd";

const OrderTabs = ({ activeTab, handleTabChange }) => {
  return (
    <>
      <Tag
        color={activeTab === "all" ? "blue" : "default"}
        style={{
          padding: "0.2rem 1rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => handleTabChange("all")}
      >
        All
      </Tag>
      <Tag
        color={activeTab === "pending" ? "blue" : "default"}
        style={{
          padding: "0.2rem 1rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => handleTabChange("pending")}
      >
        Pending
      </Tag>
      <Tag
        color={activeTab === "ready_to_dealivery" ? "blue" : "default"}
        style={{
          padding: "0.2rem 1rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => handleTabChange("ready_to_delivery")}
      >
        Ready to Deliver
      </Tag>
      <Tag
        color={activeTab === "deliverd" ? "blue" : "default"}
        style={{
          padding: "0.2rem 1rem",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => handleTabChange("deliverd")}
      >
        Delivered
      </Tag>
    </>
  );
};

export default OrderTabs;
