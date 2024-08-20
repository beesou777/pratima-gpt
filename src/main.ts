import './app.scss'
import App from './App.svelte'
import './utility/axios';
const app = new App({
  target: document.getElementById('app')!,
})

export default app
