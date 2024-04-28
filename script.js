const content = document.getElementById('content') ;
const formatDoc = (cmd , value =null) => {
    if (value)
    document.execCommand(cmd,false, value ) ;
    else 
    document.execCommand(cmd) ;
 } 
 const addLink = () => {
    const url = prompt ('Insert link')
    document.execCommand('createLink',false, url ) ;
 }
 
 content.addEventListener('mouseenter' , ()=> {
    const a = content.querySelectorAll('a') 
    a.forEach(item=> {
        item.addEventListener ('mouseenter', () => {
            content.setAttribute('contenteditable', false ) ;
            item.target='_blank'
        } )
        item.addEventListener ('mouseleave', () => {
            content.setAttribute('contenteditable', true ) ;
            item.target='_blank'
        } )
    })
 } )
const showCode = document.getElementById('show-code')
let active = false ;

showCode.addEventListener('click' ,function () {
    showCode.dataset.active = !active 
    active= !active ;
    if(active) {
        content.textContent = content.innerHTML ;
        content.setAttribute('contenteditable', false)
    }else {
        content.innerHTML = content.textContent ;
        content.setAttribute('contenteditable', true)
    }
} )
const fileName= document.getElementById('filename')
function fileHandle (value) {
    if(value =='new') {
        content.innerHTML =''
        fileName.value ="untitled"
    } else if (value === 'txt') {
      const content = document.getElementById('content');
        
      const contentBlob = new Blob([content.innerText], { type: 'text/plain' });

      const url = URL.createObjectURL(contentBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName.value + '.txt';

      link.click();

      URL.revokeObjectURL(url);
    } else if (value === 'pdf') {
        html2pdf().from(content).save(fileName.value );
    }
}


    const fileInput = document.getElementById('fileInput');
    let image = null 

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            image = img; // Store the image element globally

            $('#exampleModal').modal('show');
            // let width = 
            // let height = 
            // img.style.width = width + '%';
            // img.style.height = height +'%';
            // content.appendChild(img);
            // document.execCommand('insertImage', false, URL.createObjectURL(file));
        }
    
    });
    
    function imageHandle() {
        const imageWidth = document.getElementById('Imagewidth').value;
        const imageHeight = document.getElementById('Imageheight').value;
        const pixelorpercentWidth = document.getElementById('pixelorpercentWidth').value;
        const pixelorpercentHeight = document.getElementById('pixelorpercentHeight').value;
        console.log('Image Width: ' + imageWidth )
        console.log('Image Height: ' + imageHeight)
        console.log('Pixelor Percent Width: ' + pixelorpercentWidth)
        console.log('Pixelor Percent Height: ' + pixelorpercentHeight)
        if (image) {
            image.style.width = imageWidth + pixelorpercentWidth;
            image.style.height = imageHeight + pixelorpercentHeight;
            content.appendChild(image); // Append image to modal body
        }

        $('#exampleModal').modal('hide');
    }

