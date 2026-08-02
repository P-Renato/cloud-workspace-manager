import { useEffect, useRef } from "react";

import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";

import socket from "../lib/socket";

import "xterm/css/xterm.css";

type TerminalProps = {
  workspaceId: string;
};

export default function Terminal({
  workspaceId,
}: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = terminalRef.current;

    if (!container) {
      return;
    }

    const term = new XTerm({
      cursorBlink: true,
      fontFamily: "Fira Code, monospace",
      fontSize: 14,
      theme: {
        background: "#111827",
      },
    });

    const fitAddon = new FitAddon();

    term.loadAddon(fitAddon);
    term.open(container);

    // Wait until the browser has laid out the element
    const timer = window.setTimeout(() => {
      try {
        fitAddon.fit();

        socket.emit("terminal-resize", {
          cols: term.cols,
          rows: term.rows,
        });

        term.focus();
      } catch (err) {
        console.error("Fit failed:", err);
      }
    }, 0);

    const handleResize = () => {
      try {
        fitAddon.fit();

        socket.emit("terminal-resize", {
          cols: term.cols,
          rows: term.rows,
        });
      } catch (err) {
        console.error("Resize failed:", err);
      }
    };

    window.addEventListener("resize", handleResize);

    socket.emit("terminal-connect", workspaceId);

    const handleOutput = (data: string) => {
      term.write(data);
    };

    socket.on("terminal-output", handleOutput);

    const disposable = term.onData((data: string) => {
      socket.emit("terminal-input", data);
    });

    return () => {
      window.clearTimeout(timer);

      disposable.dispose();

      socket.off("terminal-output", handleOutput);

      window.removeEventListener(
        "resize",
        handleResize
      );

      socket.emit("terminal-disconnect");

      term.dispose();
    };
  }, [workspaceId]);

  return (
    <div
      ref={terminalRef}
      style={{
        width: "100%",
        height: "450px",
        overflow: "hidden",
      }}
    />
  );
}