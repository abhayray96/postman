console.log('india post');
let parameterBox=document.getElementById('customParameterBox');
parameterBox.style.display="none";
let count = 2;
//creating utility function
function nodechildName(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//parameter radio box check 
let jsonRequest = document.getElementById('jsonRequest');
jsonRequest.addEventListener('click', () => {
    document.getElementById('requestjson').style.display = 'block';
    document.getElementById('customParameterBox').style.display = 'none';
})
let customRequest = document.getElementById('customRequest');
customRequest.addEventListener('click', () => {
    document.getElementById('customParameterBox').style.display = 'block';
    document.getElementById('requestjson').style.display = 'none';
})

//if users click on + icon we need to add new field
let addingField = document.getElementById('addingField');
addingField.addEventListener('click', () => {
    let html = document.getElementById('addingParams');
    let string = `       <div class="row my-3">
                            <label for="Paramere" class="col-sm-2 col-form-label">parameter ${count}</label>
                            <div class="col-md-4">
                                <input type="text" id="key${count}" class="form-control" placeholder="Enter Parameter ${count} key" aria-label="First name">
                            </div>
                            <div class="col-md-4">
                                <input type="text" id='value${count}' class="form-control" placeholder="Enter parameter ${count} value"
                                    aria-label="Last name">
                            </div>
                            <button id="addingField" class="btn btn-outline-warning col deleteElement ">-</button>
    
                        </div>
    `;
    let paramElement = nodechildName(string);
    html.appendChild(paramElement);

    //deleting params 
    let deleteElement = document.getElementsByClassName('deleteElement');
    // console.log(deleteElement);
    for (item of deleteElement) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();

        })
        console.log(item.paramElement);
    }
    count++;
})

//After submitting the forms by the user
let submitForm=document.getElementById('submitForm');
submitForm.addEventListener('click',()=>{
    //Request box
    document.getElementById('responsejson').value='Please wait we are fetching your data.... ';
    //all datas are entered by the users
    let url=document.getElementById('url').value;
    let requestType=document.querySelector("input[name='gridRadios']:checked").value;
    let contentType=document.querySelector("input[name='gridRadios1']:checked").value;

    //adding all the field values of coustom parameters into a json
    if(contentType=="customRequest")
    {
        data={};
        for(i=1;i<count+1;i++)
        {
            if(document.getElementById("key"+(i+1))!=undefined)
            {

                let key=document.getElementById("key"+(i+1)).value;
                let value=document.getElementById("value"+(i+1)).value;
                data[key]=value;
                // console.log(data)
            }
            
        }
        data=JSON.stringify(data);
    }
    // console.log(data);
    //data is comming from json
    else
    {
        data=document.getElementById('textjson').value;
        // console.log(data);
    }

    if(contentType=='GET')
    {
        fetch(url,{method:'GET'}).then(response=>response.text()).then((text)=>{ document.getElementById('responsejson').value=text;})
    }
    else{
        fetch(url,{
            method:'POST',
            body:data,
            headers:{"Content-type":"application/json; charset=UTF-8"}
    }).then(response=>response.text())
    .then((text)=>{ document.getElementById('responsejson').value=text;})

    }

})