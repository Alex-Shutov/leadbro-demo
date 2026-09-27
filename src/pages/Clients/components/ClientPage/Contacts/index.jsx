import React from 'react';
import { handleInfo } from '../../../../../utils/snackbar';
import Title from '../../../../../shared/Title';
import Card from '../../../../../shared/Card';
import styles from './Contacts.module.sass';
import MultiInputContacts from './Inputs/MultiInput.component';

const ClientsContacts = ({
  contactData,
  onChange,
  onSubmit,
  onReset,
  onAdd,
}) => {
  const defaultActions = (path, success, info, copy = 'Элемент скопирован') => {
    return {
      copy: (text) => {
        navigator.clipboard.writeText(text).then(() => handleInfo(copy));
      },
      edit: ({ name, value }) => {
        onChange(name, value);
      },
      submit: () => {
        onSubmit(path, success);
      },
      reset: () => {
        onReset(path);
        handleInfo(info);
      },
    };
  };

  return (
    <Card classTitle={styles.title} className={styles.card}>
      <Title smallTable={true} actions={{}} title={'Контактные данные'} />
      <MultiInputContacts
        onAdd={onAdd}
        contactData={contactData}
        label={'Телефон'}
        param={'tel'}
        type={'tel'}
        onActions={(path) =>
          defaultActions(path, 'Телефон сохранен', 'Телефон восстановлен')
        }
      />
      <MultiInputContacts
        onAdd={onAdd}
        contactData={contactData}
        label={'Почта'}
        param={'email'}
        type={'email'}
        onActions={(path) =>
          defaultActions(path, 'Почта сохранена', 'Почта восстановлена')
        }
      />
    </Card>
  );
};

export default ClientsContacts;
