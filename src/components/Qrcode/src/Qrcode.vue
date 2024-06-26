<template>
  <div>
    <component :is="tag" ref="wrapRef" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, watch, PropType, ref, unref, onMounted } from 'vue';
  import { toCanvas, QRCodeRenderersOptions, LogoType } from './qrcodePlus';
  import { toDataURL } from 'qrcode';
  import { downloadByUrl } from '/@/utils/file/download';
  import { QrcodeDoneEventParams } from './typing';

  export default defineComponent({
    name: 'QrCode',
    props: {
      value: {
        type: [String, Array] as PropType<string | any[]>,
        default: null,
      },

      options: {
        type: Object as PropType<QRCodeRenderersOptions>,
        default: null,
      },

      width: {
        type: Number as PropType<number>,
        default: 200,
      },

      logo: {
        type: [String, Object] as PropType<Partial<LogoType> | string>,
        default: '',
      },

      tag: {
        type: String as PropType<'canvas' | 'img'>,
        default: 'canvas',
        validator: (v: string) => ['canvas', 'img'].includes(v),
      },
    },
    emits: { done: (data: QrcodeDoneEventParams) => !!data, error: (error: any) => !!error },
    setup(props, { emit }) {
      const wrapRef = ref<HTMLCanvasElement | HTMLImageElement | null>(null);
      async function createQrcode() {
        try {
          const { tag, value, options = {}, width, logo } = props;
          const renderValue = String(value);
          const wrapEl = unref(wrapRef);

          if (!wrapEl) return;

          if (tag === 'canvas') {
            const url: string = await toCanvas({
              canvas: wrapEl,
              width,
              logo: logo as any,
              content: renderValue,
              options: options || {},
            });
            emit('done', { url, ctx: (wrapEl as HTMLCanvasElement).getContext('2d') });
            return;
          }

          if (tag === 'img') {
            const url = await toDataURL(renderValue, {
              errorCorrectionLevel: 'H',
              width,
              ...options,
            });
            (unref(wrapRef) as HTMLImageElement).src = url;
            emit('done', { url });
          }
        } catch (error) {
          emit('error', error);
        }
      }
      /**
       * file download
       */
      function download(fileName?: string) {
        let url = '';
        const wrapEl = unref(wrapRef);
        if (wrapEl instanceof HTMLCanvasElement) {
          url = wrapEl.toDataURL();
        } else if (wrapEl instanceof HTMLImageElement) {
          url = wrapEl.src;
        }
        if (!url) return;
        downloadByUrl({
          url,
          fileName,
        });
      }

      onMounted(createQrcode);

      watch(
        props,
        () => {
          createQrcode();
        },
        {
          deep: true,
        },
      );

      return { wrapRef, download };
    },
  });
</script>
