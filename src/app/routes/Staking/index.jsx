import React from 'react';
import "./test-style.css";
import Layout from "./Layout";
import ToastListener from "../../components/ToastListner";
import Stake from './stake';

export default function Staking(props) {
  return (
    <Layout {...props}>
        <Stake {...props}/>
        <ToastListener />
    </Layout>
  )
}
