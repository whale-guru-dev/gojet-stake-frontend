import React, { useContext, useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import ConnectToWalletModal from "../../../components/ConnectToWalletModal";
import { AppContextType } from "../../../contexts/context_types";

import Footer from "../../../components/Footer";
import style from "./Layout.module.scss";

export default function Layout(props) {
  const {
    connectToWalletModalVisible,
    setConnectToWalletModalVisible,
  } = useContext(AppContextType);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 2000);
  }, []);

  return (
    <div className={style.container}>
      <main
      className={style.main}>{props.children}</main>
      <Footer />
      <Loader isVisible={!loaded} />
      <ConnectToWalletModal
        visible={connectToWalletModalVisible}
        onCancel={() => setConnectToWalletModalVisible(false)}
      />
    </div>
  );
}
