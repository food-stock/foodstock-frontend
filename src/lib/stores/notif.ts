import { writable} from "svelte/store";
import type { Writable } from "svelte/store";

// Define the type for a toast
interface Toast {
  id: number;
  type: string;
  dismissible: boolean;
  timeout: number;
}

// Define the type for the store
interface ToastsStore extends Writable<Toast[]> {
  update: (fn: (value: Toast[]) => Toast[]) => void;
}

export const toasts: ToastsStore = writable([]);

export const addToast = (toast: Partial<Toast>) => {
  // Create a unique ID so we can easily find/remove it
  // if it is dismissible/has a timeout.
  const id = Math.floor(Math.random() * 10000);

  // Setup some sensible defaults for a toast.
  const defaults: Toast = {
    id,
    type: "info",
    dismissible: true,
    timeout: 3000,
  };

  toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

  // If toast is dismissible, dismiss it after "timeout" amount of time.
  if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id: number) => {
  toasts.update((all) => all.filter((t) => t.id !== id));
};
