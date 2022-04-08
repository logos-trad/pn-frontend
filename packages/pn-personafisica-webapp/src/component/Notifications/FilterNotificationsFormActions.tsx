import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid } from '@mui/material';
import { CustomMobileDialogAction } from '@pagopa-pn/pn-commons';

type Props = {
  cleanFilters: () => void;
  formikInstance: {
    isValid: boolean;
  };
  isInDialog?: boolean;
};

const FilterNotificationsFormActions = ({
  cleanFilters,
  formikInstance,
  isInDialog = false,
}: Props) => {
  const { t } = useTranslation(['common']);

  const confirmAction = (
    <Grid item lg={1} xs={12}>
      <Button variant="outlined" type="submit" size="large" disabled={!formikInstance.isValid}>
        {t('button.cerca')}
      </Button>
    </Grid>
  );

  const cancelAction = (
    <Grid item lg={2} xs={12}>
      <Button data-testid="cancelButton" size="large" onClick={cleanFilters}>
        {t('button.annulla ricerca')}
      </Button>
    </Grid>
  );

  return (
    <Fragment>
      {isInDialog ? (
        <CustomMobileDialogAction closeOnClick>{confirmAction}</CustomMobileDialogAction>
      ) : (
        confirmAction
      )}
      {isInDialog ? (
        <CustomMobileDialogAction closeOnClick>{cancelAction}</CustomMobileDialogAction>
      ) : (
        cancelAction
      )}
    </Fragment>
  );
};

export default FilterNotificationsFormActions;