
const rnd=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const wording=[
'Сначала опиши зависимость словами, затем запиши формулу и вычисли.',
'Назови величины и единицы. После этого составь правило и реши.',
'Объясни процесс без букв, затем введи обозначения и вычисли.',
'Найди постоянную часть и изменение за единицу, затем реши.',
'Запиши ход решения на листе и введи итоговое число.',
'Переведи ситуацию в математическую запись и проверь ответ.',
'Сначала объясни смысл каждого числа, затем выполни расчёт.',
'Построй модель на листе, укажи единицы и вычисли.',
'Запиши словесное правило, короткую формулу и итог.',
'Реши задачу и проверь, соответствует ли ответ реальной ситуации.'
];
export const factories={
 price:()=>{let k=rnd(2,12),b=rnd(0,8),x=rnd(2,9);return {q:`Товар стоит ${k} € за единицу${b?`, разовая плата ${b} €`:''}. Купили ${x} единиц.`,h:`Повторяющаяся часть: ${k}·${x}${b?`; ${b} прибавляется один раз`:''}.`,a:k*x+b,s:`Словами: стоимость равна цене единиц${b?' плюс разовая плата':''}. y=${k}x${b?'+'+b:''}. y=${k}·${x}${b?'+'+b:''}=${k*x+b} €.`}},
 motion:()=>{let v=rnd(3,18)*5,t=rnd(2,6);return {q:`Объект движется ${t} ч с постоянной скоростью ${v} км/ч. Найди путь.`,h:'Путь равен скорости, умноженной на время.',a:v*t,s:`s=${v}·${t}=${v*t} км.`}},
 perimeter:()=>{let a=rnd(3,15);return {q:`Квадрат имеет сторону ${a} см. Найди длину всей границы.`,h:'Сложи четыре одинаковые стороны.',a:4*a,s:`P=4·${a}=${4*a} см.`}},
 area:()=>{let a=rnd(3,12),b=rnd(2,9);return {q:`Прямоугольник имеет стороны ${a} м и ${b} м. Найди площадь.`,h:'Число квадратных метров равно длине, умноженной на ширину.',a:a*b,s:`S=${a}·${b}=${a*b} м².`}},
 volume:()=>{let a=rnd(2,8),b=rnd(2,7),c=rnd(2,6);return {q:`Коробка имеет размеры ${a}×${b}×${c} дм. Найди объём.`,h:'Площадь слоя умножь на число слоёв.',a:a*b*c,s:`V=${a}·${b}·${c}=${a*b*c} дм³.`}},
 quadratic:()=>{let x=rnd(2,9),c=rnd(-4,4);return {q:`Для y=x²${c>=0?'+'+c:c} найди y при x=${x}.`,h:'Сначала возведи x в квадрат.',a:x*x+c,s:`y=${x}²${c>=0?'+'+c:c}=${x*x+c}.`}},
 acceleration:()=>{let v0=rnd(0,8),a=rnd(1,5),t=rnd(2,6);return {q:`Начальная скорость ${v0} м/с, ускорение ${a} м/с², время ${t} с. Найди скорость.`,h:'Начальная скорость плюс одинаковые изменения за каждую секунду.',a:v0+a*t,s:`v=${v0}+${a}·${t}=${v0+a*t} м/с.`}},
 density:()=>{let r=rnd(2,9),v=rnd(3,12);return {q:`Плотность ${r} г/см³, объём ${v} см³. Найди массу.`,h:'Масса единицы объёма умножается на число единиц объёма.',a:r*v,s:`m=${r}·${v}=${r*v} г.`}},
 sum:()=>{let a=rnd(2,8),b=rnd(1,7),x=rnd(2,6);return {q:`f(x)=${a}x, g(x)=${b}x. Найди (f+g)(${x}).`,h:'Сложи значения функций при одном x.',a:(a+b)*x,s:`(f+g)(${x})=(${a}+${b})·${x}=${(a+b)*x}.`}},
 rate:()=>{let x1=rnd(0,3),dx=rnd(2,5),y1=rnd(5,20),r=rnd(2,10);return {q:`При x от ${x1} до ${x1+dx} значение выросло с ${y1} до ${y1+r*dx}. Найди средний темп.`,h:'Изменение результата раздели на изменение аргумента.',a:r,s:`(${y1+r*dx}−${y1})/(${x1+dx}−${x1})=${r}.`}}
};
export class TaskEngine{
 constructor(lesson){this.lesson=lesson;}
 mount(){const st=document.querySelector('[data-static-tasks]');if(st)st.innerHTML=this.lesson.tasks.map((t,i)=>this.card(t,i+1)).join('');const f=document.querySelector('[data-factory]');if(f){f.dataset.types=this.lesson.factory.join(',');f.innerHTML=`<div class="factoryhead"><h3>Фабрика задач</h3><button data-new>Новая задача</button></div><p data-q></p><p><strong>Реши на отдельном листе, затем введи число.</strong></p><input inputmode="decimal" placeholder="Числовой ответ"><button class="btn" data-check>Проверить</button><div class="actions"><button class="subbtn" data-hint>Подсказка</button><button class="subbtn" data-sol>Полное решение</button></div><div class="hint" data-h></div><div class="solution" data-s></div><div class="feedback"></div>`;f.querySelector('[data-new]').onclick=()=>this.newTask(f);f.querySelector('[data-check]').onclick=()=>this.checkFactory(f);f.querySelector('[data-hint]').onclick=()=>f.querySelector('[data-h]').classList.toggle('show');f.querySelector('[data-sol]').onclick=()=>f.querySelector('[data-s]').classList.toggle('show');this.newTask(f);}this.bindStatic();}
 card(t,i){return `<div class="task"><span class="badge">${t.level||'Задание'} ${i}</span><h3>${t.title}</h3><p>${t.q}</p>${t.answer!==null&&t.answer!==undefined?'<input inputmode="decimal" placeholder="Введи только число"><button class="btn" data-static-check>Проверить число</button>':'<p><strong>Ответ запиши на отдельном листе.</strong></p>'}<div class="actions"><button class="subbtn" data-static-hint>Подсказка</button><button class="subbtn" data-static-sol>Полный ответ</button></div><div class="hint">${t.hint}</div><div class="solution">${t.solution}</div><div class="feedback"></div><i hidden data-answer="${t.answer??''}"></i></div>`;}
 bindStatic(){document.querySelectorAll('[data-static-hint]').forEach(b=>b.onclick=()=>b.closest('.task').querySelector('.hint').classList.toggle('show'));document.querySelectorAll('[data-static-sol]').forEach(b=>b.onclick=()=>b.closest('.task').querySelector('.solution').classList.toggle('show'));document.querySelectorAll('[data-static-check]').forEach(b=>b.onclick=()=>{let t=b.closest('.task'),v=parseFloat(t.querySelector('input').value.replace(',','.')),a=parseFloat(t.querySelector('[data-answer]').dataset.answer),f=t.querySelector('.feedback'),ok=Math.abs(v-a)<1e-9;f.className='feedback show '+(ok?'ok':'no');f.textContent=ok?'Верно. Теперь проверь единицы и объяснение.':'Пока не совпадает. Открой подсказку.'});}
 newTask(box){let types=box.dataset.types.split(','),type=types[rnd(0,types.length-1)],q=factories[type]();q.q=wording[rnd(0,wording.length-1)]+' '+q.q;box.dataset.answer=q.a;box.querySelector('[data-q]').textContent=q.q;box.querySelector('[data-h]').textContent=q.h;box.querySelector('[data-s]').textContent=q.s;box.querySelector('input').value='';box.querySelector('.feedback').className='feedback';box.querySelector('[data-h]').className='hint';box.querySelector('[data-s]').className='solution';}
 checkFactory(box){let v=parseFloat(box.querySelector('input').value.replace(',','.')),a=parseFloat(box.dataset.answer),f=box.querySelector('.feedback'),ok=Math.abs(v-a)<1e-9;f.className='feedback show '+(ok?'ok':'no');f.textContent=ok?'Верно. Сверь своё объяснение с полным решением.':'Ответ не совпадает. Открой подсказку.';}
}
