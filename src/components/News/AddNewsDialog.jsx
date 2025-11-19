import React, { useState } from "react";
// import dayjs from "dayjs";
import { MenuItem } from "@mui/material";
import FormDialog from "../FormDialog";
import FormField from "../FormField";

export default function AddNewsDialog({ open, onClose, onSave, currentUser }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Draft");
  // const [publishedDate, setPublishedDate] = useState("");

  const handleSave = () => {
    const NewData = {
      title,
      content,
      status: status.toLowerCase(),
      // ...(status === "Published" && {
      //   published_date: publishedDate
      //     ? dayjs(publishedDate).hour(0).minute(0).second(0).toISOString()
      //     : dayjs().toISOString()
      // })
    };
    onSave(NewData);

    // reset
    setTitle("");
    setContent("");
    setStatus("Draft");
    // setPublishedDate("");
    onClose();
  };

  return (
    <FormDialog open={open} onClose={onClose} onSave={handleSave} title="Buat Berita Baru">
      <FormField
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <FormField
        label="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        multiline
        rows={4}
      />

      <FormField
        label="Status"
        select
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <MenuItem value="Draft">Draft</MenuItem>
        <MenuItem value="Published">Published</MenuItem>
      </FormField>

      {/* <FormField
        type="date"
        label="Published Date"
        value={publishedDate}
        onChange={e => setPublishedDate(e.target.value)}
        disabled={status === "Draft"}
      /> */}

      <FormField
        label="Author"
        value={currentUser.username}
        disabled
      />
    </FormDialog>
  );
}
