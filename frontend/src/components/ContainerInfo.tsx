import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";

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
    <Card>
      <SectionTitle>
        Container
      </SectionTitle>
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
    </Card>

  );
}