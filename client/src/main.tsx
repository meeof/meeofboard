import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {GoogleOAuthProvider} from '@react-oauth/google'
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import './style.css';
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
              <RouterProvider router={router}/>
          </GoogleOAuthProvider>
      </Provider>
  </StrictMode>,
)
