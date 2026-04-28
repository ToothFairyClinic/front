import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "@app/App";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./core/apollo-client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { I18nextProvider } from "react-i18next";
import i18n from '@app/common/translator/translator';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={apolloClient}>
    <HelmetProvider>
      <ToastContainer />
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </HelmetProvider>
  </ApolloProvider>
);
