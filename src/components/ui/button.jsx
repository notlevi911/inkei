import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props
}) => {
  const baseStyle = "rounded-md font-medium transition-all duration-300 inline-flex items-center justify-center shadow-sm";
  
  const variants = {
    primary: "bg-accent-primary text-white hover:bg-accent-muted",
    secondary: "bg-[#2a3449] text-white hover:bg-[#354460]",
    outline: "bg-transparent border border-accent-muted text-accent-secondary hover:bg-[#1e293b]",
  };
  
  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2.5",
    large: "px-6 py-3 text-md"
  };
  
  const classes = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;