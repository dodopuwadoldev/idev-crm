import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  ConfigProvider,
} from "antd";
import { getList, putData, deleteData, postData } from "../service/collection";
import { staffs } from "./../schema/index";

export default function Staffs() {
  const [listStaffs, setListStaffs] = useState([]);
  const [dataRow, setDataRow] = useState(null);
  const [form] = Form.useForm();
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    handleGetList();
  }, []);

  const handleUpdate = async (values) => {
    const response = await putData("/staffs", dataRow.id, {
      ...values,
      status: "active",
    });
    if (response.code === 200) {
      handleGetList();
      setDataRow(null);
      alert("แก้ไขสำเร็จ");
    } else {
      alert("เกิดข้อผิดพลาดในการแก้ไข");
    }
  };
  const handleCreate = async (values) => {
    const response = await postData("/staffs", {
      ...values,
      status: "active",
    });
    console.log(response);
    if (response.code === 201) {
      form.resetFields();
      setOpenCreate(false);
      handleGetList();
      alert("สร้างข้อมูลสำเร็จ");
    } else {
      alert("เกิดข้อผิดพลาดในการสร้างข้อมูล");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteData("/staffs", id);
      if (response && response.status === 200) {
        handleGetList();
        alert("ลบข้อมูลสำเร็จ");
      } else {
        alert("ลบข้อมูลไม่สำเร็จ");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("เกิดข้อผิดพลาดขณะลบข้อมูล");
    }
  };

  const handleGetList = async () => {
    const response = await getList("/staffs");
    setListStaffs(response.items.data.lists);
  };

  const onFinish = (values) => {
    handleUpdate(values);
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  return (
    <>
      <div><h2>STAFFS</h2></div>
      <Button
        onClick={() => {
          setOpenCreate(true);
        }}
        style={{ margin: "8px" }}
      >
        Create
      </Button>
      <Table
        pagination={false}
        columns={[
          {
            title: "ชื่อ",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "เบอร์โทร",
            dataIndex: "tel",
            key: "tel",
          },
          {
            title: "รายละเอียด",
            dataIndex: "detail",
            key: "detail",
          },
          {
            title: "สถานะ",
            dataIndex: "status",
            key: "status",
          },
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "สร้างเมื่อ",
            dataIndex: "created_at",
            key: "created_at",
          },
          {
            title: "อัพเดทเมื่อ",
            dataIndex: "updated_at",
            key: "updated_at",
          },
          {
            title: "Action",
            key: "action",
            render: (row) => {
              return (
                <>
                  <Button
                    onClick={() => {
                      setDataRow(row);
                      form.setFieldsValue({
                        name: row?.name,
                        detail: row?.detail,
                        tel: row?.tel,
                      });
                    }}
                    style={{ marginRight: "8px" }}
                  >
                    Edit
                  </Button>

                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => handleDelete(row.id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>
                </>
              );
            },
          },
        ]}
        dataSource={listStaffs}
      ></Table>
      <Modal
        title="Edit Staffs"
        onCancel={() => {
          form.resetFields();
          setDataRow(null);
        }}
        visible={!!dataRow}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Form
          form={form}
          name="editStaffForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input staff's name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tel"
            name="tel"
            rules={[
              { required: true, message: "Please input staff's phone number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Detail"
            name="detail"
            rules={[
              { required: true, message: "Please input staff's details!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Create Staff"
        onCancel={() => setOpenCreate(false)}
        visible={openCreate}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Form
          form={form}
          name="createStaffForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleCreate}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input staff's name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tel"
            name="tel"
            rules={[
              { required: true, message: "Please input staff's phone number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Detail"
            name="detail"
            rules={[
              { required: true, message: "Please input staff's details!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
