import { useRef } from "react";
import blogService from "../../services/BlogService";
import { FaImages } from "react-icons/fa";

export default function ImageUploader({ blogId, editorRef }) {
    const fileInputRef = useRef(null);

    const handleImageUpload = async (e) => {
        if (!blogId) {
            console.error("Cannot upload image. Blog ID is missing.");
            return;
        }

        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("blogId", blogId);

        try {
            const response = await blogService.uploadImage(formData);
            if (response?.imageUrl) {
                insertImage(response.imageUrl);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const insertImage = (url) => {
        console.log("🖼️ Inserting Image:", url);

        if (!editorRef.current) {
            console.error("❌ Editor reference is missing.");
            return;
        }

        const imgWrapper = document.createElement("div");
        imgWrapper.className = "image-wrapper";
        imgWrapper.style.cssText = `display: inline; vertical-align: top; margin-right: 10px; float: left;
    max-width: 100%; overflow: hidden;`;

        const imgContainer = document.createElement("div");
        imgContainer.className = "resizable-image-container";
        imgContainer.setAttribute("contenteditable", "false");
        imgContainer.setAttribute("draggable", "true");
        imgContainer.style.cssText = `
            display: inline-block; position: relative; resize: both; overflow: hidden;
            cursor: grab; border: 1px dashed gray; padding: 5px; margin: 5px;
        `;

        const img = document.createElement("img");
        img.src = url;
        img.className = "resizable-image";
        img.style.cssText = "width: 500px; height: auto; display: block; cursor: grab;";

        imgContainer.appendChild(img);
        imgWrapper.appendChild(imgContainer);

        // Add an editable span after the image to allow typing next to it
        const editableSpan = document.createElement("span");
        editableSpan.className = "editable-text";
        editableSpan.setAttribute("contenteditable", "true");
        editableSpan.style.cssText = "display: inline-block; min-width: 10px; outline: none;";

        imgWrapper.appendChild(editableSpan);

        // Insert at cursor position
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.insertNode(imgWrapper);
            range.collapse(false);
        } else {
            editorRef.current.appendChild(imgWrapper);
        }

        // Insert a line break after the image to move text below when pressing Enter
        const br = document.createElement("br");
        editorRef.current.appendChild(br);

        makeImagesInteractive();
    };

    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const parent = range.startContainer.parentNode;

                // Check if the cursor is next to an image, then move it below
                if (parent.classList.contains("image-wrapper")) {
                    e.preventDefault();

                    // Insert a new line and move the cursor there
                    const newLine = document.createElement("div");
                    newLine.setAttribute("contenteditable", "true");
                    newLine.style.cssText = "display: block; width: 100%; min-height: 20px;";
                    parent.after(newLine);

                    // Move cursor to the new line
                    const newRange = document.createRange();
                    const sel = window.getSelection();
                    newRange.setStart(newLine, 0);
                    newRange.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(newRange);
                }
            }
        }
    });

    const makeImagesInteractive = () => {
        document.querySelectorAll(".resizable-image-container").forEach((container) => {
            if (!container.hasAttribute("data-init")) {
                container.setAttribute("data-init", "true");
                container.setAttribute("draggable", "true");

                container.addEventListener("dragstart", (e) => {
                    e.dataTransfer.setData("text/plain", "");
                    container.style.opacity = "0.5";
                });

                container.addEventListener("dragend", () => {
                    container.style.opacity = "1";
                });

                let isResizing = false;
                container.addEventListener("mousedown", (e) => {
                    if (e.target === container) {
                        isResizing = true;
                        document.addEventListener("mousemove", resize);
                        document.addEventListener("mouseup", stopResize);
                    }
                });

                const resize = (e) => {
                    if (isResizing) {
                        let width = e.clientX - container.getBoundingClientRect().left;
                        container.style.width = `${width}px`;

                        // Ensure the image inside resizes along with the container
                        const img = container.querySelector("img");
                        if (img) {
                            img.style.width = "100%"; // Make the image take the full width of the container
                            img.style.height = "auto"; // Maintain aspect ratio
                        }
                    }
                };


                const stopResize = () => {
                    isResizing = false;
                    document.removeEventListener("mousemove", resize);
                    document.removeEventListener("mouseup", stopResize);
                };
            }
        });
    };

    return (
        <>
            <button className="btn btn-outline-dark btn-sm" onClick={() => fileInputRef.current.click()} title="Insert Image">
                <FaImages />
            </button>
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
        </>
    );
}
