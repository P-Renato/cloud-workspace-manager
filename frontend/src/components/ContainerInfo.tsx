import SectionTitle from "./ui/SectionTitle";
import styles from "./ContainerInfo.module.css";

interface ContainerMetadata {
  id: string;
  image: string;
  state: string;
  created: string;
}

interface ContainerInfoProps {
  metadata: ContainerMetadata | null;
}

export default function ContainerInfo({
  metadata,
}: ContainerInfoProps) {

  return (
    <>
      <SectionTitle>
        Container
      </SectionTitle>

      {!metadata ? (
        <p>No container created.</p>
      ) : (

        <div className={styles.grid}>

          <div>
            <strong>ID</strong>
            <p>{metadata.id}</p>
          </div>

          <div>
            <strong>Image</strong>
            <p>{metadata.image}</p>
          </div>

          <div>
            <strong>Status</strong>
            <p>{metadata.state}</p>
          </div>

          <div>
            <strong>Created</strong>
            <p>
              {new Date(
                metadata.created
              ).toLocaleString()}
            </p>
          </div>

        </div>

      )}
    </>
  );
}