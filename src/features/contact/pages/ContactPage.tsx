import { Title } from "../../../components/common/Title";
import { ContactForm } from "../components/ContactForm";
import { useState } from "react";
import { SendForm } from "../components/SendForm";

export function ContactPage() {
  const [send, setSend] = useState<Boolean>(false);

  return (
    <>
      <Title title="Contacto" />

      {!send ? (
        <ContactForm setSend={setSend} />
      ) : (
        <SendForm setSend={setSend} />
      )}
    </>
  );
}
