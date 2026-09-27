import React, { useState } from 'react';
import { opacityTransition } from '../../../../utils/motion.variants';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import useServices from '../../hooks/useServices';
import Card from '../../../../shared/Card';
import styles from './page.module.sass';
import Task from './components/Task';
import Hours from './components/Hours';
import Act from './components/Act';
import Report from './components/Report';
import TextLink from '../../../../shared/Table/TextLink';
import { observer } from 'mobx-react';
import Icon from '../../../../shared/Icon';
import Button from '../../../../shared/Button';
import Loader from '../../../../shared/Loader';
import EditModal from '../ServicesTable/components/EditModal';
import DocumentsCard from './components/DocumentsCard';
import ServiceInfoCard from './components/ServiceInfoCard';
import EditStage from '../../../../components/EditStage';
import { LoadingProvider } from '../../../../providers/LoadingProvider';

const withDocuments = false;

const StageDesktopCard = ({ stage, service }) => (
  <Card
    className={styles.card}
    classCardHead={styles.head}
    classTitle={styles.card_title}
    title={<TextLink to={`stages/${stage.id}`}>{stage.title}</TextLink>}
  >
    <Task stage={stage} taskName={service.title} task={service.tasks} />
    <Hours actSum={stage.cost} time={stage.time} />
    <Report />
    <Act act={stage.act} />
  </Card>
);

const StageMobileCards = ({ stage, service }) => {
  const hasAct = stage?.act?.stampedAct || stage?.act?.unstampedAct;

  return (
    <div className={styles.mobileCards}>
      <Card
        className={styles.card}
        classCardHead={styles.head}
        classTitle={styles.card_title}
        title={<TextLink to={`stages/${stage.id}`}>{stage.title}</TextLink>}
      >
        <Task stage={stage} compact />
      </Card>

      <Card
        className={styles.card}
        classCardHead={styles.head}
        classTitle={styles.card_title}
        title={'Время по ТЗ'}
      >
        <Hours actSum={stage.cost} time={stage.time} compact />
      </Card>

      {hasAct && (
        <Card
          className={styles.card}
          classCardHead={styles.head}
          classTitle={styles.card_title}
          title={'Акт'}
        >
          <Act act={stage.act} compact />
        </Card>
      )}
    </div>
  );
};

const ServicePage = observer(() => {
  let { id } = useParams();
  const { data: service, isLoading } = useServices(Number(id), true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createEtapModal, setCreateEtapModal] = useState(false);

  if (!service) return <Loader />;

  return (
    <LoadingProvider isLoading={isLoading}>
      <motion.div
        initial={'hidden'}
        animate={'show'}
        variants={opacityTransition}
      >
        <div className={styles.header}>
          <div>
            {service.title}
            <Icon
              className={styles.edit}
              onClick={() => setEditModalOpen(true)}
              size={24}
              name={'edit'}
            />
          </div>
          <Button
            onClick={() => setCreateEtapModal(true)}
            type={'primary'}
            name={'Создать Этап'}
          />
        </div>
        <div className={!withDocuments ? styles.gridContainer : ''}>
          <div className={styles.stagesColumn}>
            {service?.stages?.map((el) => (
              <div className={styles.cards} key={el.id}>
                <div className={styles.desktopOnly}>
                  <StageDesktopCard stage={el} service={service} />
                </div>
                <div className={styles.mobileOnly}>
                  <StageMobileCards stage={el} service={service} />
                </div>
                {withDocuments && <DocumentsCard service={service} />}
              </div>
            ))}
          </div>
          {!withDocuments && (
            <ServiceInfoCard
              passwords={service?.passwords ?? {}}
              service={service}
            />
          )}
        </div>
      </motion.div>
      {editModalOpen && (
        <EditModal
          serviceId={service.id}
          onClose={() => setEditModalOpen(false)}
        />
      )}
      {createEtapModal && (
        <EditStage handleClose={() => setCreateEtapModal(false)} />
      )}
    </LoadingProvider>
  );
});

export default ServicePage;
