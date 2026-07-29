import { useEffect, useRef } from "react";

import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";

import socket from "../lib/socket";

import "xterm/css/xterm.css";

export default function Terminal() {
  const terminalRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terminalRef.current) {
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

    term.open(terminalRef.current);

    fitAddon.fit();

    // Give the terminal keyboard focus
    term.focus();

    // Receive output from the backend
    socket.on(
      "terminal-output",
      (data: string) => {
        term.write(data);
      }
    );

    // Send keyboard input to the backend
    term.onData((data: string) => {
        console.log(
            "KEY:",
            JSON.stringify(data),
            data.charCodeAt(0)
        );

        socket.emit("terminal-input", data);
    });

    return () => {
      socket.off("terminal-output");

      term.dispose();
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{
        width: "100%",
        height: 450,
      }}
    />
  );
}