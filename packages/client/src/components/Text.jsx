import { useCV } from "../CVContext";

const Text = ({ element = "p", children, style = {}, onChange, ...props }) => {
  const { editable } = useCV();

  const handleBlur = (e) => {
    const value = e.target.innerText.trim();
    onChange(value.length > 0 ? value : "no content");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default Enter behavior (like adding a new line in contentEditable)
      e.target.blur(); // Triggers the blur
    }
  };

  const Tag = element; // Dynamically use the tag name (p, h1, h3, etc.)

  return (
    <Tag
      style={{
        cursor: editable ? "pointer" : "auto",
        display: "inline-block",
        ...style,
      }}
      contentEditable={editable}
      suppressContentEditableWarning
      spellCheck="false" // Disable spell checking
      onBlur={handleBlur}
      onKeyDown={handleKeyDown} // Handle keydown event to check for Enter key
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Text;
