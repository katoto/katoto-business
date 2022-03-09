import { dynamic } from 'umi';

const AsyncTemplateIntro = dynamic({
  async loader() {
    const { default: Component } = await import(
      /* webpackChunkName: "TemplateIntro" */ '@/components/TemplateIntro'
    );
    return Component;
  },
});

export default AsyncTemplateIntro;
