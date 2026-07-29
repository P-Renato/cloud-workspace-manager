import type { ContainerStatsType } from "../api/workspaces";
import SectionTitle from "../components/ui/SectionTitle";
import styles from "./ContainerStats.module.css";

interface Props {
  stats: ContainerStatsType | null;
}

function formatBytes(bytes: number) {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

export default function ContainerStats({
    stats,
}:Props){

    if(!stats){
        return(
            <>
                <SectionTitle>
                    Container Stats
                </SectionTitle>

                <p>No statistics available.</p>
            </>
        );
    }

    return(

        <>

        <SectionTitle>
            Container Stats
        </SectionTitle>

        <div className={styles.grid}>

            <div>
                <strong>CPU</strong>
                <p>{stats.cpuPercent.toFixed(2)}%</p>
            </div>

            <div>
                <strong>Memory</strong>
                <p>
                    {formatBytes(stats.memoryUsage)} /{" "}
                    {formatBytes(stats.memoryLimit)}
                </p>

                <p>{stats.memoryPercent.toFixed(2)}%</p>
            </div>

            <div>
                <strong>RX</strong>
                <p>{formatBytes(stats.networkRx)}</p>
            </div>

            <div>
                <strong>TX</strong>
                <p>{stats.networkTx} bytes</p>
            </div>

            <div>
                <strong>Started</strong>
                <p>
                    {new Date(
                        stats.uptime
                    ).toLocaleString()}
                </p>
            </div>

        </div>

        </>

    );
}