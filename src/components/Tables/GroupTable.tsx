import { Table, Button, Typography, Space, Modal, message, Form, Input } from 'antd';
import { Group } from '../../types';
import { Link } from 'react-router-dom';
import { deleteGroup, updateGroup } from '../../api/services/group';
import { useState } from 'react';

type Props = {
  data: Group[];
  fetchGroups: () => void;
};

export const GroupTable = ({ data, fetchGroups }: Props) => {
  const [form] = Form.useForm();
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  
  const handleDelete = (groupId: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this group?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        deleteGroup(groupId)
          .then(() => {
            message.success('Group deleted successfully');
            fetchGroups();
          })
          .catch(() => {
            message.error('Failed to delete group');
          });
      },
    });
  };

  
  const handleEditClick = (group: Group) => {
    setEditingGroup(group);
    form.setFieldsValue({ name: group.name });
    setEditModalVisible(true);
  };

  const handleEditSubmit = () => {
    form.validateFields().then(values => {
      if (editingGroup) {
        updateGroup(editingGroup.id, values.name).then(() => {
          message.success('Group updated successfully');
          setEditModalVisible(false);
          fetchGroups();
        }).catch(() => {
          message.error('Failed to update group');
        });
      }
    });
  };

  const COLUMNS = [
    {
      title: 'Name',
      dataIndex: 'group_name',
      key: 'group_name',
      render: (_: any, { name }: Group) => (
        <Typography.Paragraph ellipsis={{ rows: 1 }} style={{ marginBottom: 0 }}>
          {name}
        </Typography.Paragraph>
      ),
    },
    {
      title: 'Candidates',
      dataIndex: 'candidates',
      key: 'candidates',
      render: (_: any, { candidates }: Group) => (
        <Typography.Paragraph ellipsis={{ rows: 1 }} style={{ marginBottom: 0 }}>
          {candidates.length}
        </Typography.Paragraph>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, group: Group) => (
        <Space>
          <Button type="primary" onClick={() => handleEditClick(group)}>Edit</Button>
          <Button type="primary" danger onClick={() => handleDelete(group.id)}>
            Delete
          </Button>
          <Link to={`${group.id}/candidates`} state={{ candidates: group.candidates, group }}>
            <Button type="primary">View</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={COLUMNS} />

      <Modal
        title="Edit Group"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleEditSubmit}>
            Save
          </Button>,
        ]}
      >
        <Form form={form} initialValues={{ name: editingGroup?.name }}>
          <Form.Item
            name="name"
            label="Group Name"
            rules={[{ required: true, message: 'Please enter the group name' }]}
          >
            <Input placeholder="Enter group name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
