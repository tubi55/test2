let btns, panels, enableClick;

createDOM();

async function createDOM(){
  const section = document.querySelector('section');

  await fetch('js/data.json')
    .then(data=> {
      return data.json()
    })
    .then(json=>{    
      const items = json.data;
      let tags = '';

      items.forEach((item, index)=>{
        tags+= `
          <article>
            <video src=${item.src} autoplay loop muted></video>
            <div class="slogan">
              <h2>
                <div class="inner">${item.tit}</div>
              </h2><br>

              <div class="p1">
                <div class="inner">${item.p1}</div>
              </div><br>

              <div class="p2">
                <div class="inner">${item.p2}</div>
              </div>
            </div>
          </article>
        `;
      })

      section.innerHTML = tags;
      document.querySelector('article').classList.add('on');
    })

  init();
}

function init(){
  btns = document.querySelectorAll('#navi li');
  panels = document.querySelectorAll('section article');
  enableClick = true;
  console.log(panels);

  btns.forEach((btn, index)=>{
    btn.addEventListener('click', e=>{
      const isOn = e.currentTarget.classList.contains('on'); 
      if(isOn) return;

      if(enableClick){
        enableClick = false;
        activation(index);
      }
      
    })
  })
}

function activation(index){
  console.log(panels);
  for(let i=0; i<btns.length; i++) {      
    btns[i].classList.remove('on')  

    if(panels[i].classList.contains('on')){
      panels[i].classList.add('mask');
    }
  }    
  
  btns[index].classList.add('on');    
  panels[index].classList.add('lower');
  
  setTimeout(()=>{     
    for(let i=0; i<panels.length; i++){
      if(panels[i].classList.contains('on')){
        panels[i].classList.remove('on');
        panels[i].classList.remove('mask');
      }
    }
    
    panels[index].classList.remove('lower');
    panels[index].classList.add('on');  
    
    setTimeout(()=> enableClick = true, 1400);
  },1400)//mask-animation동안 대기
}