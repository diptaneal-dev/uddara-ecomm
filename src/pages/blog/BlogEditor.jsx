import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import blogService from "../../services/BlogService";
import ImageUploader from "./ImageUploader";
import FontSettingsModal from "./FontSettingsModal";
import BannerUploadModal from "./BannerUploadModal";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./customBlogsEditor.css";

import {
    FaBold, FaItalic, FaUnderline, FaStrikethrough, FaCode, FaImage,
    FaListOl, FaListUl, FaAlignLeft, FaAlignCenter, FaAlignRight,
    FaTimes, FaEye, FaSave, FaEllipsisV, FaTrash, FaUndo, FaRedo
} from "react-icons/fa";

const colors = ["#000000", "#FF0000", "#008000", "#0000FF", "#FFA500"];

export default function CustomBlogEditor() {
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const colorButtonRef = useRef(null);
    const [isFontModalOpen, setIsFontModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isDraft, setIsDraft] = useState(true);
    const [showBannerModal, setShowBannerModal] = useState(false);
    const [bannerButtonPosition, setBannerButtonPosition] = useState({ top: 0, left: 0 });

    // ✅ Initialize everything empty (not from localStorage)
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [timestamp, setTimestamp] = useState(new Date().toLocaleString());
    const [coverImageUrl, setCoverImageUrl] = useState("");
    const [blogId, setBlogId] = useState("");

    const [showColorDropdown, setShowColorDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

    // ✅ Automatically get or create a draft blog on mount
    useEffect(() => {
        const fetchOrCreateDraft = async () => {
            try {
                console.log("🔄 Checking for existing draft...");
                const response = await blogService.getLatestDraftBlog(); // ✅ Call backend `/latest-draft`

                if (response && response.id) {
                    setBlogId(response.id);
                    setTitle(response.title || "Untitled Blog");
                    setContent(response.content || "");
                    setCoverImageUrl(response.coverImageUrl || "");
                    setTimestamp(response.timestamp || new Date().toLocaleString());
                    setIsDraft(true);
                    alert("⚠️ You are editing an unsaved draft.");
                    console.log(`✅ Using existing draft ID: ${response.id}`);
                } else {
                    console.log("🆕 No existing draft found. Creating a new one...");
                    const draftResponse = await blogService.createDraftBlog({ title: "Untitled Blog" });

                    if (draftResponse && draftResponse.id) {
                        setBlogId(draftResponse.id);
                        console.log(`✅ New Draft Blog ID: ${draftResponse.id}`);
                    } else {
                        console.error("❌ Failed to get draft blog ID from backend.");
                    }
                }
            } catch (error) {
                console.error("❌ Error fetching/creating draft blog:", error);
            }
        };

        fetchOrCreateDraft();
    }, []);

    useEffect(() => {
        if (editorRef.current && document.activeElement !== editorRef.current) {
            editorRef.current.focus();
            document.execCommand("selectAll", false, null);
            document.execCommand("insertText", false, content);
        }
    }, [content]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setTimestamp(new Date().toLocaleString());
    };

    const applyFormatting = (format, value = "") => document.execCommand(format, false, value);

    const applyHeading = (tag) => {
        if (editorRef.current) {
            document.execCommand("formatBlock", false, `<${tag}>`);
        }
    };

    const handleCoverImageUpload = async (e) => {
        if (!blogId) {
            alert("⚠️ Cannot upload cover image. Blog ID is missing.");
            return;
        }

        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await blogService.uploadCoverImage(blogId, formData);
            if (response && response.coverImageUrl) {
                setCoverImageUrl(response.coverImageUrl);
                alert("✅ Cover image uploaded successfully!");
            }
        } catch (error) {
            console.error("❌ Error uploading cover image:", error);
            alert("❌ Failed to upload cover image.");
        } finally {
            setIsUploading(false);
        }
    };

    const removeCoverImage = () => {
        setCoverImageUrl("");
    };

    const toggleColorDropdown = () => {
        if (colorButtonRef.current) {
            const rect = colorButtonRef.current.getBoundingClientRect();
            setDropdownPosition({ top: rect.bottom + window.scrollY + 5, left: rect.left + window.scrollX });
        }
        setShowColorDropdown((prev) => !prev);
    };

    const applyTextColor = (color) => {
        document.execCommand("foreColor", false, color);
        setShowColorDropdown(false);
    };

    const handleSave = async () => {
        if (!blogId) {
            console.error("Cannot save. Blog ID is missing.");
            return;
        }

        const blogData = {
            title,
            content: editorRef.current.innerHTML,
            coverImageUrl,
            timestamp: new Date().toISOString(),
            status: "SAVED"
        };

        try {
            await blogService.updateBlog(blogId, blogData);
            setIsDraft(false);
            alert("Blog saved successfully!");
            navigate(`/blog/${blogId}`);
        } catch (error) {
            console.error("Error saving blog:", error);
        }
    };

    const handleAutosave = async () => {
        if (!blogId || !isDraft) return;
        const blogData = {
            title,
            content: editorRef.current.innerHTML,
            coverImageUrl,
            timestamp: new Date().toISOString(),
            status: "DRAFT" // ✅ Keep blog as DRAFT
        };
        try {
            await blogService.updateBlog(blogId, blogData);
            console.log("💾 Autosaved draft");
        } catch (error) {
            console.error("❌ Error autosaving blog:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(handleAutosave, 30000); // Autosave every 30 seconds
        return () => clearInterval(interval);
    }, [title, content, coverImageUrl]);

    const handlePreview = () => {
        if (!editorRef.current) return;

        let previewWindow = window.open("", "BlogPreview");
        previewWindow.document.open();
        previewWindow.document.write(`
                <html>
                    <head>
                        <title>Blog Preview - ${title}</title>
                        <!-- ✅ Inject Bootstrap for consistency -->
                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
                        <style>
                            body {
                                font-family: Arial, sans-serif; /* Default font */
                                padding: 20px;
                                line-height: 1.6;
                                background-color: #f8f9fa;
                                color: #212529;
                            }
                            h1, h2, h3, h4, h5, h6 {
                                font-family: inherit;
                                margin-top: 10px;
                                margin-bottom: 10px;
                            }
                            .timestamp {
                                font-size: 14px;
                                color: gray;
                                margin-top: 5px;
                            }
                            hr {
                                border: 0;
                                border-top: 1px solid #ddd;
                            }
                            p, div {
                                font-size: inherit; /* Keep user-selected font size */
                                color: inherit; /* Keep user-selected font color */
                            }
                            ul, ol {
                                margin-left: 20px;
                            }
                            img {
                                max-width: 100%; /* Ensure images fit within the preview */
                                height: auto;
                                display: block;
                                margin: 10px 0;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>${title}</h1>
                        <p class="timestamp">Last updated: ${timestamp}</p>
                        <hr>
                        <div>${editorRef.current.innerHTML}</div> <!-- ✅ Keeps user styles -->
                    </body>
                </html>
            `);
        previewWindow.document.close();
    };

    const insertImage = (url, isBanner = false) => {
        console.log("🖼️ Inserting Image:", url);
        if (!editorRef.current) {
            console.error("❌ Editor reference is missing.");
            return;
        }

        const imgWrapper = document.createElement("div");
        imgWrapper.className = "image-wrapper";
        imgWrapper.style.cssText = `text-align: center; width: 100%; margin: 10px 0;`;

        const img = document.createElement("img");
        img.src = url;
        img.alt = "Inserted Image";
        img.className = "inserted-image";
        img.style.cssText = isBanner ? "width: 100%; height: auto; display: block;" : "width: 500px; height: auto; display: block; margin: 0 auto;";

        imgWrapper.appendChild(img);

        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.insertNode(imgWrapper);
            range.collapse(false);
        } else {
            editorRef.current.appendChild(imgWrapper);
        }

        const br = document.createElement("br");
        editorRef.current.appendChild(br);
    };

    const uploadBannerImage = async (event) => {
        if (!blogId) {
            alert("⚠️ Cannot upload cover image. Blog ID is missing.");
            return;
        }

        const file = event.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await blogService.uploadBannerImage(blogId, formData);
            if (response && response.bannerImageUrl) {
                insertImage(response.bannerImageUrl, true);
                setShowBannerModal(false);
            }
        } catch (error) {
            console.error("❌ Error uploading banner image:", error);
            alert("❌ Failed to upload banner image.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleBannerUpload = async (formData) => {
        if (!blogId) {
            alert("⚠️ Cannot upload cover image. Blog ID is missing.");
            return;
        }

        setIsUploading(true);
        try {
            const response = await blogService.uploadBannerImage(blogId, formData);
            if (response && response.bannerImageUrl) {
                insertImage(response.bannerImageUrl, true);
                setShowBannerModal(false); // ✅ Close modal after upload
            }
        } catch (error) {
            console.error("❌ Error uploading banner image:", error);
            alert("❌ Failed to upload banner image.");
        } finally {
            setIsUploading(false);
        }
    };

    const openBannerModal = (event) => {
        if (!event?.target) return; // Ensure the button is available
    
        const rect = event.target.getBoundingClientRect();
        const extraOffset = 100; // Adjust this value to shift modal inward
    
        setBannerButtonPosition({
            top: rect.bottom + window.scrollY + 5, // Position below button
            left: rect.left + window.scrollX - extraOffset, // Shift it inward
        });
    
        setTimeout(() => setShowBannerModal(true), 10);
    };
    
    return (
        <div className="container-fluid d-flex flex-column align-items-center bg-light p-3">

            {/* Title Input */}
            <input type="text" value={title} onChange={handleTitleChange} className="form-control w-100 w-md-75 mb-2" placeholder="Enter Blog Title..." />
            {/* ✅ Display Blog ID & Last Updated Timestamp */}
            <small className="text-muted">
                <strong>Blog ID:</strong> {blogId || "Generating..."} | Last updated: {timestamp}
            </small>

            {/* Toolbar */}
            <div className="toolbar bg-light p-2 d-flex flex-wrap justify-content-center gap-2 border-bottom shadow-sm w-100 w-md-75 mt-2">
                {[
                    { icon: <FaBold />, action: "bold" },
                    { icon: <FaItalic />, action: "italic" },
                    { icon: <FaUnderline />, action: "underline" },
                    { icon: <FaListOl />, action: "insertOrderedList" },
                    { icon: <FaListUl />, action: "insertUnorderedList" },
                    { icon: <FaAlignLeft />, action: "justifyLeft" },
                    { icon: <FaAlignCenter />, action: "justifyCenter" },
                    { icon: <FaAlignRight />, action: "justifyRight" },
                    { icon: <FaUndo />, title: "Undo", action: "undo" },
                    { icon: <FaRedo />, title: "Redo", action: "redo" },
                ].map((btn, index) => (
                    <button key={index} onClick={() => document.execCommand(btn.action, false, "")} className="btn btn-outline-dark btn-sm">
                        {btn.icon}
                    </button>
                ))}

                {/* Font Settings Button */}
                <button className="btn btn-outline-dark btn-sm" onClick={() => setIsFontModalOpen(true)} title="Font Settings">
                    🖋 Font
                </button>

                {/* Color Picker */}
                <button ref={colorButtonRef} onClick={toggleColorDropdown} className="btn btn-outline-dark btn-sm">🎨 Color</button>
                {showColorDropdown && (
                    <div className="position-absolute bg-white shadow-sm p-2 rounded"
                        style={{ top: dropdownPosition.top, left: dropdownPosition.left, zIndex: 10, display: "flex", gap: "5px", border: "1px solid #ddd" }}>
                        {colors.map((color, index) => (
                            <button key={index} className="btn" style={{ backgroundColor: color, width: "25px", height: "25px", borderRadius: "50%" }}
                                onClick={() => applyTextColor(color)}></button>
                        ))}
                    </div>
                )}

                {/* Heading Dropdown */}
                <select
                    onChange={(e) => applyHeading(e.target.value)}
                    className="form-select"
                    style={{ height: "30px", fontSize: "14px", padding: "2px 8px", width: "auto", minWidth: "100px" }}
                >
                    <option value="">Heading</option>
                    <option value="H1">Heading 1</option>
                    <option value="H2">Heading 2</option>
                    <option value="H3">Heading 3</option>
                    <option value="H4">Heading 4</option>
                    <option value="p">Normal</option>
                </select>

                {/* Image Upload Component */}
                <ImageUploader blogId={blogId} editorRef={editorRef} />

                <button className="btn btn-outline-dark btn-sm" onClick={openBannerModal}>
                    <FaImage />
                </button>


                {/* Save Button */}
                <button className="btn btn-success btn-sm" onClick={handleSave} title="Save Blog">
                    <FaSave />
                </button>

                {/* Preview Button */}
                <button className="btn btn-primary btn-sm" onClick={handlePreview} title="Preview Blog">
                    <FaEye />
                </button>

                {/* More Options */}
                <div className="dropdown">
                    <button className="btn btn-outline-secondary dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown">
                        <FaEllipsisV />
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button className="dropdown-item" onClick={() => applyFormatting("formatBlock", "pre")}>
                                <FaCode /> Code Block
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => applyFormatting("strikeThrough")}>
                                <FaStrikethrough /> Strikethrough
                            </button>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Font Settings Modal */}
            <FontSettingsModal isOpen={isFontModalOpen} onClose={() => setIsFontModalOpen(false)} applyFormatting={applyFormatting} />

            {/* Editor */}
            <div ref={editorRef} contentEditable className="form-control mt-3"
                style={{ minHeight: "400px", padding: "10px", textAlign: "left" }}
                dir="ltr" // ✅ Forces text direction to be Left-to-Right
                onInput={(e) => setContent(e.currentTarget.innerHTML)}>
            </div>

            {/* ✅ Improved Cover Image Section */}
            <div className="cover-image-section my-3 text-center">
                <h5>Cover Image</h5>
                {coverImageUrl ? (
                    <div className="position-relative">
                        <img src={coverImageUrl} alt="Cover" className="img-fluid rounded shadow-sm"
                            style={{ maxHeight: "200px", objectFit: "cover" }} />
                        <button className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                            onClick={removeCoverImage} title="Remove Cover Image">
                            <FaTrash />
                        </button>
                    </div>
                ) : (
                    <>
                        <input type="file" accept="image/*" className="form-control mb-2" onChange={handleCoverImageUpload} />
                        {isUploading && <p className="text-muted">Uploading...</p>}
                    </>
                )}

                {showBannerModal && (
                    <BannerUploadModal
                        isOpen={showBannerModal}
                        onClose={() => setShowBannerModal(false)}
                        onUpload={handleBannerUpload}
                        position={bannerButtonPosition}
                    />
                )}

            </div>

        </div>

    );
}
