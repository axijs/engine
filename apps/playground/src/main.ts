import './style.css'

import {testNewScopeSystem} from './test-data';
import {testTasks} from './test-tasks';


testTasks().then(() => {
  console.log('---> done testOneStringField');
  console.log('---> start testScopeSystem');
  return testNewScopeSystem();
}).then(() => {
  console.log('---> done testScopeSystem');
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div></div>
`


