const item_input = document.querySelector("#item-input");
        const item_list= document.querySelector("#item-list");
        let item_Array=[];
        let updateId;
        (()=>{
            if(localStorage.getItem("shopList")!=null && localStorage.getItem("shopList")!=undefined){
                item_Array=JSON.parse(localStorage.getItem("shopList"));
                bindItem(item_Array);
            }
        })();
        function btnAdd(event){
            if(item_input.value!=""){
                if(updateId!=undefined && updateId!=null){
                    event.preventDefault();
                    item_Array[updateId]=item_input.value;
                    window.location.reload();
                }else{
                    event.preventDefault();
                    item_Array.push(item_input.value);
                }
                item_input.value="";
                bindItem(item_Array);
                localStorage.setItem("shopList",JSON.stringify(item_Array));
            }
        }
        function bindItem(inputArray){
            let html="";
            inputArray.forEach((item,key)=>{
                html+=`  <li onclick="editItem(${key})" id="list_${key}" class="${updateId>=0 &&key==updateId?"disabled":""}">
                  ${item}
                  <button class="remove-item btn-link text-red" onclick="removeItem(event,${key})">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </li>`
            })
            item_list.innerHTML=html;
        }
        function removeItem(event,key){
            let cofirmMsg= confirm("Are you sure you wish to remove this item?");
            if(cofirmMsg ){
                updateId!=undefined&& updateId!=null?updateId>key?updateId=updateId-1:"":""
                item_Array=item_Array.filter((item,index)=> index!=key);
                bindItem(item_Array);
                // item_input.value="";
                event.stopPropagation();
                localStorage.setItem("shopList",JSON.stringify(item_Array));
            }else{
                event.stopPropagation();
            }
        }
        function editItem(key){
            let item=item_Array.filter((Element,index)=>index==key);
            item_input.value=item;
            document.querySelector("#btnSubmit").innerText="Update";
            document.querySelector("#btnSubmit").style.backgroundColor="green";
            updateId=key;
            for(let i=0;i<item_Array.length;i++){
                if(document.querySelector(`#list_${i}`)!=null && document.querySelector(`#list_${i}`)!=undefined){

                    if(i!=key){
                        document.querySelector(`#list_${i}`).classList.remove("disabled");
                    }else{
                        document.querySelector(`#list_${i}`).classList.add("disabled");
                    }
                }
            }
        }
        function clearAll(){
            localStorage.removeItem("shopList");
            item_Array=[];
            location.reload();
        }
        function filterItems(event){
            // let filteredItems = item_Array.filter((element)=> element.toLowerCase().includes(event.target.value.toLowerCase()));
            // bindItem(filteredItems);
            let filteredItems = item_Array.map((element)=>{
                if(element.toLowerCase().includes(event.target.value.toLowerCase())){
                    return element;
                }else{
                    return "";
                }
            });
            BindFilteredArray(filteredItems);
        }
        function BindFilteredArray(arrayInput){
            let html="";
            arrayInput.forEach((item,key)=>{
                if(item!=""){
                    html+=`  <li onclick="editItem(${key})"  id="list_${key}" class="${updateId>=0 &&key==updateId?"disabled":""}">
                      ${item}
                      <button class="remove-item btn-link text-red" onclick="removeItem(event,${key})">
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    </li>`
                }
            })
            item_list.innerHTML=html;
        }