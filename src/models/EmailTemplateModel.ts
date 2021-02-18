import { Design } from "react-email-editor";

export interface IEmailTemplate {
    id?: number;
    title?: string;
    body?: Design;
}

export interface InputData {
    title?: string;
}