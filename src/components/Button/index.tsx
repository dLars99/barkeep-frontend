import React, { ButtonHTMLAttributes } from "react";
import { To, useNavigate } from "react-router-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  //   backgroundImage?: ImageSourcePropType;  TO DO - find type
  linkUrl?: To;
  className?: string;
  onClick?: () => void;
}

const Button = (props: React.PropsWithChildren<ButtonProps>): JSX.Element => {
  const { children, linkUrl, className, onClick, ...rest } = props;
  const navigate = useNavigate();
  const handleClick = (): void => {
    if (linkUrl) navigate(linkUrl!);
    if (onClick) onClick();
  };
  return (
    <button className={className} onClick={() => handleClick()} {...rest}>
      {children}
    </button>
  );
};

export default Button;
