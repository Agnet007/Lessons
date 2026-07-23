
import {LessonApp} from './app.js';import {TaskEngine} from './tasks.js';import {DemoEngine} from './demos.js';
const id=new URLSearchParams(location.search).get('lesson')||'01-linear';
const lesson=await fetch(`./lessons/${id}.json`).then(r=>{if(!r.ok)throw new Error('Урок не найден');return r.json()});
const app=new LessonApp(document.getElementById('lessonRoot'),lesson);app.mount();new TaskEngine(lesson).mount();new DemoEngine().mount();
