import React from 'react'
import { ToastContainer } from '@pancakeswap-libs/uikit'
import useToast from "../../hooks/useToast";

const ToastListener = () => {
  const { toasts, remove } = useToast();
  const handleRemove = (id) => remove(id);
  return <ToastContainer toasts={toasts} onRemove={handleRemove} />
};

export default ToastListener
