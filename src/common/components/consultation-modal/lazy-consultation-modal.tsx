import dynamic from "next/dynamic";
import { FC } from "react";
import type { ConsultationModalProps } from "./consultation-modal.component";

// Форма з валідацією і маскою телефону завантажується лише тоді, коли відвідувач відкрив вікно запису
const Modal = dynamic(() => import("./consultation-modal.component").then((m) => m.ConsultationModal), { ssr: false });

export const ConsultationModal: FC<ConsultationModalProps> = (props) => (props.isOpen ? <Modal {...props} /> : null);
