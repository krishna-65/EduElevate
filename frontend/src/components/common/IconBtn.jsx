const IconBtn = ({
    text,
    onClick,
    children,
    disable,
    outline = false,
    type = "button", // Default type for button
    className,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disable}
            className={`${
                outline ? "border border-gray-300" : ""
            } px-4 py-2 rounded focus:outline-none disabled:opacity-50 ${className}`}
            type={type}
        >
            {children ? (
                <>
                    <span>{text}</span>
                    {children}
                </>
            ) : (
                text // Render text directly
            )}
        </button>
    );
};

export default IconBtn;
