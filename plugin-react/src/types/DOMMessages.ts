export type DOMMessage = {
  event: string;
  lang: string;
  text: string;
}

export type DOMMessageResponse = {
  success: boolean;
  data: any;
}
