import styles from './Act.module.sass';
import Button from '../../../../../../shared/Button';
import CardField from '../CardField';
import React from 'react';
import Icon from '../../../../../../shared/Icon';

const Act = ({ act, compact = false }) => {
  if (!act) return null;

  const downloadAct = (url) => {
    window.open(url, '_blank');
  };

  if (!act.unstampedAct && !act.stampedAct) return null;

  const buttons = (
    <div className={styles.act_container}>
      {act.stampedAct && (
        <Button
          onClick={() => downloadAct(act.stampedAct)}
          type={'secondary'}
          after={<Icon size={24} name={'download'} />}
          classname={styles.button}
          name={'Акт с печатью'}
        />
      )}
      {act.unstampedAct && (
        <Button
          onClick={() => downloadAct(act.unstampedAct)}
          type={'secondary'}
          after={<Icon size={24} name={'download'} />}
          classname={styles.button}
          name={'Акт без печати'}
        />
      )}
    </div>
  );

  if (compact) {
    return <div className={styles.act_main}>{buttons}</div>;
  }

  return (
    <div className={styles.act_main}>
      <CardField labelCls={styles.label} label={'Акт'}>
        {buttons}
      </CardField>
    </div>
  );
};

export default Act;
