import styles from "./Page.module.css";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({
  children,
}: PageProps) {
  return (
    <main className={styles.page}>
      {children}
    </main>
  );
}