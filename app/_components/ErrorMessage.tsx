import React from "react"

type ErrorMessageProps = {
  message?: string;
  className?: string;
}

export const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
  if (!message) return null;
  else return <p className={className}>{message}</p>
}