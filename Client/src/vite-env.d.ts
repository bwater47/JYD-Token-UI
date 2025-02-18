/// <reference types="vite/client" />

import { Eip1193Provider } from "ethers";

declare global {
  interface Window {
    ethereum?: Eip1193Provider & {
      isMetaMask?: boolean;
      selectedAddress?: string | null;
      isConnected?: () => boolean;
      on?: <T>(event: string, callback: (arg: T) => void) => void;
      removeListener?: <T>(event: string, callback: (arg: T) => void) => void;
      request?: <T>(args: { method: string; params?: unknown[] }) => Promise<T>;
    };
  }
}

declare module "*.svg" {
  const content: string;
  export default content;
}

export {};
