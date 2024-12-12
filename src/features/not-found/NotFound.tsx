import { Title } from "../../components/common/Title";

export function NotFoundPage({ message }: { message?: string }) {
  return (
    <>
      <Title title={message ? message : "Página no encontrada"} />

      <img src="/src/assets/cody_error.png" alt="" />
    </>
  );
}
