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
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <h2>Container</h2>

      {!metadata ? (
        <p>No container created.</p>
      ) : (
        <>
          <p>
            <strong>ID:</strong>{" "}
            {metadata.id}
          </p>

          <p>
            <strong>Image:</strong>{" "}
            {metadata.image}
          </p>

          <p>
            <strong>State:</strong>{" "}
            {metadata.state}
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {new Date(
              metadata.created
            ).toLocaleString()}
          </p>
        </>
      )}
    </div>
  );
}