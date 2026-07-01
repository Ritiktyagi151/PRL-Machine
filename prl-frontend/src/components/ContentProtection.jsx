import React, { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EDITABLE_SELECTOR =
  "input, textarea, select, [contenteditable='true'], [contenteditable='']";

const isEditableElement = (element) =>
  Boolean(element?.closest?.(EDITABLE_SELECTOR));

const protectedShortcutMessage =
  "This action is disabled to protect website content.";

const useDevToolsDetection = (onChange) => {
  useEffect(() => {
    let isOpen = false;

    const checkDevTools = () => {
      const sizeThreshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      const openedBySize =
        widthDiff > sizeThreshold || heightDiff > sizeThreshold;

      const start = performance.now();
      // Lightweight timing check. It helps catch undocked devtools in some browsers.
      // eslint-disable-next-line no-debugger
      debugger;
      const openedByTiming = performance.now() - start > 100;

      const nextIsOpen = openedBySize || openedByTiming;

      if (nextIsOpen !== isOpen) {
        isOpen = nextIsOpen;
        onChange(nextIsOpen);
      }
    };

    checkDevTools();
    const intervalId = window.setInterval(checkDevTools, 1200);

    return () => window.clearInterval(intervalId);
  }, [onChange]);
};

const ContentProtection = ({ children }) => {
  const rootRef = useRef(null);
  const protectedMediaRef = useRef(new Map());
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  const handleDevToolsChange = useCallback((open) => {
    setIsDevToolsOpen(open);

    if (open) {
      toast.warn("Developer tools detected. Protected content is hidden.", {
        toastId: "prl-devtools-warning",
      });
    }
  }, []);

  useDevToolsDetection(handleDevToolsChange);

  useEffect(() => {
    const showWarning = (message = protectedShortcutMessage) => {
      toast.warn(message, { toastId: "prl-content-protection-warning" });
    };

    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      const key = event.key?.toLowerCase();
      const isCtrlOrMeta = event.ctrlKey || event.metaKey;
      const isCopyInsideForm =
        isEditableElement(event.target) && isCtrlOrMeta && key === "c";
      const blockedShortcut =
        (!isCopyInsideForm && isCtrlOrMeta && ["c", "u", "s"].includes(key)) ||
        (isCtrlOrMeta && event.shiftKey && ["i", "j"].includes(key)) ||
        event.key === "F12";

      if (blockedShortcut) {
        event.preventDefault();
        event.stopPropagation();
        showWarning();
      }

      if (event.key === "PrintScreen" || event.code === "PrintScreen") {
        showWarning("Screenshots may include protected content.");
      }
    };

    const handleSelectStart = (event) => {
      if (!isEditableElement(event.target)) {
        event.preventDefault();
      }
    };

    const handleDragStart = (event) => {
      if (event.target?.closest?.("img, video")) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    const protectedMedia = protectedMediaRef.current;

    const protectMedia = (media) => {
      if (protectedMedia.has(media)) {
        return;
      }

      const previousStyles = {
        pointerEvents: media.style.pointerEvents,
        userDrag: media.style.userDrag,
        webkitUserDrag: media.style.webkitUserDrag,
      };
      const previousDraggable = media.getAttribute("draggable");
      media.setAttribute("draggable", "false");
      media.style.webkitUserDrag = "none";
      media.style.userDrag = "none";
      media.style.pointerEvents = "none";

      const preventMediaMenu = (event) => event.preventDefault();
      media.addEventListener("contextmenu", preventMediaMenu);

      protectedMedia.set(media, {
        preventMediaMenu,
        previousDraggable,
        previousStyles,
      });
    };

    const scanMedia = () => {
      root.querySelectorAll("img, video").forEach(protectMedia);

      protectedMedia.forEach((entry, media) => {
        if (!media.isConnected) {
          media.removeEventListener("contextmenu", entry.preventMediaMenu);
          protectedMedia.delete(media);
        }
      });
    };

    const mutationObserver = new MutationObserver(scanMedia);
    mutationObserver.observe(root, { childList: true, subtree: true });

    scanMedia();

    return () => {
      mutationObserver.disconnect();

      protectedMedia.forEach((entry, media) => {
        media.removeEventListener("contextmenu", entry.preventMediaMenu);

        if (entry.previousDraggable === null) {
          media.removeAttribute("draggable");
        } else {
          media.setAttribute("draggable", entry.previousDraggable);
        }

        media.style.pointerEvents = entry.previousStyles.pointerEvents;
        media.style.userDrag = entry.previousStyles.userDrag;
        media.style.webkitUserDrag = entry.previousStyles.webkitUserDrag;
      });
      protectedMedia.clear();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`prl-content-protection-root ${
        isDevToolsOpen ? "prl-content-protection-devtools-open" : ""
      }`}
    >
      <style>{`
        .prl-content-protection-root,
        .prl-content-protection-content {
          width: 100%;
          max-width: 100%;
        }

        .prl-content-protection-root,
        .prl-content-protection-root * {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .prl-content-protection-root input,
        .prl-content-protection-root textarea,
        .prl-content-protection-root select,
        .prl-content-protection-root [contenteditable="true"],
        .prl-content-protection-root [contenteditable=""] {
          -webkit-touch-callout: default;
          -webkit-user-select: text;
          -moz-user-select: text;
          -ms-user-select: text;
          user-select: text;
        }

        .prl-content-protection-root img,
        .prl-content-protection-root video {
          -webkit-user-drag: none;
          user-drag: none;
          pointer-events: none;
        }

        .prl-content-protection-devtools-open .prl-content-protection-content {
          filter: blur(8px);
          pointer-events: none;
        }

        .prl-content-protection-devtools-overlay {
          position: fixed;
          inset: 0;
          z-index: 2147483646;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(255, 255, 255, 0.72);
          color: #111827;
          font: 600 18px/1.4 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          text-align: center;
          pointer-events: auto;
        }
      `}</style>

      <div className="prl-content-protection-content">{children}</div>

      {isDevToolsOpen && (
        <div className="prl-content-protection-devtools-overlay" role="alert">
          Developer tools detected. Protected content is temporarily hidden.
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ContentProtection;
