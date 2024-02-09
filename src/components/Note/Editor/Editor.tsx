import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./Editor.css"

interface EditorProps {
    background: string;
    content: string;
    onChange: (value: string) => void;
}

function Editor({ background, content, onChange }: EditorProps) {

    const modules = {
        toolbar: {
            container: [
                [{ list: "ordered" }, { list: "bullet" }], [],
                ["bold", "italic", "underline", "strike"], [],
                [{ color: [] }, { background: [] }], [],
                ["link", "image"],
            ],
        },
    };

    return (
        <div className="editor" style={{ backgroundColor: background }}>
            <ReactQuill modules={modules} onChange={(value) => onChange(value)} value={content} />
        </div>
    );
}

export default Editor;
