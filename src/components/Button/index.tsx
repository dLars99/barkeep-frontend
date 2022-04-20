import React, { ButtonHTMLAttributes, SyntheticEvent } from "react";
import { To, useNavigate } from "react-router-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  //   backgroundImage?: ImageSourcePropType;  TO DO - find type
  linkUrl?: To;
  className?: string;
  onClick?: (e?: SyntheticEvent) => void;
}

const Button = (props: React.PropsWithChildren<ButtonProps>): JSX.Element => {
  const { children, linkUrl, className, onClick, ...rest } = props;
  const navigate = useNavigate();
  const handleClick = (
    e: SyntheticEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (linkUrl) navigate(linkUrl!);
    if (onClick) onClick(e);
  };
  return (
    <button
      className={className}
      onClick={(e: SyntheticEvent<HTMLButtonElement, MouseEvent>) =>
        handleClick(e)
      }
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
