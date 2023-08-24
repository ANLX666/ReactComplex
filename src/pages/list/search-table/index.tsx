import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  Card,
  PaginationProps,
  Button,
  Space,
  Typography,
} from '@arco-design/web-react';
import PermissionWrapper from '@/components/PermissionWrapper';
import { IconDownload, IconPlus } from '@arco-design/web-react/icon';
import axios from 'axios';
import useLocale from '@/utils/useLocale';
import SearchForm from './form';
import locale from './locale';
import styles from './style/index.module.less';
import './mock';
import { getColumns } from './constants';
import {
  apiArticleEdit,
  selectByCondition,
  addSubject,
} from '@/request/subject';
import {
  Modal,
  Form,
  Input,
  Select,
  Message,
  Alert,
} from '@arco-design/web-react';
import AddClass from './provider/AddClass';

export const ContentType = ['图文', '横版短视频', '竖版短视频'];
export const FilterType = ['规则筛选', '人工'];
export const Status = ['已上线', '未上线'];

const FormItem = Form.Item;
const { Title } = Typography;

function SearchTable() {
  const t = useLocale(locale);

  const tableCallback = async (record, type) => {
    console.log(record, type);
  };

  const columns = useMemo(() => getColumns(t, tableCallback), [t]);

  const [data, setData] = useState([]);
  const [pagination, setPatination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  const [loading, setLoading] = useState(true);
  const [formParams, setFormParams] = useState({});
  const { current, pageSize } = pagination;

  const [name, setName] = useState(''); // State to hold the input value
  const [description, setDescription] = useState(''); // State to hold the input value

  const handleInputChange = (event) => {
    setName(event);
  };

  const handleSetDescription = (event) => {
    setDescription(event);
  };
  const handleTableData = () => {
    fetchData().then((res) => {
      console.log(res);
      setData(res.data);
      setPatination({
        ...pagination,
        current,
        pageSize,
        total: res.data.length,
      });
      setLoading(false);
    });
  };
  // //删除函数拿过来
  // useEffect(() => {
  //   handleTableData();
  // }, []);

  // const searchData = () => {

  // }

  useEffect(() => {
    // handleTableData();
    handleTableData();
  }, [pagination.current, pagination.pageSize, JSON.stringify(formParams)]);

  function fetchData() {
    const { current, pageSize } = pagination;
    setLoading(true);
    // return apiArticleEdit()
    const param = {
      id: '',
      name: '',
      description: '',
      categoryId: '',
      createTime: '',
      modifyTime: '',
      createUid: '',
      disabled: '',
    };
    return selectByCondition(1, 10, formParams);
  }

  function onChangeTable({ current, pageSize }) {
    setPatination({
      ...pagination,
      current,
      pageSize,
    });
  }

  function handleSearch(params) {
    setPatination({ ...pagination, current: 1 });
    setFormParams(params);
  }
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  function onOk() {
    form.validate().then((res) => {
      setConfirmLoading(true);
      addSubject({
        name: name,
      }).then((res) => {
        console.log(res);
        if (res.msg === '添加成功!') {
          setTimeout(() => {
            Message.success('Success !');
            setVisible(false);
            setConfirmLoading(false);
            handleTableData();
          }, 1500);
        } else {
          setTimeout(() => {
            Message.error('Error !');
            setVisible(false);
            setConfirmLoading(false);
          }, 1500);
        }
      });
    });
  }

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  return (
    <div>
      <AddClass.Provider value={handleTableData}>
        <Card>
          <Title heading={6}>{t['menu.list.searchTable']}</Title>
          {/* 按钮 以及一些搜索信息  */}
          <SearchForm onSearch={handleSearch} />
          <PermissionWrapper
            requiredPermissions={[
              { resource: 'menu.list.searchTable', actions: ['write'] },
            ]}
          >
            <Modal
              title="新建课程"
              visible={visible}
              onOk={onOk}
              confirmLoading={confirmLoading}
              onCancel={() => setVisible(false)}
            >
              <Form
                {...formItemLayout}
                form={form}
                labelCol={{
                  style: { flexBasis: 90 },
                }}
                wrapperCol={{
                  style: { flexBasis: 'calc(100% - 90px)' },
                }}
              >
                <FormItem
                  label="学科名称"
                  field="name"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder=""
                    value={name}
                    onChange={handleInputChange}
                  />
                </FormItem>
                <FormItem
                  label="学科描述"
                  field="description"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder=""
                    value={description}
                    onChange={handleSetDescription}
                  />
                </FormItem>
              </Form>
            </Modal>
            <div className={styles['button-group']}>
              <Space>
                <Button
                  type="primary"
                  icon={<IconPlus />}
                  onClick={() => setVisible(true)}
                >
                  {t['searchTable.operations.add']}
                </Button>
                <Button>{t['searchTable.operations.upload']}</Button>
              </Space>
              <Space>
                <Button icon={<IconDownload />}>
                  {t['searchTable.operation.download']}
                </Button>
              </Space>
            </div>
          </PermissionWrapper>
          {/* 数据表格  */}
          <Table
            rowKey="id"
            loading={loading}
            onChange={onChangeTable}
            pagination={pagination}
            columns={columns}
            data={data}
          />
        </Card>
      </AddClass.Provider>
    </div>
  );
}

export default SearchTable;
