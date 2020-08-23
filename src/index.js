
import axios from 'axios';

const render = (friends)=> {
  const ul = document.querySelector('ul');
  friends.sort((a, b)=> b.rating - a.rating);
  const html = friends.map( friend => {
    return `
      <li data-id='${friend.id}'>
        <h2>${ friend.name }</h2>
        <span>${ friend.rating }</span>
        <button data-id='${friend.id}'>+</button>
        <button data-id='${friend.id}'>-</button>
        <button data-id='${friend.id}'>x</button>
      </li>
    `;
  }).join('');
  ul.innerHTML = html;
};

const init = async()=> {
  const response = await axios.get('/api/friends');
  let friends = response.data;
  render(friends);
  const ul = document.querySelector('ul');
  const form = document.querySelector('form');

  form.addEventListener('submit', async(ev)=> {
    const input = document.querySelector('input');
    try {
      const response = await axios.post('/api/friends', { name: input.value });
      friends.push(response.data);
      input.value = '';
      render(friends);
    }
    catch(ex){
        console.log(ex)
      
    }
  });

  ul.addEventListener('click', async(ev)=> {
    if(ev.target.tagName === 'BUTTON'){
      if(ev.target.innerHTML === 'x'){
        const id = ev.target.getAttribute('data-id')*1;
        console.log(id)
        await axios.delete(`/api/friends/${id}`); 
        friends = friends.filter(friend => friend.id !== id); 
        render(friends);
      }
      else {
        const id = ev.target.getAttribute('data-id')*1;
        const friend = friends.find(item => item.id === id);
        const plus = ev.target.innerHTML === '+';
        const mins = ev.target.innerHTML === '-'
        if(plus){
          friend.rating ++;
        }
        else if(mins){
          friend.rating --;
        }
        await axios.put(`/api/friends/${friend.id}`, { rating: friend.rating }); 
        render(friends);
      }
    }
  });
};

init();