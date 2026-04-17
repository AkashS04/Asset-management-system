export {};

declare global {
  interface Window {
    __AUTH_EXPIRED__?: boolean;
  }
}