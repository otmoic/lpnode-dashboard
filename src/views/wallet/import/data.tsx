import { FormSchema } from '/@/components/Form';

export const step1Schemas: FormSchema[] = [
  
];
export const chainSchema = {
  field: 'chain',
  component: 'Select',
  label: 'chain',
  required: true,
  defaultValue: '',
  componentProps: {
    options: [
    ],
  },
  colProps: {
    span: 24,
  },
}

export const step2SchemaKeyAddress = {
  field: 'address',
  component: 'Input',
  label: 'Wallet Address',
  required: true,
  defaultValue: '',
  colProps: {
    span: 24,
  },
  labelWidth: 230
}

export const step2SchemaKeyPrivate = {
  field: 'private_key',
  component: 'Input',
  label: 'Private Key',
  required: true,
  defaultValue: '',
  colProps: {
    span: 24,
  },
  labelWidth: 230
}

export const step2SchemaVaultIds = {
  field: 'vaultid',
  component: 'Select',
  label: 'Wallet Address',
  required: true,
  defaultValue: '',
  componentProps: {
    options: [],
  },
  colProps: {
    span: 24,
  },
  labelWidth: 230
}

export const step2Schemas: FormSchema[] = [
  {
    field: 'wallet_name',
    component: 'Input',
    label: 'Wallet Name',
    required: true,
    defaultValue: '',
    colProps: {
      span: 24,
    },
    labelWidth: 230
  },
  {
    field: 'type',
    component: 'Select',
    label: 'Type',
    required: true,
    defaultValue: 'key',
    componentProps: {
      options: [
        {
          label: 'PrivateKey',
          value: 'key'
        },
        {
          label: 'Vault',
          value: 'vault'
        }
      ],
    },
    colProps: {
      span: 24,
    },
    labelWidth: 230
  }
];

export const step2SchemasNear: FormSchema[] = [
  {
    field: 'wallet_name',
    component: 'Input',
    label: 'Wallet Name',
    required: true,
    defaultValue: '',
    colProps: {
      span: 24,
    },
    labelWidth: 230
  },
  {
    field: 'account_id',
    component: 'Input',
    label: 'Account ID',
    required: true,
    defaultValue: '',
    colProps: {
      span: 24,
    },
    labelWidth: 230
  },
  {
    field: 'private_key',
    component: 'Input',
    label: 'Private Key',
    required: true,
    defaultValue: '',
    colProps: {
      span: 24,
    },
    labelWidth: 230
  },
];