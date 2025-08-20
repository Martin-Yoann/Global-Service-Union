"use client";

import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";

export default function ManageServicesButton({
  onAddService,
}: {
  onAddService?: (service: { name: string; description: string }) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // 打开表单
  const showModal = () => {
    setIsModalOpen(true);
  };

  // 提交表单
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (onAddService) {
        onAddService(values);
      }
      message.success("Service added successfully!");
      form.resetFields();
      setIsModalOpen(false);
    } catch (err) {
      console.log("Validation Failed:", err);
    }
  };

  // 取消
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Service
      </Button>
      <Modal
        title="Add New Service"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Service Name"
            name="name"
            rules={[{ required: true, message: "Please enter the service name" }]}
          >
            <Input placeholder="Enter service name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter service description" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
