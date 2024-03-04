 let counter = 0;
const discussContainer = document.getElementById('post-container');
const discuss = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await res.json();
    //console.log(data.posts)
    data.posts.forEach(card => {
        //console.log(card);
        console.log(card.image);
        makePost(card)
        
    });
}

discuss();


const makePost = (card) =>{
    const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
            <div class="space-">
            
            <div class="bg-[#F3F3F5] p-5  lg: p-10 rounded-3xl lg: flex justify-start items-start gap-8 bg-[#797DFC1A] border-[#797DFC]">
                  <div class="indicator">
                  <span class="indicator-item badge bad-success rounded-full">${card.isActive ? `<img src="images/green.png">` : `<img src="images/red.png">`}</span>
                     <div>
                         <img class="w-[72px] h-[72px] rounded-2xl" src=${card.image}>
                     </div>
                  </div>
                      <div class="space-y-5 ">
                           <div class="flex justify-start items-center gap-5">
                                <h2># <span>${card.category}</span></h2>
                                <h2>Author: ${card.author.name}</h2>
                        
                           </div>
                                <h2 class="mulish font-bold text-xl ">${card.title}</h2>
                                <p class=" text-base font-normal " >${card.description}</p>
                                <hr class="w-full">
                                <div  class="lg:flex gap-36">
                                <div class="lg:flex items-center gap-2">
                                <div class=" flex items-center gap-2 ">
                                   <img src="images/sms.png" alt="" >
                                    <p>${card.comment_count}</p>
                                </div>
                                <div class=" flex items-center gap-2 ">
                                   <img src="images/view.png" alt="" >
                                    <p>${card.view_count}</p>
                                </div>
                                <div class=" flex items-center gap-2 ">
                                   <img src="images/time.png" alt="" >
                                    <p>${card.posted_time}</p>
                                </div>
                                
                            </div>
                            <img  src="images/inbox.png" alt="" class="mail-box" onclick="myFunction('${card.title} ', ${card.view_count})" >
                           
                            </img>
                                
                                
                                </div>
                              
                      </div>
                   
                </div>
            
            </div>

        ` ;

        discussContainer.appendChild(cardDiv);
}


const myFunction = (title , view) =>{
    const div = document.createElement('div');
    div.innerHTML = `
    <div class = "flex justify-between">
    <p>${title}</p>
    <p>${view}</p>
    </div>
   `
   document.getElementById('viewer').appendChild(div);

   counter++;
    document.getElementById('readCount').innerText = counter;
}




const userSearch = () =>{
    discussContainer.innerHTML = ''
    const userInput = document.getElementById('search-field').value;

    fetch(` https://openapi.programming-hero.com/api/retro-forum/posts?category=${userInput}`)
    .then(res =>res.json())
    .then(data =>{
        console.log(data);
        data.posts.forEach(post =>{
            makePost(post);
        })
    })
}


//----------------------------------------------------------
const lastPost = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data1 = await res.json();
    //console.log(data1);
    const lasterPostContainer = document.getElementById('latest_post_container');
    data1.forEach(last =>{
        //console.log(last);
        const divLast = document.createElement('div');
        divLast.innerHTML=`
            <div class="bg-white border-[#12132D26] rounded-3xl p-6">
                  <img class="w-full rounded-[20px] mb-4" src="${last.cover_image}" >
                  <div class="space-y-3">
                     <div class="flex justify-start items-center">
                         <i class="fa-regular fa-calender"></i>
                         <p>${last.author.posted_data?last.author.posted_data:"No publish data"}</p>
                     </div>
                     <h2 class="mulish-extraBold text-lg text-black">${last.title}</h2>
                     <p class="inter-400">${last.description}</p>
                     <div class="flex justify-start items-center gap-5">
                           <div class="w-16 h-16 rounded-full">
                                <img class="w-full rounded-full mb-4 " src="${last.profile_image}" alt="">
                           </div>
                           <div>
                               <h2 class="mulish font-bold text-lg text-black">${last.author.name}</h2>
                               <p class="mulish text-sm">${last.author.designation?last.author.designation:"Unknown"}</p>
                           </div>              
                     </div>
                  </div>
            </div>
        `;
        lasterPostContainer.appendChild(divLast);      

    });
    
}

lastPost();
