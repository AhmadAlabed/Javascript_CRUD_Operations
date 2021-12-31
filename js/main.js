// ----------Global variables----------
var bookmarkNameInput = document.getElementById('bookmarkName');
var websiteURLInput = document.getElementById('websiteURL');
var searchInput = document.getElementById('searchSiteName');
var websitesArray;
var addUpadte='add';
var publicIndex=0;
var publicBgDarkLightMode='bg-dark';
var publicTextDarkLightMode='text-light';
// ----------Global variables----------
if(localStorage.getItem('websiteObject')!=null)
{
    saveUpdateGetlocalStorage('get');
    displayWebsites(searchInput.value);
}
else
{
    websitesArray=[];
}
disableEnableSearchBox();

//-------------------------------Main Functions---------------------------------------
function addUpadteWebsite()
{
    if(test())
    {
        switch(addUpadte)
        {
            case 'add':
                addWebsite()
                disableEnableSearchBox();
                break;
            case 'update':
                updateWebsite(publicIndex);

                addUpadte='add';

                document.getElementById('addupdate').innerHTML='Add Website';

                setActiveRow(publicIndex,'releaseActive');
                break;
        }
            displayWebsites(searchInput.value);
            saveUpdateGetlocalStorage('save');
            clearForm();
        
    }
    else
    {
        validation('bookmarkName');
        validation('websiteURL');
    }
}
function pressUpdateWebsite(index)
{
    bookmarkNameInput.value=websitesArray[index].bookmarkName;
    websiteURLInput.value=websitesArray[index].websiteURL;
    addUpadte='update';
    document.getElementById('addupdate').innerHTML='Update Website';
    publicIndex=index;
    setActiveRow(index,'update');
    disabletableRow();
}
function deleteWebsite(index)
{
    websitesArray.splice(index,1);
    saveUpdateGetlocalStorage('save');
    displayWebsites(searchInput.value);
    setActiveRow(0,'releaseActive');
    disableEnableSearchBox()
}
function cancel()
{
    if(addUpadte=='add')
    {
        clearForm();
    }
    else
    {
        addUpadte='add';
        document.getElementById('addupdate').innerHTML='Add Website';
        setActiveRow(publicIndex,'releaseActive');
        displayWebsites(searchInput.value);
        clearForm();
    }
}

//-------------------------------Sub Functions----------------------------------------
function updateWebsite(index)
{
    websitesArray[index].bookmarkName=bookmarkNameInput.value;
    websitesArray[index].websiteURL=websiteURLInput.value;
}
function addWebsite()
{
    var websiteObject={
        bookmarkName:bookmarkNameInput.value,
        websiteURL:websiteURLInput.value
    };
    websitesArray.push(websiteObject);
}

function displayWebsites(searchText)
{

        var tableContent="";
        for(var i=0 ;i<websitesArray.length;i++)
        {
            if(websitesArray[i].bookmarkName.toUpperCase().includes(searchText.toUpperCase()))
            {
                tableContent+=`
                <tr>
                <td>${i+1}</td>
                <td>
                <p class='m-0 fs-4 text-break'>${websitesArray[i].bookmarkName}</p>
                <p class='m-0 text-muted text-break '>${websitesArray[i].websiteURL}</p>
                </td>
                    <td>
                        <div class='d-flex justify-content-end flex-wrap align-items-center'>
                            <a href="${websitesArray[i].websiteURL}" id="btn-visit-${i}" target="_blank" class="btn btn-outline-success btn-sm mx-sm-2 mx-1 my-md-0 my-1">Visit</a>
                            <button type="button" id="btn-update-${i}" onclick="pressUpdateWebsite(${i});" class="btn btn-outline-warning btn-sm mx-sm-2 mx-1 my-md-0 my-1">Update</button>
                            <button type="button" id="btn-delete-${i}" onclick="showModel(${i});" class="btn btn-outline-danger btn-sm mx-sm-2 mx-1 my-md-0 my-1">Delete</button>
                        </div>
                    </td>
                </tr>
                `;
            }

        }
        document.getElementById('table-body').innerHTML=tableContent;
}



function disabletableRow()
{
    for(var i=0;i<websitesArray.length;i++)
    {
        document.getElementById(`btn-update-${i}`).setAttribute("disabled","disabled");
        document.getElementById(`btn-delete-${i}`).setAttribute("disabled","disabled");
        document.getElementById(`btn-visit-${i}`).setAttribute("style","pointer-events: none;");
    }
}


function saveUpdateGetlocalStorage(state)
{
    switch(state)
    {
        case 'get':
            websitesArray=JSON.parse(localStorage.getItem('websiteObject'));
            break;
        case 'save':
            localStorage.setItem('websiteObject',JSON.stringify(websitesArray));
            break;
    }
}
function clearForm()
{
    bookmarkNameInput.value="";
    bookmarkNameInput.classList.remove('is-invalid');
    bookmarkNameInput.classList.remove('is-valid');
    websiteURLInput.value="";
    websiteURLInput.classList.remove('is-invalid');
    websiteURLInput.classList.remove('is-valid');
}
function setActiveRow(index,state)
{

    switch(state)
    {
        case 'update':
            tr=document.getElementsByTagName('tr');
            for(var i=0 ; i<tr.length;i++)
                {
                    if(tr[i].firstElementChild.innerHTML==index+1)
                    {
                        tr[i].setAttribute("class","updateRow")
                    }
                }
        break;
        case 'delete':
            tr=document.getElementsByTagName('tr');
            for(var i=0 ; i<tr.length;i++)
                {
                    if(tr[i].firstElementChild.innerHTML==index+1)
                    {
                        tr[i].setAttribute("class","deleteRow")
                    }
                }
        break;
        case 'releaseActive':
            for(var i=0 ; i<tr.length;i++)
                {
                    if(tr[i].firstElementChild.innerHTML==index+1)
                    {
                        tr[i].removeAttribute("class")
                    }
                }
            
        break;

    }
    
}
function showModel(index)
{
    modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered text-light">
            <div class="modal-content ${publicBgDarkLightMode} ${publicTextDarkLightMode}">
            <div class="modal-header">
                <h5 class="modal-title">Delete Site</h5>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete this site?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="setActiveRow(${index},'releaseActive');">Close</button>
                <button type="button" class="btn btn-danger modal-success-btn" data-bs-dismiss="modal" onclick="deleteWebsite(${index})">Delete</button>
            </div>
            </div>
        </div>
        </div>
    `;
  document.body.append(modalWrap);
  var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
  modal.show();
  setActiveRow(index,'delete');
}
function disableEnableSearchBox()
{
    if(websitesArray.length==0)
    {
        document.getElementById('searchSiteName').style.display='none';
    }
    else
    {
        document.getElementById('searchSiteName').style.display='block';
    }
}

function showCancelModel()
{
    modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content ${publicBgDarkLightMode} ${publicTextDarkLightMode}">
            <div class="modal-header">
                <h5 class="modal-title">Cancel Changes</h5>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to cancel these changes?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal";">NO, CANCEL</button>
                <button type="button" class="btn btn-danger modal-success-btn" data-bs-dismiss="modal" onclick="cancel();">Yes, CONTINUE</button>
            </div>
            </div>
        </div>
        </div>
    `;
  document.body.append(modalWrap);
  var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
  modal.show();
}

function darkLight(){
    document.getElementById('searchSiteName').classList.toggle('bg-dark');

    document.getElementsByTagName('body')[0].classList.toggle('text-light');
    document.getElementById('searchSiteName').classList.toggle('text-light');

    document.getElementsByTagName('table')[0].classList.toggle('table-dark');
    
    var parentBtn = document.getElementById('parent-btn');
    var childBtn = document.getElementById('child-btn');
    var darkLightMode = document.getElementById('darkLightMode');
    var buttons = document.getElementsByTagName('button');
    parentBtn.classList.toggle('parent-button-light');
    childBtn.classList.toggle('child-button-light');
    if(darkLightMode.innerHTML=='Dark Mode')
    {
        document.getElementsByTagName('body')[0].classList.replace('bg-dark','bg-light');

        darkLightMode.innerHTML='Light Mode';
        publicBgDarkLightMode='bg-light';
        publicTextDarkLightMode='text-dark'
        for(var i=0 ; i<buttons.length;i++)
        {
            buttons[i].classList.replace('btn-outline-info','btn-info');
            buttons[i].classList.replace('btn-outline-danger','btn-danger');
            buttons[i].classList.replace('btn-outline-warning','btn-warning');
        }
    }
    
    else
    {
        document.getElementsByTagName('body')[0].classList.replace('bg-light','bg-dark');

        darkLightMode.innerHTML='Dark Mode';
        publicBgDarkLightMode='bg-dark';
        publicTextDarkLightMode='text-light'
        
        for(var i=0 ; i<buttons.length;i++)
        {
            buttons[i].classList.replace('btn-info','btn-outline-info');
            buttons[i].classList.replace('btn-danger','btn-outline-danger');
            buttons[i].classList.replace('btn-warning','btn-outline-warning');
        }


    }

    darkLightMode.classList.toggle('text-dark');
}
function validation(inputId)
{
    var input = document.getElementById(inputId);
    var regex ='';
    switch(inputId)
    {
        case 'bookmarkName':
        regex =/^[a-zA-Z][a-zA-Z0-9_-\s]{3,20}$/;
            break;
        case 'websiteURL':
        regex=/^[^\s]{10,100}$/;
            break;
    }
    if(regex.test(input.value))
    {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
    }
    else
    {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }

}
function test()
{
    if(bookmarkNameInput.classList.contains('is-invalid') || bookmarkNameInput.value=='' || websiteURLInput.classList.contains('is-invalid') || websiteURLInput.value=='')
    {
        return false;
    }
    else
    {
        return true;
    }

}
