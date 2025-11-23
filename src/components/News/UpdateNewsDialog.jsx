// src/components/News/UpdateNewsDialog.jsx
import React, { useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import FormDialog from '../FormDialog';
import FormField from '../FormField';
import { getNewsById } from '../../services/News/getNewsById';

export default function UpdateNewsDialog({ open, data, onClose, onUpdated }) {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');
  const [author, setAuthor] = useState('');

  // Ambil detail berita saat dialog dibuka
  useEffect(() => {
    if (open && data?.id) {
      setLoading(true);
      getNewsById(data.id).then((res) => {
        setLoading(false);
        if (res.success) {
          setNews(res.data);
          setTitle(res.data.title || '');
          setContent(res.data.content || '');
          setStatus(res.data.status || 'draft');
          setAuthor(res.data.author);
        }
        console.log(data);
      });
    }
  }, [open, data]);

  const handleSave = async () => {
    if (!news?.id) return;

    const payload = {
      id: news.id,
      title,
      content,
      status,
      author,
    };

    await onUpdated(payload); // panggil handler dari News.jsx

    onClose();
    document.activeElement?.blur();
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      onSave={handleSave}
      title="Edit Berita"
      loading={loading}
    >
      <FormField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <FormField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        multiline
        rows={6}
      />
      <FormField
        label="Status"
        select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <MenuItem value="draft">Draft</MenuItem>
        <MenuItem value="published">Published</MenuItem>
      </FormField>
    </FormDialog>
);
}