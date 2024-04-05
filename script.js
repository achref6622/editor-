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
      // Get the content from the appropriate element (change 'content' to the correct ID)
      const content = document.getElementById('content');
        
      // Create a new blob with the content
      const contentBlob = new Blob([content.innerText], { type: 'text/plain' });

      // Create a URL for the blob
      const url = URL.createObjectURL(contentBlob);

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName.value + '.txt';

      // Simulate a click on the link to trigger the download
      link.click();

      // Clean up by revoking the URL object
      URL.revokeObjectURL(url);
    } else if (value === 'pdf') {

        html2pdf().from(content).save(fileName.value );
    }
}