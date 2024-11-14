import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store";
import { RoleProvider } from "@/context/RoleContext";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <RoleProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />;
        </PersistGate>
      </RoleProvider>
    </Provider>
  );
}
