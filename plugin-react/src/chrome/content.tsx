import { DOMMessage } from "../types";
import { createRoot } from 'react-dom/client';
import TranslateCtrl from './translate-ctrl'

var div = document.createElement("div");
document.body.appendChild(div);
const root = createRoot(div)

root.render(
  <TranslateCtrl></TranslateCtrl>
);


