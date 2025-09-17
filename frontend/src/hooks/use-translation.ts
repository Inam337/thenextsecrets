import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = (namespace?: string) => {
  const { t } = useI18nTranslation(namespace);
  
  const formatMessage = ({ id, defaultMessage }: { id: string; defaultMessage: string }) => {
    return t(id, { defaultValue: defaultMessage });
  };

  return { t, formatMessage };
};
