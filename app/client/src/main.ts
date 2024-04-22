import { createApp, provide } from 'vue';
import './style.scss'
import 'vue3-openlayers/styles.css';
import App from './App.vue'
import OpenLayersMap, {
  type Vue3OpenlayersGlobalOptions
} from 'vue3-openlayers';
import NaiveUI from 'naive-ui'

const options: Vue3OpenlayersGlobalOptions = {
  debug: true,
};

provide("ol-options", options);


const app = createApp(App)
app.use(OpenLayersMap, options);
app.use(NaiveUI)
app.mount('#app')
