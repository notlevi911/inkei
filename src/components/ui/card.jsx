import React from 'react';
import { cn } from '../../lib/utils';

const Card = ({
  children,
  className,
  hover = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-md overflow-hidden",
        hover && "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("p-6 border-b border-slate-100", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardTitle = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      className={cn("text-xl font-semibold text-slate-900", className)}
      {...props}
    >
      {children}
    </h3>
  );
};

const CardDescription = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={cn("mt-2 text-sm text-slate-500", className)}
      {...props}
    >
      {children}
    </p>
  );
};

const CardContent = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardFooter = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("p-6 border-t border-slate-100", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };