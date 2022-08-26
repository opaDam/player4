const audio = document.querySelector('audio');
const img = document.querySelector('img');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const play_list = document.querySelector('.play_list');

let index = 0;  /* index+1 */
let temp_img;

prt_card();
prt_play_list();

function prt_card() {
  title.innerText = songs[index].title;
  artist.innerText = songs[index].artist;
  audio.src = songs[index].path_m;
  img.src = songs[index].path_j;
}

function prt_play_list() {
  songs.forEach((element, i) => {
    play_list.innerHTML += `
    <li data-index='${i}'>${element.title}<br>
    ${element.artist}</li>`;
  })
}

const li_list = play_list.querySelectorAll('li');
li_list[index].classList.add('playing');

function next() {
  if (index > songs.length - 1) index = 0;
  prt_card();
  audio.play();
  remove_class();
  li_list[index].classList.add('playing');
  // img.classList.add('rotate');
}
function prev() {
  index--;
  if (index < 0) index = 0;
  prt_card();
  audio.play();
  remove_class();
  li_list[index].classList.add('playing');
  // img.classList.add('rotate');
}

play_list.addEventListener('click', (e) => {
  console.log(+e.target.dataset.index);
  index = +e.target.dataset.index;
  next();
})

audio.addEventListener('ended', () => {
  if (index < songs.length) index++;
  next();
})

audio.addEventListener('pause', () => {
  img.classList.remove('rotate');
})
audio.addEventListener('playing', () => {
  img.classList.add('rotate');
})

function remove_class() {
  li_list.forEach(element => {
    element.classList.remove('playing');
  })
  img.classList.remove('rotate');
}