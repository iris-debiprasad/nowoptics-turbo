import { About } from "./about";
import { EnrollForm } from "./enroll-form";
import { MemberBenefits } from "./member-benefits";
import { SavingsPlanTable } from "./savings-plan-table";
import { SixtyOffPromo } from "./sixty-off-promo";
import styles from "./index.module.scss";

export function Mobile(): React.JSX.Element {
  return (
    <section className={styles.mobile}>
      <About />
      <div className={styles.grid}>
        <EnrollForm />
        <MemberBenefits />
        <SavingsPlanTable />
        <SixtyOffPromo />
      </div>
    </section>
  );
}
