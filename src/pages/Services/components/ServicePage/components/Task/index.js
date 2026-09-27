import React, { useState } from 'react';
import styles from './Task.module.sass';
import { formatDateWithOnlyDigits } from '../../../../../../utils/formate.date';
import CardField from '../CardField';
import Icon from '../../../../../../shared/Icon';
import TextLink from '../../../../../../shared/Table/TextLink';
import { declineWord } from '../../../../../../utils/format.string';
import DescriptionModal from '../../../../../../components/DescriptionModal';
import cn from 'classnames';

const Task = ({ stage, compact = false }) => {
  const [isDescriptionOpen, setDescriptionOpen] = useState(false);

  const dates = (
    <div className={styles.taskDatesAndStatus}>
      <Icon size={20} name={'calendar'} />
      <span>
        {formatDateWithOnlyDigits(stage.startDate)} -{' '}
        {formatDateWithOnlyDigits(stage.endDate)}
      </span>
    </div>
  );

  const tasksCount = (
    <div className={styles.taskName}>
      <span className={styles.taskName_primary}>
        {stage.taskCount ?? 0} {declineWord('задача', stage.taskCount ?? 0)}
      </span>
    </div>
  );

  const descriptionLink =
    stage?.description && stage?.description !== ' ' ? (
      <TextLink
        className={styles.taskName_primary}
        onClick={() => setDescriptionOpen(true)}
      >
        Подробнее...
      </TextLink>
    ) : null;

  return (
    <div className={cn(styles.task_container, { [styles.compact]: compact })}>
      {compact ? (
        <div className={styles.compactList}>
          <div className={styles.compactItem}>
            <span className={styles.compactLabel}>Сроки</span>
            {dates}
          </div>
          {descriptionLink && (
            <div className={styles.compactItem}>
              <span className={styles.compactLabel}>ТЗ</span>
              {descriptionLink}
            </div>
          )}
          <div className={styles.compactItem}>
            <span className={styles.compactLabel}>Задачи</span>
            {tasksCount}
          </div>
        </div>
      ) : (
        <div>
          <CardField label={'Сроки'}>{dates}</CardField>
          {descriptionLink && (
            <CardField label={'ТЗ'}>
              <div className={styles.taskName}>{descriptionLink}</div>
            </CardField>
          )}
          <CardField label={'Задачи'}>{tasksCount}</CardField>
        </div>
      )}
      {isDescriptionOpen && (
        <DescriptionModal
          label={'ТЗ'}
          description={stage.description}
          onClose={() => setDescriptionOpen(false)}
        />
      )}
    </div>
  );
};

export default Task;
