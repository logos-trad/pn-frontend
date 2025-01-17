import { useFormik } from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { Alert, Button, DialogTitle, MenuItem, TextField, Typography } from '@mui/material';
import {
  ApiErrorWrapper,
  CustomDropdown,
  PnAutocomplete,
  PnDialog,
  PnDialogActions,
  PnDialogContent,
  searchStringLimitReachedText,
} from '@pagopa-pn/pn-commons';

import { ChannelType, Sender } from '../../models/contacts';
import { Party } from '../../models/party';
import { CONTACT_ACTIONS, getAllActivatedParties } from '../../redux/contact/actions';
import { contactsSelectors } from '../../redux/contact/reducers';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { getConfiguration } from '../../services/configuration.service';
import {
  pecValidationSchema,
  specialContactsAvailableAddressTypes,
} from '../../utility/contacts.utility';
import DropDownPartyMenuItem from '../Party/DropDownParty';

type Props = {
  open: boolean;
  value: string;
  sender: Sender;
  channelType: ChannelType;
  onDiscard: () => void;
  onConfirm: (value: string, channelType: ChannelType, sender: Sender) => void;
};

const AddSpecialContactDialog: React.FC<Props> = ({
  open,
  value,
  sender,
  channelType,
  onDiscard,
  onConfirm,
}) => {
  const { t } = useTranslation(['common', 'recapiti']);
  const dispatch = useAppDispatch();
  const getOptionLabel = (option: Party) => option.name || '';
  const [alreadyExistsMessage, setAlreadyExistsMessage] = useState('');
  const parties = useAppSelector((state: RootState) => state.contactsState.parties);
  const addressesData = useAppSelector(contactsSelectors.selectAddresses);
  const { DOD_DISABLED } = getConfiguration();
  const [isPecInValidation, setIsPecInValidation] = useState(false);

  const addressTypes = specialContactsAvailableAddressTypes(addressesData, sender).filter((addr) =>
    DOD_DISABLED ? addr.id !== ChannelType.SERCQ_SEND : true
  );

  const pecInValidationForSender = (senderId: string) =>
    addressesData.specialAddresses.some(
      (address) => address.senderId === senderId && !address.pecValid
    );

  const addressTypeChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    await formik.setFieldValue('s_value', '');
    if (e.target.value) {
      formik.handleChange(e);
      checkIfSenderIsAlreadyAdded(formik.values.sender, e.target.value as ChannelType);
      
      if (
        (e.target.value as ChannelType) === ChannelType.SERCQ_SEND &&
        pecInValidationForSender(formik.values.sender.id)
      ) {
        setIsPecInValidation(true);
      } else {
        setIsPecInValidation(false);
      }
    }
  };

  const checkIfSenderIsAlreadyAdded = (sender: Party, channelType: ChannelType | string) => {
    const alreadyExists = addressesData.specialAddresses.some(
      (a) => a.senderId === sender.id && a.channelType === channelType
    );

    if (alreadyExists) {
      setAlreadyExistsMessage(
        t(`special-contacts.contact-already-exists`, {
          ns: 'recapiti',
        })
      );
      return;
    }
    setAlreadyExistsMessage('');
  };

  const senderChangeHandler = async (_: any, newValue: Party | null) => {
    await formik.setFieldTouched('sender', true, false);
    await formik.setFieldValue('sender', { id: newValue?.id ?? '', name: newValue?.name ?? '' });

    if (
      !(
        formik.values.channelType === ChannelType.SERCQ_SEND &&
        pecInValidationForSender(newValue?.id ?? '')
      )
    ) {
      setIsPecInValidation(false);
    } else {
      setIsPecInValidation(true);
    }

    if (
      newValue &&
      addressesData.addresses.some((a) => a.senderId === newValue.id) &&
      formik.values.channelType
    ) {
      checkIfSenderIsAlreadyAdded(newValue, formik.values.channelType);
      return;
    }
    setAlreadyExistsMessage('');
  };

  const renderOption = (props: any, option: Party) => (
    <MenuItem {...props} value={option.id} key={option.id}>
      <DropDownPartyMenuItem name={option.name} />
    </MenuItem>
  );

  const validationSchema = yup.object({
    sender: yup
      .object({
        id: yup.string().required(),
        name: yup
          .string()
          .required(t('required-field'))
          .max(80, t('too-long-field-error', { maxLength: 80 })),
      })
      .required(),
    channelType: yup.string().required(),
    s_value: yup
      .string()
      .when('channelType', {
        is: ChannelType.PEC,
        then: pecValidationSchema(t),
      })
      .when('channelType', {
        is: ChannelType.SERCQ_SEND,
        then: yup.string().nullable(),
      }),
  });

  const initialValues: {
    sender: { id: string; name: string };
    channelType: ChannelType | '';
    s_value: string;
  } = {
    sender: {
      id: sender.senderId,
      name: sender.senderName ?? '',
    },
    channelType: value ? channelType : '',
    s_value: value,
  };

  const formik = useFormik({
    initialValues,
    validateOnMount: true,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.channelType) {
        onConfirm(values.s_value, values.channelType, {
          senderId: values.sender.id,
          senderName: values.sender.name,
        });
      }
    },
  });

  // handling of search string for sender
  const entitySearchLabel: string = `${t('special-contacts.add-sender', {
    ns: 'recapiti',
  })}${searchStringLimitReachedText(formik.values.sender.name)}`;

  const handleChangeTouched = async (e: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    await formik.setFieldTouched(e.target.id, true, false);
  };

  const getParties = () => {
    if (formik.values.sender.name.length >= 4) {
      void dispatch(
        getAllActivatedParties({ paNameFilter: formik.values.sender.name, blockLoading: true })
      );
    } else if (formik.values.sender.name.length === 0) {
      void dispatch(getAllActivatedParties({ blockLoading: true }));
    }
  };

  useEffect(() => {
    if (!open || value) {
      return;
    }
    getParties();
  }, [formik.values.sender.name, open]);

  const handleClose = async () => {
    formik.resetForm({ values: initialValues });
    await formik.validateForm(initialValues);
    setAlreadyExistsMessage('');
    onDiscard();
  };

  const handleConfirm = async () => {
    await formik.submitForm();
    formik.resetForm({ values: initialValues });
  };

  return (
    <PnDialog open={open} onClose={handleClose} data-testid="addSpecialContactDialog">
      <DialogTitle id="dialog-title">
        {t(`special-contacts.modal-title`, { ns: 'recapiti' })}
      </DialogTitle>
      <PnDialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="body1" mb={2}>
            {t(`special-contacts.contact-to-add-description`, { ns: 'recapiti' })}
          </Typography>
          <Typography variant="caption-semibold" mb={1} display="block">
            {t(`special-contacts.contact-to-add`, { ns: 'recapiti' })}
          </Typography>
          <CustomDropdown
            id="channelType"
            name="channelType"
            value={formik.values.channelType}
            onChange={addressTypeChangeHandler}
            size="small"
            disabled={!!value}
            sx={{ flexGrow: 1, flexBasis: 0, mb: 2 }}
            label={t('special-contacts.select-address', { ns: 'recapiti' })}
            fullWidth
          >
            {addressTypes
              .filter((a) => a.shown)
              .map((a) => (
                <MenuItem
                  id={`dropdown-${a.id}`}
                  key={a.id}
                  value={a.id}
                  disabled={a.disabled}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
                >
                  {t(`special-contacts.${a.id.toLowerCase()}`, { ns: 'recapiti' })}
                </MenuItem>
              ))}
          </CustomDropdown>
          {formik.values.channelType === ChannelType.PEC && (
            <TextField
              size="small"
              fullWidth
              id="s_value"
              name="s_value"
              label={t(`special-contacts.link-${formik.values.channelType.toLowerCase()}-label`, {
                ns: 'recapiti',
              })}
              value={formik.values.s_value}
              onChange={handleChangeTouched}
              error={formik.touched.s_value && Boolean(formik.errors.s_value)}
              helperText={formik.touched.s_value && formik.errors.s_value}
              sx={{ mb: 2 }}
            />
          )}
          <Typography variant="caption-semibold" mb={1} display="block">
            {t(`special-contacts.sender`, { ns: 'recapiti' })}
          </Typography>
          <ApiErrorWrapper
            apiId={CONTACT_ACTIONS.GET_ALL_ACTIVATED_PARTIES}
            mainText={t('special-contacts.fetch-party-error', { ns: 'recapiti' })}
            reloadAction={getParties}
          >
            <PnAutocomplete
              id="sender"
              data-testid="sender"
              size="small"
              options={parties ?? []}
              autoComplete
              getOptionLabel={getOptionLabel}
              noOptionsText={t('common.enti-not-found', { ns: 'recapiti' })}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={senderChangeHandler}
              inputValue={formik.values.sender.name}
              disabled={!!value || sender.senderId !== 'default'}
              onInputChange={(_event, newInputValue, reason) => {
                if (reason === 'input') {
                  void formik.setFieldTouched('sender', true, false);
                  void formik.setFieldValue('sender', { id: '', name: newInputValue });
                }
              }}
              filterOptions={(e) => e}
              renderOption={renderOption}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="sender"
                  label={entitySearchLabel}
                  error={formik.touched.sender && Boolean(formik.errors.sender?.name)}
                  helperText={formik.touched.sender && formik.errors.sender?.name}
                />
              )}
              sx={{ flexGrow: 1, flexBasis: 0 }}
            />
          </ApiErrorWrapper>
        </form>
        {alreadyExistsMessage && (
          <Alert severity="warning" sx={{ mt: 2 }} data-testid="alreadyExistsAlert">
            {alreadyExistsMessage}
          </Alert>
        )}
      </PnDialogContent>
      <PnDialogActions>
        <Button onClick={handleClose} variant="outlined">
          {t('button.annulla')}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={!formik.isValid || isPecInValidation}
        >
          {t('button.associa')}
        </Button>
      </PnDialogActions>
    </PnDialog>
  );
};

export default AddSpecialContactDialog;
