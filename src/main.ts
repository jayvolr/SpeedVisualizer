import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import { injectSpeedInsights } from '@vercel/speed-insights';
 
injectSpeedInsights();

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
