import styles from './Hours.module.sass';
import CardField from '../CardField';
import { getFormattedTimeType } from '../../../../../../utils/format.time';
import HoursComponent from '../../../../../../components/HoursComponent';
import CostView from '../../../../../../components/CostView';
import cn from 'classnames';

const Hours = ({ time, actSum, compact = false }) => {
  if (!time) return null;

  const content = (
    <>
      <div className={styles.hoursRow}>
        <HoursComponent
          label={'плановое время'}
          type={getFormattedTimeType(time.planned?.type)}
          time={time.planned?.planned}
        />
      </div>
      <div className={styles.hoursRow}>
        <HoursComponent
          label={'фактическое время'}
          type={getFormattedTimeType(time.extra?.type)}
          time={time.extra?.actual}
        />
      </div>
      {actSum !== null && actSum !== undefined && (
        <div className={styles.costs}>
          <CostView cost={actSum} />
        </div>
      )}
    </>
  );

  if (compact) {
    return <div className={cn(styles.hoursCompact)}>{content}</div>;
  }

  return (
    <div className={styles.hours}>
      <CardField labelCls={styles.labelPlanned} label={'Время по ТЗ'}>
        <div className={styles.hoursInline}>{content}</div>
      </CardField>
    </div>
  );
};

export default Hours;
