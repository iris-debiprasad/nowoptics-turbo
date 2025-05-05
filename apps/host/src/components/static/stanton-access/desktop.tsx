import { About } from "./about";
import { EnrollForm } from "./enroll-form";
import { MemberBenefits } from "./member-benefits";
import { SavingsPlanTable } from "./savings-plan-table";
import { SixtyOffPromo } from "./sixty-off-promo";
import styles from "./index.module.scss";

export function Desktop(): React.JSX.Element {
  return (
    <section className={styles.desktop}>
      <About />
      <div className={styles.grid}>
        <div>
          <MemberBenefits />
          <SavingsPlanTable />
        </div>

        <div>
          <EnrollForm />
          <SixtyOffPromo />
        </div>
      </div>
    </section>
  );
}
