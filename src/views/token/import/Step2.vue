<template>
  <div class="step2">

    <a-row :gutter="24">
      <a-col :span="1" ></a-col>
      <a-col :span="6" >
        <a-button type="primary" @click="onEthWBTC"> eth-WBTC </a-button> 
      </a-col>

      <a-col :span="2" ></a-col>
      <a-col :span="6" >
        <a-button type="primary" @click="onEthWETH"> eth-WETH </a-button> 
      </a-col>

      <a-col :span="2" ></a-col>
      <a-col :span="6" >
        <a-button type="primary" @click="onEthUSDC"> eth-USDC </a-button> 
      </a-col>
      <a-col :span="1" ></a-col>
    </a-row>

    <a-row :gutter="24">
      <a-col :span="1" ></a-col>
      <a-col :span="6" >
        <a-button type="primary" @click="onBscBTCB"> bsc-BTCB </a-button> 
      </a-col>

      <a-col :span="2" ></a-col>
      <a-col :span="6" >
        <a-button type="primary" @click="onBscWETH"> bsc-WETH </a-button> 
      </a-col>

      <a-col :span="2" ></a-col>
      <a-col :span="6" >
        <a-button type="primary" @click="onBscUSDC"> bsc-USDC </a-button> 
      </a-col>
      <a-col :span="1" ></a-col>
    </a-row>
    
    <a-row :gutter="24">
      <a-col :span="1" ></a-col>
      <a-col :span="6" >
        <a-button type="primary" @click="onOptWBTC"> opt-WBTC </a-button> 
      </a-col>

      <a-col :span="2" ></a-col>
      <a-col :span="6" >
        <a-button type="primary" @click="onOptWETH"> opt-WETH </a-button> 
      </a-col>

      <a-col :span="2" ></a-col>
      <a-col :span="6" >
        <a-button type="primary" @click="onOptUSDC"> opt-USDC </a-button> 
      </a-col>
      <a-col :span="1" ></a-col>
    </a-row>

    <a-row :gutter="24">
      <a-col :span="1" ></a-col>
      <a-col :span="6" >
        <a-button type="primary" @click="onSolanaWBTC"> solana-WBTC </a-button> 
      </a-col>

      <a-col :span="2" ></a-col>
      <a-col :span="6" >
        <a-button type="primary" @click="onSolanaWETH"> solana-WETH </a-button> 
      </a-col>

      <a-col :span="2" ></a-col>
      <a-col :span="6" >
        <a-button type="primary" @click="onSolanaUSDC"> solana-USDC </a-button>
      </a-col>
      <a-col :span="1" ></a-col>
    </a-row>

    <BasicForm @register="register" />

  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { step2Schemas, step2SchemasNear } from './data';
  import { Alert, Divider, Descriptions } from 'ant-design-vue';
  import { Progress, Row, Col } from 'ant-design-vue';


  export default defineComponent({
    components: {
      BasicForm,
      [Alert.name]: Alert,
      [Divider.name]: Divider,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    props: {
      ctx: { type: Object}
    },
    emits: ['next', 'prev'],
    setup(props, { emit }) {

      let showSchemas = step2Schemas
      if (props.ctx.chain == "near") {
        showSchemas = step2SchemasNear
      }

      console.log('props.ctx.defaultData', props.ctx)
      if (props.ctx.defaultData != undefined) {
        for (const schema of showSchemas) {
          schema.defaultValue = props.ctx.defaultData[schema.field]
        }
      }


      const [register, { validate, setProps, setFieldsValue }] = useForm({
        labelWidth: 80,
        schemas: showSchemas,
        actionColOptions: {
          span: 14,
        },
        showResetButton: false,
        submitButtonOptions: {
          text: 'next',
        },
        resetFunc: customResetFunc,
        submitFunc: customSubmitFunc,
      });

      async function customResetFunc() {
        emit('prev');
      }

      async function customSubmitFunc() {
        try {
          const values = await validate();
          setProps({
            submitButtonOptions: {
              loading: false,
            },
          });
          setTimeout(() => {
            setProps({
              submitButtonOptions: {
                loading: false,
              },
            });
            emit('next', values);
          }, 1);
        } catch (error) {}
      }

      const onBscBTCB = () => {
        setFieldsValue({
          address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
          token_name: 'BTCB',
          market_name: 'BTC',
          precision: 18,
          type: 'coin'
        })
      }

      const onBscWETH = () => {
        setFieldsValue({
          address: '0x4DB5a66E937A9F4473fA95b1cAF1d1E1D62E29EA',
          token_name: 'WETH',
          market_name: 'ETH',
          precision: 18,
          type: 'coin'
        })
      }

      const onBscUSDC = () => {
        setFieldsValue({
          address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
          token_name: 'USDC',
          market_name: 'USDT',
          precision: 18,
          type: 'stable_coin'
        })
      }

      const onOptWBTC = () => {
        setFieldsValue({
          address: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
          token_name: 'WBTC',
          market_name: 'BTC',
          precision: 8,
          type: 'coin'
        })
      }

      const onOptWETH = () => {
        setFieldsValue({
          address: '0x4200000000000000000000000000000000000006',
          token_name: 'WETH',
          market_name: 'ETH',
          precision: 18,
          type: 'coin'
        })
      }

      const onOptUSDC = () => {
        setFieldsValue({
          address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
          token_name: 'USDC',
          market_name: 'USDT',
          precision: 18,
          type: 'stable_coin'
        })
      }


      const onSolanaWBTC = () => {
        setFieldsValue({
          address: '3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh',
          token_name: 'WBTC',
          market_name: 'BTC',
          precision: 8,
          type: 'coin'
        })
      }

      const onSolanaWETH = () => {
        setFieldsValue({
          address: '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
          token_name: 'WETH',
          market_name: 'ETH',
          precision: 18,
          type: 'coin'
        })
      }

      const onSolanaUSDC = () => {
        setFieldsValue({
          address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
          token_name: 'USDC',
          market_name: 'USDT',
          precision: 18,
          type: 'stable_coin'
        })
      }

      const onEthWBTC = () => {
        setFieldsValue({
          address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
          token_name: 'WBTC',
          market_name: 'BTC',
          precision: 8,
          type: 'coin'
        })
      }

      const onEthWETH = () => {
        setFieldsValue({
          address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          token_name: 'WETH',
          market_name: 'ETH',
          precision: 18,
          type: 'coin'
        })
      }

      const onEthUSDC = () => {
        setFieldsValue({
          address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          token_name: 'USDC',
          market_name: 'USDT',
          precision: 18,
          type: 'stable_coin'
        })
      }

      return { register, 
        onEthWBTC, onEthWETH, onEthUSDC,
        onBscBTCB, onBscWETH, onBscUSDC,
        onOptWBTC, onOptWETH, onOptUSDC,
        onSolanaWBTC, onSolanaWETH, onSolanaUSDC};
    },
  });
</script>
<style lang="less" scoped>
  .step2 {
    width: 450px;
    margin: 0 auto;
  }
</style>
