<template>
  <div class="step2">

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
          address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
          token_name: 'BTCB',
          market_name: 'BTC',
          precision: 8,
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
          address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
          token_name: 'USDC',
          market_name: 'USDC',
          precision: 18,
          type: 'stable_coin'
        })
      }

      const onOptWBTC = () => {
        setFieldsValue({
          address: '0x68f180fcce6836688e9084f035309e29bf0a2095',
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
          market_name: 'USDC',
          precision: 18,
          type: 'stable_coin'
        })
      }





      return { register, 
        onBscBTCB, onBscWETH, onBscUSDC,
        onOptWBTC, onOptWETH, onOptUSDC};
    },
  });
</script>
<style lang="less" scoped>
  .step2 {
    width: 450px;
    margin: 0 auto;
  }
</style>
