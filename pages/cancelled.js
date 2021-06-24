import { NextSeo } from "next-seo";
import Page from "../components/styled/Page";

const Cancelled = () => {
  return (
    <Page>
      <NextSeo title="Cancelled" description="Cancel payment page" />
      <h2>Payment Cancelled!</h2>
      <p>Payment has not been processed!</p>
    </Page>
  );
};

export default Cancelled;
