import Head from "../Head";
import { Container, Row, Column } from "../Grid";
import styles from "./error.module.scss";

export default function Error({ message }) {
  return (
    <>
      <Head title="Loading..." />
      <div className={styles.container}>
        <Container>
          <Row>
            <Column columns={{ xs: 14, md: 12 }} offsets={{ sm: 1 }}>
              <h2>Oops, looks like we ran into an error</h2>
              <p>{message}</p>
            </Column>
          </Row>
        </Container>
      </div>
    </>
  );
}