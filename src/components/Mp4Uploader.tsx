import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { InboxOutlined } from '@ant-design/icons';
import axios, { AxiosResponse } from 'axios';

const { Dragger } = Upload

interface Props {
  uploadUrl: string;
  setRefetch: React.Dispatch<React.SetStateAction<number>>
}


const Mp4Uploader: React.FC<Props> = ({ uploadUrl, setRefetch}) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = (file: RcFile) => {
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    axios.post(uploadUrl, formData)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          message.success(`${file.name} uploaded successfully`);
        } else {
          message.error('File upload failed');
        }
      })
      .finally(() => {
        setUploading(false);
      });

      setTimeout(() => {
        setRefetch((s) => s+1);
      },1000)
  };


  return (
    <Dragger
      name="file"
      showUploadList={false}
      accept=".mp4"
      beforeUpload={(file) => {
        if (file.type !== 'video/mp4') {
          message.error('You can only upload MP4 files!');
          return false;
        }
        return true;
      }}
      customRequest={({ file }:any) => handleUpload(file)}
      disabled={uploading}
    >
      <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
    </Dragger>
  );
};

export default Mp4Uploader;
