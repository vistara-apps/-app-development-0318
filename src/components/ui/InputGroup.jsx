import React, { useState } from 'react'
import { clsx } from 'clsx'
import { AlertCircle, CheckCircle } from 'lucide-react'

export function InputGroup({ 
  label, 
  children, 
  variant = 'default',
  className,
  error,
  success,
  helpText,
  required,
  ...props 
}) {
  const variants = {
    default: "space-y-2",
    withLabel: "space-y-2",
    inline: "flex items-center space-x-4"
  }

  return (
    <div className={clsx(variants[variant], className)} {...props}>
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}
      {children}
      {helpText && !error && !success && (
        <p className="text-sm text-text-secondary mt-1">{helpText}</p>
      )}
      {error && (
        <div className="flex items-center space-x-2 mt-1">
          <AlertCircle className="h-4 w-4 text-danger" />
          <p className="text-sm text-danger">{error}</p>
        </div>
      )}
      {success && (
        <div className="flex items-center space-x-2 mt-1">
          <CheckCircle className="h-4 w-4 text-success" />
          <p className="text-sm text-success">{success}</p>
        </div>
      )}
    </div>
  )
}

export function Input({ 
  type = 'text',
  className,
  error,
  success,
  icon: Icon,
  iconPosition = 'left',
  onValueChange,
  formatter,
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleChange = (e) => {
    if (onValueChange) {
      onValueChange(e.target.value);
    }
    
    if (props.onChange) {
      props.onChange(e);
    }
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    
    if (formatter && e.target.value) {
      e.target.value = formatter(e.target.value);
      if (onValueChange) {
        onValueChange(e.target.value);
      }
    }
    
    if (props.onBlur) {
      props.onBlur(e);
    }
  };
  
  return (
    <div className="relative">
      {Icon && iconPosition === 'left' && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
          <Icon className="h-5 w-5" />
        </div>
      )}
      
      <input
        type={type}
        className={clsx(
          "input-field w-full transition-all duration-200",
          Icon && iconPosition === 'left' && "pl-10",
          Icon && iconPosition === 'right' && "pr-10",
          error && "border-danger focus:border-danger",
          success && "border-success focus:border-success",
          isFocused && !error && !success && "border-primary",
          className
        )}
        onFocus={(e) => {
          setIsFocused(true);
          if (props.onFocus) props.onFocus(e);
        }}
        onBlur={handleBlur}
        onChange={handleChange}
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
      
      {Icon && iconPosition === 'right' && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
          <Icon className="h-5 w-5" />
        </div>
      )}
      
      {error && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <AlertCircle className="h-5 w-5 text-danger" />
        </div>
      )}
      
      {success && !error && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <CheckCircle className="h-5 w-5 text-success" />
        </div>
      )}
    </div>
  )
}
