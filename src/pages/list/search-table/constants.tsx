import React from 'react';
import {
  Button,
  Typography,
  Badge,
  Space,
  Popconfirm,
  Message,
  Icon,
} from '@arco-design/web-react';
import IconText from './icons/text.svg';
import { IconPlus, IconDelete } from '@arco-design/web-react/icon';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';
import styles from './style/index.module.less';
import { deleteSubjects } from '@/request/subject';
import { useState, useEffect, useMemo, useContext } from 'react';
import { IconFaceSmileFill } from '@arco-design/web-react/icon';
import AddClass from './provider/AddClass';

const { Text } = Typography;

export const ContentType = ['图文', '横版短视频', '竖版短视频'];
export const FilterType = ['规则筛选', '人工'];
export const Status = ['未上线', '已上线'];
const IconFont = Icon.addFromIconFontCn({
  src: '//at.alicdn.com/t/font_180975_26f1p759rvn.js',
});
const ContentIcon = [
  <IconText key={0} />,
  <IconHorizontalVideo key={1} />,
  <IconVerticalVideo key={2} />,
];

export function getColumns(
  t: any,
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: t['searchTable.columns.id'],
      dataIndex: 'id',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: t['searchTable.columns.name'],
      dataIndex: 'name',
    },
    {
      title: t['searchTable.columns.description'],
      dataIndex: 'description',
    },
    {
      title: t['searchTable.columns.createdTime'],
      dataIndex: 'createTime',
    },
    {
      title: t['searchTable.columns.status'],
      dataIndex: 'status',
      render: (x) => {
        if (x === 0) {
          return <Badge status="error" text={Status[x]}></Badge>;
        }
        return <Badge status="success" text={Status[x]}></Badge>;
      },
    },
    {
      title: t['searchTable.columns.operations'],
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '55px' },
      render: (_, record) => (
        <Space size="large">
          <Button
            type="text"
            size="small"
            onClick={() => callback(record, 'view')}
          >
            {t['searchTable.columns.operations.view']}
          </Button>
          <Popconfirm
            focusLock
            title="Are you sure you want to delete?"
            icon={<IconFaceSmileFill style={{ color: '#0057fe' }} />}
            onOk={() => {
              deleteSubjects(record.id).then((res) => {
                // const {handleTableData} = useContext(AddClass)
                if (res.msg === '操作成功') {
                  Message.success({
                    icon: <IconFont type="icon-success" />,
                    content: '操作成功!',
                  });
                  // callback(record, 'view')
                  window.location.reload();
                } else {
                  Message.error({
                    icon: <IconFont type="icon-error" />,
                    content: '操作失败!',
                  });
                }
              });
            }}
            onCancel={() => {
              Message.error({
                content: 'cancel',
              });
            }}
          >
            <Button type="text" size="small">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
}

export default () => ContentIcon;
